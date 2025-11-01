import express from 'express';
import { register, login, getProfile } from '../controllers/authController';
import { authenticate } from '../middleware/auth';
import { authLimiter, apiLimiter } from '../middleware/rateLimiter';

const router = express.Router();

router.post('/register', authLimiter, register);
router.post('/login', authLimiter, login);
router.get('/profile', apiLimiter, authenticate, getProfile);

export default router;
