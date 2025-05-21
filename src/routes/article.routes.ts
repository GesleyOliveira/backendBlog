import { Router } from 'express';
import multer from 'multer';
import { authMiddleware } from '../middleware/auth.middleware';
import {
  createArticle,
  listArticles,
  getArticleById,
  updateArticle,
  deleteArticle,
} from '../controllers/article.controller';

const router = Router();
const upload = multer({ dest: 'uploads/' });

// GET
router.get('/', listArticles);
router.get('/:id', getArticleById);

// POST
router.post('/', authMiddleware, upload.single('coverImage'), createArticle);

// PUT
router.put('/:id', authMiddleware, upload.single('coverImage'), updateArticle);

// DELETE
router.delete('/:id', authMiddleware, deleteArticle);

export default router;
