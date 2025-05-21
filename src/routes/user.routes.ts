import { Router } from 'express';
import { registerUser, loginUser, resetPassword, getProfile } from '../controllers/user.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/reset-password', resetPassword);
router.get('/profile', authMiddleware, getProfile);

export default router;
