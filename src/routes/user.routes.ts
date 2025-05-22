import { Router } from 'express';
import multer from 'multer';
import { 
    registerUser, 
    loginUser, 
    resetPassword, 
    getProfile,
    updateProfile 
        } from '../controllers/user.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { storage } from '../config/multer';



const router = Router();

const uploadMiddleware = multer({ storage });

router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/reset-password', resetPassword);
router.put('/update-profile', authMiddleware, uploadMiddleware.single('avatar'), updateProfile);
router.get('/profile', authMiddleware, getProfile);

export default router;
