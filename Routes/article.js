import express from 'express';
import { body, param } from 'express-validator';
import { addOne, getAll, getById, getByName,updateById, deleteById,getByCategoryName,getAllByPriceAscending} from '../Controllers/article.js';

const router = express.Router();
router.post(
    '/',
    body('namearti').isLength({ min: 5, max: 20 }).withMessage('Le nom doit contenir entre 5 et 20 caractères'),
    body('desc').isLength({ min: 20 }).withMessage('La description doit contenir au moins 20 caractères'),
    body('prix').isNumeric().withMessage('Le prix doit être un nombre'),
    body('picturearti').notEmpty().withMessage('L\'image est obligatoire'),
    body('Quantite').isInt({ min: 0 }).withMessage('La quantité doit être un entier positif'),
    body('category').isMongoId().withMessage('ID de catégorie invalide'),
    body('discount').optional().isNumeric().withMessage('La remise doit être un nombre').isInt({ min: 0, max: 100 }).withMessage('La remise doit être un pourcentage entre 0 et 100'),
    addOne
);

router.get('/', getAll);

/*router.get('/:id', 
    param('id').isMongoId().withMessage('ID invalide'), 
    getById
);*/

router.get('/:name', param('name').isMongoId().withMessage('Nom invalid'), getByName);
router.put(
    '/:id',
    param('id').isMongoId().withMessage('ID invalide'),
    body('namearti').optional().isLength({ min: 5, max: 20 }).withMessage('Le nom doit contenir entre 5 et 20 caractères'),
    body('desc').optional().isLength({ min: 20 }).withMessage('La description doit contenir au moins 20 caractères'),
    body('prix').optional().isNumeric().withMessage('Le prix doit être un nombre'),
    body('picturearti').optional().notEmpty().withMessage('L\'image est requise'),
    body('Quantite').optional().isInt({ min: 0 }).withMessage('La quantité doit être un entier positif'),
    body('category').optional().isMongoId().withMessage('ID de catégorie invalide'),
    body('discount').optional().isNumeric().withMessage('La remise doit être un nombre').isInt({ min: 0, max: 100 }).withMessage('La remise doit être un pourcentage entre 0 et 100'),
    updateById
);
router.delete('/:id', 
    param('id').isMongoId().withMessage('ID invalide'), 
    deleteById
);
router.get('/category/:categoryName', 
    param('categoryName').isString().withMessage('Nom de catégorie invalide'), 
    getByCategoryName
);
router.get('/sort/price', getAllByPriceAscending);


export default router;