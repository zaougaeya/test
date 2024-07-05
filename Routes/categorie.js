import express from 'express'
import { body, param } from 'express-validator';
import categorie from '../Models/categorie.js';
import { addOne,getAll,getByName, deleteById,updateById,getById} from '../Controllers/categorie.js';

const router = express.Router();

router.post(
    '/',addOne
   
);
router.get('/', getAll);
router.get('/:id',getById)
router.get('/:name', param('name').isMongoId().withMessage('Nom invalid'), getByName);
router.delete('/:id', param('id').isMongoId().withMessage('ID invalide'), deleteById);

router.put(
    '/:id',
    param('id').isMongoId().withMessage('ID invalide'),
    body('namecat'),
    body('picturecat'),
    updateById
);

export default router;