import express from 'express'
import { body, param } from 'express-validator';
import { addOne, getAll, getById, updateById, deleteById } from '../Controllers/article.js';

const router = express.Router();

router.post(
    '/',
    body('namearti').isLength({ min: 5, max: 20 }).withMessage('Le nom doit contenir entre 5 et 20 caractères'),
    body('desc').isLength({ min: 20 }).withMessage('La description doit contenir au moins 20 caractères'),
    body('prix').isNumeric().withMessage('Le prix doit être un nombre'),
    body('picturearti').notEmpty().withMessage('L\'image est obligatoire'),
    body('Quantite').isInt({ min: 0 }).withMessage('La quantité doit être un entier positif'),
    addOne
);

router.get('/', getAll);

router.get('/:id', param('id').isMongoId().withMessage('ID invalide'), getById);

router.put(
    '/:id',
    param('id').isMongoId().withMessage('ID invalide'),
    body('namearti').optional().isLength({ min: 5, max: 20 }).withMessage('Le nom doit contenir entre 5 et 20 caractères'),
    body('desc').optional().isLength({ min: 20 }).withMessage('La description doit contenir au moins 20 caractères'),
    body('prix').optional().isNumeric().withMessage('Le prix doit être un nombre'),
    body('picturearti').optional().notEmpty().withMessage('L\'image est requise'),
    body('Quantite').optional().isInt({ min: 0 }).withMessage('La quantité doit être un entier positif'),
    updateById
);

router.delete('/:id', param('id').isMongoId().withMessage('ID invalide'), deleteById);

export default router;
