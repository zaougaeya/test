import express from 'express'
import { body, param } from 'express-validator';
import { addOne,getAll,getByName, deleteById,updateById} from '../Controllers/produit.js';
const router = express.Router();

router.post(
    '/',
    body('nameprod').isLength({ min: 5, max: 20 }).withMessage('Le nom doit contenir entre 5 et 20 caractères'),
    body('desc').isLength({ min: 20 }).withMessage('La description doit contenir au moins 20 caractères'),
    body('prix').isNumeric().withMessage('Le prix doit être un nombre'),
    body('pictureprod').notEmpty().withMessage('L\'image est obligatoire'),
    body('quantiteprod').isInt({ min: 0 }).withMessage('La quantité doit être un entier positif'),
    body('categoryprod').isMongoId().withMessage('ID de catégorie invalide'),
    addOne
);
router.get('/', getAll);
router.get('/:name', param('name').isMongoId().withMessage('Nom invalid'), getByName);
router.delete('/:id', param('id').isMongoId().withMessage('ID invalide'), deleteById);

router.put(
    '/:id',
    param('id').isMongoId().withMessage('ID invalide'),
    body('nameprod').isLength({ min: 5, max: 20 }).withMessage('Le nom doit contenir entre 5 et 20 caractères'),
    body('desc').isLength({ min: 20 }).withMessage('La description doit contenir au moins 20 caractères'),
    body('prix').isNumeric().withMessage('Le prix doit être un nombre'),
    body('pictureprod').notEmpty().withMessage('L\'image est obligatoire'),
    body('quantiteprod').isInt({ min: 0 }).withMessage('La quantité doit être un entier positif'),
    body('categoryprod').isMongoId().withMessage('ID de catégorie invalide'),
        updateById
    );
  

export default router;