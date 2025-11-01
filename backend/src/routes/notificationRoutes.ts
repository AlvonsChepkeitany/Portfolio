import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import * as notificationController from '../controllers/notificationController';

const router = Router();

// All routes require authentication
router.use(authenticate);

// GET /api/notifications - Get my notifications
router.get('/', notificationController.getMyNotifications);

// PATCH /api/notifications/:id/read - Mark notification as read
router.patch('/:id/read', notificationController.markAsRead);

// POST /api/notifications/read-all - Mark all notifications as read
router.post('/read-all', notificationController.markAllAsRead);

export default router;
