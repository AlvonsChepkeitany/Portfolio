import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import * as taskController from '../controllers/taskController';

const router = Router();

// All routes require authentication
router.use(authenticate);

// GET /api/tasks/me - Get my tasks
router.get('/me', taskController.getMyTasks);

// PATCH /api/tasks/:id - Update task status
router.patch('/:id', taskController.updateTaskStatus);

// POST /api/tasks/:id/complete - Complete a task
router.post('/:id/complete', taskController.completeTask);

export default router;
