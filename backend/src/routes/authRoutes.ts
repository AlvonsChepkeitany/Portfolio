import { Router } from 'express';
import { body } from 'express-validator';
import * as authController from '../controllers/authController';

const router = Router();

// POST /api/auth/register
router.post(
  '/register',
  [
    body('email').isEmail().withMessage('Invalid email address'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters'),
    body('name').notEmpty().withMessage('Name is required'),
    body('role').optional().isIn(['ADMIN', 'MANAGER', 'MEMBER']),
  ],
  authController.register
);

// POST /api/auth/login
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  authController.login
);

export default router;
