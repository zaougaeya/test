import express from 'express'
import { body, param } from 'express-validator';
import { addOne,getAll,getById, deleteById} from '../Controllers/categorie.js';
const router = express.Router();

router.post(
    '/',
    body('namecat').isLength({ min: 5, max: 20 }).withMessage('Le nom doit contenir entre 5 et 20 caractères'),
    body('picturecat').notEmpty().withMessage('L\'image est obligatoire'),
    addOne
);
router.get('/', getAll);
router.get('/:id', param('id').isMongoId().withMessage('ID invalide'), getById);
router.delete('/:id', param('id').isMongoId().withMessage('ID invalide'), deleteById);
export default router;