import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import prisma from '../config/database';
import logger from '../config/logger';

export const createWorkflow = async (req: AuthRequest, res: Response) => {
  try {
    const { name, description, nodes, edges } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const workflow = await prisma.workflowDefinition.create({
      data: {
        name,
        description,
        createdBy: userId,
        nodes: {
          create: nodes.map((node: any) => ({
            type: node.type,
            positionX: node.position.x,
            positionY: node.position.y,
            data: node.data,
          })),
        },
      },
      include: {
        nodes: true,
        edges: true,
      },
    });

    // Create edges after nodes are created
    if (edges && edges.length > 0) {
      await Promise.all(
        edges.map((edge: any) =>
          prisma.edgeDefinition.create({
            data: {
              workflowId: workflow.id,
              sourceNodeId: edge.source,
              targetNodeId: edge.target,
            },
          })
        )
      );
    }

    logger.info(`Workflow created: ${workflow.id} by user ${userId}`);

    res.status(201).json(workflow);
  } catch (error) {
    logger.error('Create workflow error:', error);
    res.status(500).json({ error: 'Failed to create workflow' });
  }
};

export const getWorkflows = async (req: AuthRequest, res: Response) => {
  try {
    const workflows = await prisma.workflowDefinition.findMany({
      include: {
        nodes: true,
        edges: true,
        creator: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    res.json(workflows);
  } catch (error) {
    logger.error('Get workflows error:', error);
    res.status(500).json({ error: 'Failed to fetch workflows' });
  }
};

export const getWorkflowById = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const workflow = await prisma.workflowDefinition.findUnique({
      where: { id },
      include: {
        nodes: true,
        edges: true,
        creator: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!workflow) {
      return res.status(404).json({ error: 'Workflow not found' });
    }

    res.json(workflow);
  } catch (error) {
    logger.error('Get workflow error:', error);
    res.status(500).json({ error: 'Failed to fetch workflow' });
  }
};

export const startWorkflow = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Create workflow instance
    const instance = await prisma.workflowInstance.create({
      data: {
        workflowDefinitionId: id,
        startedBy: userId,
        status: 'RUNNING',
      },
    });

    // TODO: Implement workflow engine to start the first task
    // This will be handled by WorkflowEngine service

    logger.info(`Workflow instance started: ${instance.id}`);

    res.status(201).json(instance);
  } catch (error) {
    logger.error('Start workflow error:', error);
    res.status(500).json({ error: 'Failed to start workflow' });
  }
};
