import { body } from 'express-validator';
import express from 'express';
//import { getUsers, getUserById, updateUser, deleteUser, register, login } from '../Controllers/UserController.js';
//import { forgotPassword, resetPassword } from '../Controllers/UserController.js'; 
import { getUsers, getUserById, updateUser, deleteUser, register, login, forgotPassword, resetPassword } from '../Controllers/UserController.js'; 

const router = express.Router();

// Route d'inscription
router.post('/register', [
    body('nomuser').isLength({ min: 1 }).withMessage('Le nom est requis'),
    body('prenomuser').isLength({ min: 1 }).withMessage('Le prénom est requis'),
    body('ageuser').isNumeric().withMessage('L\'âge doit être un nombre'),
    body('phoneuser').isLength({ min: 8, max: 8 }).withMessage('Le numéro de téléphone doit comporter 8 chiffres'),
    body('sexeuser').isIn(['male', 'femme', 'autre']).withMessage('Le sexe doit être male, femelle ou autre'),
    body('mailuser').isEmail().withMessage('L\'email doit être valide'),
    body('passworduser').isLength({ min: 6 }).withMessage('Le mot de passe doit comporter au moins 6 caractères'),
    body('addresseuser').isLength({ min: 1 }).withMessage('L\'adresse est requise')
], register);

// Route de login
router.post('/register/login', [
    body('mailuser').isEmail().withMessage('L\'email doit être valide'),
    body('passworduser').isLength({ min: 6 }).withMessage('Le mot de passe doit comporter au moins 6 caractères')
], login);



// Route pour obtenir tous les utilisateurs
router.get('/', getUsers);

// Route pour obtenir un utilisateur par ID
router.get('/:id', getUserById);

// Route pour mettre à jour un utilisateur
router.put('/:id', [
    body('nomuser').isLength({ min: 1 }).withMessage('Le nom est requis'),
    body('prenomuser').isLength({ min: 1 }).withMessage('Le prénom est requis'),
    body('ageuser').isNumeric().withMessage('L\'âge doit être un nombre'),
    body('phoneuser').isLength({ min: 8, max: 8 }).withMessage('Le numéro de téléphone doit comporter 8 chiffres'),
    body('sexeuser').isIn(['male', 'femme', 'autre']).withMessage('Le sexe doit être male, femelle ou autre'),
    body('mailuser').isEmail().withMessage('L\'email doit être valide'),
    body('passworduser').isLength({ min: 6 }).withMessage('Le mot de passe doit comporter au moins 6 caractères'),
    body('addresseuser').isLength({ min: 1 }).withMessage('L\'adresse est requise')
], updateUser);

// Route pour supprimer un utilisateur
router.delete('/:id', deleteUser);

router.post('/forgot-password', [
    body('mailuser').isEmail().withMessage('L\'email doit être valide')
], forgotPassword);

router.post('/reset-password/:token', [
    body('passworduser').isLength({ min: 6 }).withMessage('Le mot de passe doit comporter au moins 6 caractères')
], resetPassword);

export default router;

