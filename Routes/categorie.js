import express from 'express'
import { body, param } from 'express-validator';
import categorie from '../Models/categorie.js';
import { addOne,getAll,getByName, deleteById,updateById} from '../Controllers/categorie.js';
const router = express.Router();

router.post(
    '/',
    body('namecat').isLength({ min: 5, max: 20 }).withMessage('Le nom doit contenir entre 5 et 20 caractères'),
    body('namecat').custom(async (value) => {
        const existingCategory = await categorie.findOne({ namecat: value });
        if (existingCategory) {
            return Promise.reject('Le nom de la catégorie existe déjà');
        }
    }),
    body('picturecat').notEmpty().withMessage('L\'image est obligatoire'),
    addOne
);
router.get('/', getAll);
router.get('/:name', param('name').isMongoId().withMessage('Nom invalid'), getByName);
router.delete('/:id', param('id').isMongoId().withMessage('ID invalide'), deleteById);

router.put(
    '/:id',
    param('id').isMongoId().withMessage('ID invalide'),
    body('namecat').isLength({ min: 5, max: 20 }).withMessage('Le nom doit contenir entre 5 et 20 caractères'),
    body('namecat').custom(async (value, { req }) => {
        const existingCategory = await categorie.findOne({ namecat: value, _id: { $ne: req.params.id } });
        if (existingCategory) {
            throw new Error('Le nom de la catégorie existe déjà');
        }
    }),
    body('picturecat').notEmpty().withMessage('L\'image est obligatoire'),
    updateById
);

export default router;