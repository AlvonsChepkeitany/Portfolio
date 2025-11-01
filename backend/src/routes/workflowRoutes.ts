import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth';
import * as workflowController from '../controllers/workflowController';

const router = Router();

// All routes require authentication
router.use(authenticate);

// POST /api/workflows - Create a new workflow
router.post('/', workflowController.createWorkflow);

// GET /api/workflows - List all workflows
router.get('/', workflowController.getWorkflows);

// GET /api/workflows/:id - Get a workflow by ID
router.get('/:id', workflowController.getWorkflowById);

// POST /api/workflows/:id/start - Start a workflow instance
router.post('/:id/start', workflowController.startWorkflow);

export default router;
