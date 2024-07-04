import express from 'express'
import { body, param } from 'express-validator';
import { addOne,getAll,getByName, deleteById,updateById} from '../Controllers/produit.js';
const router = express.Router();

router.post(
    '/',
    body('nameprod'),
    body('desc'),
    body('prix'),
    body('pictureprod').notEmpty().withMessage('L\'image est obligatoire'),
    body('quantiteprod'),
    body('categoryprod').isMongoId().withMessage('ID de catégorie invalide'),
    addOne
);
router.get('/', getAll);
router.get('/:name', param('name').isMongoId().withMessage('Nom invalid'), getByName);
router.delete('/:id', param('id').isMongoId().withMessage('ID invalide'), deleteById);
router.put(
    '/:id',
    param('id').isMongoId().withMessage('ID invalide'),
    body('nameprod'),
    body('desc'),
    body('prix'),
    body('pictureprod').notEmpty().withMessage('L\'image est obligatoire'),
    body('quantiteprod'),
    body('categoryprod').isMongoId().withMessage('ID de catégorie invalide'),
        updateById
    );
  

export default router;