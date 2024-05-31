// userRoutes.js
import { body, validationResult } from 'express-validator';
import express from 'express';
import { createUser, getUsers, getUserById, updateUser, deleteUser } from '../Controllers/UserController.js';
 
const router = express.Router();
 
// Routes CRUD pour les utilisateurs
 
 



router.post('/', [
    // Validation des champs
    body('nomuser').isLength({ min: 1 }).withMessage('Le nom est requis'),
    body('prenomuser').isLength({ min: 1 }).withMessage('Le prénom est requis'),
    body('ageuser').isNumeric().withMessage('L\'âge doit être un nombre')
    // Ajoutez d'autres validations pour les autres champs...
],createUser);
 
router.get('/', getUsers); // Récupérer tous les utilisateurs
router.get('/:id', getUserById); // Récupérer un utilisateur par son ID
router.put('/:id', updateUser); // Mettre à jour un utilisateur
router.delete('/:id', deleteUser); // Supprimer un utilisateur
 
export default router;