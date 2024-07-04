import express from 'express';
import { body, param } from 'express-validator';
import { addOne, getAll, getById, getByName,updateById, deleteById,getByCategoryName,getAllByPriceAscending} from '../Controllers/article.js';

const router = express.Router();
router.post(
    '/',
    body('namearti'),
    body('desc'),
    body('picturearti'),
    body('Quantite'),
    body('category').isMongoId().withMessage('ID de catégorie invalide'),
    body('discount'),
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
    param('id'),
    body('namearti'),
    body('desc'),
    body('prix'),
    body('picturearti'),
    body('Quantite'),
    body('category'),
    body('discount'),
    updateById
);
router.delete('/:id', 
    param('id').isMongoId().withMessage('ID invalide'), 
    deleteById
);
router.get('/category/byname',
    getByCategoryName
);
router.get('/sort/price', getAllByPriceAscending);


export default router;