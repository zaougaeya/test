import express from 'express';
import { body, param } from 'express-validator';
import { addComment, getCommentsByArticle, getCommentsByProduit } from '../Controllers/comment.js';

const router = express.Router();

router.post('/',
    body('user').isMongoId().withMessage('ID utilisateur invalide'),
    body('content').isLength({ min: 1 }).withMessage('Le contenu est requis'),
    body('rating').isInt({ min: 1, max: 5 }).withMessage('La note doit être entre 1 et 5'),
    body('article').optional().isMongoId().withMessage('ID article invalide'),
    body('produit').optional().isMongoId().withMessage('ID produit invalide'),
    addComment
);
router.get('/article/:articleId', param('articleId').isMongoId().withMessage('ID article invalide'), getCommentsByArticle);
router.get('/produit/:produitId', param('produitId').isMongoId().withMessage('ID produit invalide'), getCommentsByProduit);
export default router;