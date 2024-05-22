import express from 'express';
import { addComment, getCommentsByBlogId } from '../controllers/commentaire.js';

const router = express.Router();

// Ajouter un commentaire
router.post('/', addComment);

// Récupérer tous les commentaires d'un blog
router.get('/:blogId', getCommentsByBlogId);

export default router;
