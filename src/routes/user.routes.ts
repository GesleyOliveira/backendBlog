import { Router } from 'express';
import { registerUser, loginUser, resetPassword  } from '../controllers/user.controller';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.put("/reset-password", resetPassword);

export default router;
