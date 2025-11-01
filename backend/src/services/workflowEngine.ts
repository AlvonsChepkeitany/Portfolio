import prisma from '../config/database';
import logger from '../config/logger';
import { NodeType, TaskStatus, InstanceStatus } from '@prisma/client';

export class WorkflowEngine {
  /**
   * Start a workflow instance
   * Creates the workflow instance and initializes the first task
   */
  async startWorkflow(workflowDefinitionId: string, startedBy: string): Promise<string> {
    try {
      // Get workflow definition with nodes
      const workflow = await prisma.workflowDefinition.findUnique({
        where: { id: workflowDefinitionId },
        include: {
          nodes: true,
          edges: true,
        },
      });

      if (!workflow) {
        throw new Error('Workflow definition not found');
      }

      // Find the start node
      const startNode = workflow.nodes.find((node) => node.type === NodeType.START);
      if (!startNode) {
        throw new Error('Workflow must have a START node');
      }

      // Create workflow instance
      const instance = await prisma.workflowInstance.create({
        data: {
          workflowDefinitionId,
          startedBy,
          status: InstanceStatus.RUNNING,
          currentNodeId: startNode.id,
        },
      });

      // Find the next node after start
      const nextEdge = workflow.edges.find((edge) => edge.sourceNodeId === startNode.id);
      if (nextEdge) {
        await this.createTaskForNode(instance.id, nextEdge.targetNodeId);
      }

      logger.info(`Workflow instance ${instance.id} started`);
      return instance.id;
    } catch (error) {
      logger.error('Error starting workflow:', error);
      throw error;
    }
  }

  /**
   * Complete a task and progress the workflow
   */
  async completeTask(taskInstanceId: string, outputData?: any): Promise<void> {
    try {
      // Get task with workflow instance and node definition
      const task = await prisma.taskInstance.findUnique({
        where: { id: taskInstanceId },
        include: {
          workflowInstance: {
            include: {
              workflowDefinition: {
                include: {
                  nodes: true,
                  edges: true,
                },
              },
            },
          },
          nodeDefinition: true,
        },
      });

      if (!task) {
        throw new Error('Task not found');
      }

      // Mark task as completed
      await prisma.taskInstance.update({
        where: { id: taskInstanceId },
        data: {
          status: TaskStatus.COMPLETED,
          outputData,
          completedAt: new Date(),
        },
      });

      // Find next node(s)
      const nextEdges = task.workflowInstance.workflowDefinition.edges.filter(
        (edge) => edge.sourceNodeId === task.nodeDefinitionId
      );

      if (nextEdges.length === 0) {
        // No next nodes, workflow is complete
        await prisma.workflowInstance.update({
          where: { id: task.workflowInstanceId },
          data: {
            status: InstanceStatus.COMPLETED,
            completedAt: new Date(),
          },
        });
        logger.info(`Workflow instance ${task.workflowInstanceId} completed`);
        return;
      }

      // Handle conditional branching
      if (task.nodeDefinition.type === NodeType.CONDITION) {
        const selectedEdge = await this.evaluateCondition(task.nodeDefinition, outputData, nextEdges);
        if (selectedEdge) {
          await this.createTaskForNode(task.workflowInstanceId, selectedEdge.targetNodeId);
        }
      } else {
        // Create tasks for all next nodes
        for (const edge of nextEdges) {
          await this.createTaskForNode(task.workflowInstanceId, edge.targetNodeId);
        }
      }

      logger.info(`Task ${taskInstanceId} completed and workflow progressed`);
    } catch (error) {
      logger.error('Error completing task:', error);
      throw error;
    }
  }

  /**
   * Create a task instance for a node
   */
  private async createTaskForNode(workflowInstanceId: string, nodeDefinitionId: string): Promise<void> {
    const node = await prisma.nodeDefinition.findUnique({
      where: { id: nodeDefinitionId },
    });

    if (!node) {
      throw new Error('Node definition not found');
    }

    // Skip creating tasks for END nodes
    if (node.type === NodeType.END) {
      await prisma.workflowInstance.update({
        where: { id: workflowInstanceId },
        data: {
          status: InstanceStatus.COMPLETED,
          completedAt: new Date(),
        },
      });
      return;
    }

    // Extract assignee from node data (default to workflow starter if not specified)
    const assigneeId = (node.data as any).assigneeId;
    if (!assigneeId) {
      throw new Error('Node must have an assignee');
    }

    // Calculate due date if specified
    let dueDate: Date | undefined;
    const dueDays = (node.data as any).dueDays;
    if (dueDays) {
      dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + dueDays);
    }

    // Create task instance
    await prisma.taskInstance.create({
      data: {
        workflowInstanceId,
        nodeDefinitionId,
        assigneeId,
        status: TaskStatus.PENDING,
        dueDate,
      },
    });

    // TODO: Create notification for assignee

    logger.info(`Task created for node ${nodeDefinitionId}`);
  }

  /**
   * Evaluate condition logic to determine which path to take
   */
  private async evaluateCondition(
    node: any,
    outputData: any,
    edges: any[]
  ): Promise<any | null> {
    // Simple condition evaluation based on outputData
    // This is a basic implementation - can be extended with complex logic
    const conditionLogic = (node.data as any).condition;

    if (!conditionLogic) {
      return edges[0]; // Default to first edge if no condition
    }

    // Example: { field: 'approved', operator: 'equals', value: true }
    const { field, operator, value } = conditionLogic;
    const fieldValue = outputData?.[field];

    let result = false;
    switch (operator) {
      case 'equals':
        result = fieldValue === value;
        break;
      case 'notEquals':
        result = fieldValue !== value;
        break;
      case 'greaterThan':
        result = fieldValue > value;
        break;
      case 'lessThan':
        result = fieldValue < value;
        break;
      default:
        result = false;
    }

    // Find edge with matching condition result
    // Edges can have labels like 'true' or 'false' in their data
    return edges.find((edge) => {
      const edgeCondition = (edge as any).data?.condition;
      return edgeCondition === (result ? 'true' : 'false');
    }) || edges[0];
  }
}

export default new WorkflowEngine();
