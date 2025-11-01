import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import prisma from '../config/database';
import logger from '../config/logger';

export const getMyTasks = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const tasks = await prisma.taskInstance.findMany({
      where: {
        assigneeId: userId,
      },
      include: {
        workflowInstance: {
          include: {
            workflowDefinition: true,
          },
        },
        nodeDefinition: true,
      },
      orderBy: [
        { status: 'asc' },
        { dueDate: 'asc' },
      ],
    });

    res.json(tasks);
  } catch (error) {
    logger.error('Get my tasks error:', error);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};

export const updateTaskStatus = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Verify task belongs to user
    const task = await prisma.taskInstance.findUnique({
      where: { id },
    });

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    if (task.assigneeId !== userId) {
      return res.status(403).json({ error: 'Not authorized to update this task' });
    }

    const updatedTask = await prisma.taskInstance.update({
      where: { id },
      data: { status },
    });

    logger.info(`Task ${id} status updated to ${status}`);

    res.json(updatedTask);
  } catch (error) {
    logger.error('Update task status error:', error);
    res.status(500).json({ error: 'Failed to update task status' });
  }
};

export const completeTask = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { outputData } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Verify task belongs to user
    const task = await prisma.taskInstance.findUnique({
      where: { id },
    });

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    if (task.assigneeId !== userId) {
      return res.status(403).json({ error: 'Not authorized to complete this task' });
    }

    const updatedTask = await prisma.taskInstance.update({
      where: { id },
      data: {
        status: 'COMPLETED',
        outputData,
        completedAt: new Date(),
      },
    });

    // TODO: Trigger workflow engine to progress to next step
    // This will be handled by WorkflowEngine service

    logger.info(`Task ${id} completed by user ${userId}`);

    res.json(updatedTask);
  } catch (error) {
    logger.error('Complete task error:', error);
    res.status(500).json({ error: 'Failed to complete task' });
  }
};
