import express from 'express';
import { body, param } from 'express-validator';
import { addComment, getCommentsByArticle,updateComment,deleteComment} from '../Controllers/comment.js';

const router = express.Router();

router.post('/',
    body('user').isMongoId().withMessage('ID utilisateur invalide'),
    body('content').isLength({ min: 1 }).withMessage('Le contenu est requis'),
    body('rating').isInt({ min: 1, max: 5 }).withMessage('La note doit être entre 1 et 5'),
    body('article').optional().isMongoId().withMessage('ID article invalide'),
    addComment
);
router.get('/article/:articleId', param('articleId').isMongoId().withMessage('ID article invalide'), getCommentsByArticle);
router.put('/:commentId',
    param('commentId').isMongoId().withMessage('ID de commentaire invalide'),
    body('user').isMongoId().withMessage('ID utilisateur invalide'),
    body('content').isLength({ min: 1 }).withMessage('Le contenu est requis'),
    body('rating').isInt({ min: 1, max: 5 }).withMessage('La note doit être entre 1 et 5'),
    body('article').optional().isMongoId().withMessage('ID article invalide'),
    updateComment
);

router.delete('/:commentId', param('commentId').isMongoId().withMessage('ID de commentaire invalide'), deleteComment);

export default router;