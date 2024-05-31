import express from 'express';
import { body } from 'express-validator';
import { addComment, getCommentsByArticle } from '../Controllers/comment.js';

const router = express.Router();
router.post('/',
    body('user').isMongoId().withMessage('ID utilisateur invalide'),
    body('article').isMongoId().withMessage('ID article invalide'),
    body('content').isLength({ min: 1 }).withMessage('Le contenu est requis'),
    body('rating').isInt({ min: 1, max: 5 }).withMessage('La note doit être entre 1 et 5'),
    addComment
);
router.get('/:articleId', getCommentsByArticle);
export default router;
