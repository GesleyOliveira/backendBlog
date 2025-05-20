import { Router } from 'express';
import multer from 'multer';
import { authMiddleware } from '../middleware/auth.middleware';
import {
  createArticle,
  listArticles,
  updateArticle,
  deleteArticle,
} from '../controllers/article.controller';

const router = Router();
const upload = multer({ dest: 'uploads/' });

router.get('/', listArticles);
router.post('/', authMiddleware, upload.single('coverImage'), createArticle);
router.put('/:id', authMiddleware, upload.single('coverImage'), updateArticle);
router.delete('/:id', authMiddleware, deleteArticle);

export default router;
