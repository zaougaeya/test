
import { body } from 'express-validator';
import express from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { getUsers, getUserById, updateUser, deleteUser, register, login, forgotPassword, resetPassword } from '../Controllers/UserController.js';
//import { changePassword } from '../Controllers/UserController.js';
 
const router = express.Router();
dotenv.config(); // Load environment variables
 
// Route d'inscription
router.post('/register', [
    body('nomuser').isLength({ min: 1 }).withMessage('Le nom est requis'),
    body('prenomuser').isLength({ min: 1 }).withMessage('Le prénom est requis'),
    body('ageuser').isNumeric().withMessage('L\'âge doit être un nombre'),
    body('phoneuser').isLength({ min: 8, max: 8 }).withMessage('Le numéro de téléphone doit comporter 8 chiffres'),
    body('sexeuser').isIn(['male', 'femme', 'autre']).withMessage('Le sexe doit être male, femme ou autre'),
    body('mailuser').isEmail().withMessage('L\'email doit être valide'),
    body('passworduser').isLength({ min: 6 }).withMessage('Le mot de passe doit comporter au moins 6 caractères'),
    body('addresseuser').isLength({ min: 1 }).withMessage('L\'adresse est requise')
], register);
 
// Route de login
router.post('/login', [
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
    body('sexeuser').isIn(['male', 'femme', 'autre']).withMessage('Le sexe doit être male, femme ou autre'),
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
 
 
 
 
const emailUser = "oumayma.boughanmi@esprit.tn";
const emailPass = "oumaBOGH999@";
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: emailUser,
        pass: emailPass,
    },
});
router.post('/send-test-email', async (req, res) => {
    const { to, subject, text } = req.body;
 
    if (!to) {
        return res.status(400).json({ message: 'Recipient email address is required' });
    }
 
    const mailOptions = {
        from: emailUser,
        to,
        subject,
        text,
    };
 
    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
 
export default router;