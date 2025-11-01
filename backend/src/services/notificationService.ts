import prisma from '../config/database';
import logger from '../config/logger';
import { NotificationType } from '@prisma/client';

export class NotificationService {
  /**
   * Create a notification for a user
   */
  async createNotification(
    userId: string,
    type: NotificationType,
    title: string,
    message: string
  ): Promise<void> {
    try {
      await prisma.notification.create({
        data: {
          userId,
          type,
          title,
          message,
        },
      });

      logger.info(`Notification created for user ${userId}: ${title}`);

      // TODO: Send email notification if configured
      // TODO: Send real-time notification via WebSocket
    } catch (error) {
      logger.error('Error creating notification:', error);
    }
  }

  /**
   * Notify user about task assignment
   */
  async notifyTaskAssigned(taskId: string, assigneeId: string, workflowName: string): Promise<void> {
    await this.createNotification(
      assigneeId,
      NotificationType.TASK_ASSIGNED,
      'New Task Assigned',
      `You have been assigned a new task in workflow: ${workflowName}`
    );
  }

  /**
   * Notify user about overdue task
   */
  async notifyTaskOverdue(taskId: string, assigneeId: string, taskName: string): Promise<void> {
    await this.createNotification(
      assigneeId,
      NotificationType.TASK_OVERDUE,
      'Task Overdue',
      `Your task "${taskName}" is overdue. Please complete it as soon as possible.`
    );
  }

  /**
   * Notify user about workflow completion
   */
  async notifyWorkflowCompleted(userId: string, workflowName: string): Promise<void> {
    await this.createNotification(
      userId,
      NotificationType.WORKFLOW_COMPLETED,
      'Workflow Completed',
      `The workflow "${workflowName}" has been completed successfully.`
    );
  }

  /**
   * Notify user about approval request
   */
  async notifyApprovalRequest(
    taskId: string,
    approverId: string,
    workflowName: string
  ): Promise<void> {
    await this.createNotification(
      approverId,
      NotificationType.APPROVAL_REQUEST,
      'Approval Required',
      `Your approval is required for a task in workflow: ${workflowName}`
    );
  }
}

export default new NotificationService();
