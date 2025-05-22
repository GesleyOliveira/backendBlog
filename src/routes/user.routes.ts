import { Router } from 'express';
import { 
    registerUser, 
    loginUser, 
    resetPassword, 
    getProfile,
    updateProfile 
        } from '../controllers/user.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { upload } from '../config/multer';


const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/reset-password', resetPassword);
router.put('/update-profile', authMiddleware, upload.single('avatar'), updateProfile);
router.get('/profile', authMiddleware, getProfile);

export default router;
