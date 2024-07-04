import { validationResult } from 'express-validator';
import User from '../Models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
 
dotenv.config(); // Charge les variables d'environnement
 
const JWT_SECRET="mySuperSecretKey123!$%&*()";
const emailUser = "oumayma.boughanmi@esprit.tn";
const emailPass = "oumaBOGH999@";
 
console.log('JWT_SECRET:', JWT_SECRET); // Add this line in userController.js
 
 
export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
 
 
export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { nomuser, prenomuser, ageuser, phoneuser, sexeuser, mailuser, passworduser, addresseuser } = req.body;
 
   
    if (!nomuser || !prenomuser || !ageuser || !phoneuser || !sexeuser || !mailuser || !passworduser || !addresseuser) {
        return res.status(400).json({ message: 'Tous les champs sont requis' });
    }
    if (typeof ageuser !== 'number') {
        return res.status(400).json({ message: 'L\'âge doit être un nombre' });
    }
    if (phoneuser.toString().length !== 8) {
        return res.status(400).json({ message: 'Le numéro de téléphone doit comporter 8 chiffres' });
    }
    if (!['male', 'femme', 'autre'].includes(sexeuser)) {
        return res.status(400).json({ message: 'Veuillez choisir : male, femme ou autre' });
    }
   
 
    try {
        const updatedUser = await User.findByIdAndUpdate(id, { nomuser, prenomuser, ageuser, phoneuser, sexeuser, mailuser, passworduser, addresseuser }, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
 
 
export const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
 
 
 
export const register = async (req, res) => {
    const { nomuser, prenomuser, ageuser, phoneuser, sexeuser, mailuser, passworduser, addresseuser } = req.body;
 
    // Valider les entrées
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
 
    // Vérifier si tous les champs sont présents
    if (!nomuser || !prenomuser || !ageuser || !phoneuser || !sexeuser || !mailuser || !passworduser || !addresseuser) {
        return res.status(400).json({ message: 'Tous les champs sont requis' });
    }
    if (typeof ageuser !== 'number') {
        return res.status(400).json({ message: 'L\'âge doit être un nombre' });
    }
    if (phoneuser.toString().length !== 8) {
        return res.status(400).json({ message: 'Le numéro de téléphone doit comporter 8 chiffres' });
    }
    if (!['male', 'femme', 'autre'].includes(sexeuser)) {
        return res.status(400).json({ message: 'Veuillez choisir : male, femme ou autre' });
    }
 
    try {
        // Vérifier si l'utilisateur existe déjà
        const existingUser = await User.findOne({ mailuser });
        if (existingUser) {
            return res.status(400).json({ message: 'Cet email est déjà utilisé.' });
        }
 
        // Hacher le mot de passe
        const hashedPassword = await bcrypt.hash(passworduser, 10);
 
        // Créer un nouvel utilisateur
        const newUser = new User({
            nomuser,
            prenomuser,
            ageuser,
            phoneuser,
            sexeuser,
            mailuser,
            passworduser: hashedPassword,
            addresseuser
        });
 
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
 
 
export const login = async (req, res) => {

    const { mailuser, passworduser } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
        
    }

    try {
        const user = await User.findOne({ mailuser });
        if (!user) {
            return res.status(400).json({ message: 'Email ou mot de passe incorrect' });
        }

        const isMatch = await bcrypt.compare(passworduser, user.passworduser);
        if (!isMatch) {
            return res.status(400).json({ message: 'Email ou mot de passe incorrect' });
        }
         const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: 'login ok', token: token, id: user._id });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: error.message });
    }
};

export const verifyToken = (req, res) => {
    const token = req.body['token'];

    if (!token) {
        return res.status(403).json({ message: 'No token provided.' });
    }

    jwt.verify(token, JWT_SECRET, async (err, decoded) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to authenticate token.' });
        }

        try {
            const user = await User.findById(decoded.id);
            if (!user) {
                return res.status(404).json({ message: 'User not found.' });
            }
            res.status(200).json({ message: 'Token is valid.', user });
        } catch (error) {
            res.status(500).json({ message: 'Server error.' });
        }
    });
};

 
export const forgotPassword = async (req, res) => {
    const { mailuser } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const user = await User.findOne({ mailuser });
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: emailUser,
                pass: emailPass,
            },
        });

        const mailOptions = {
            to: user.mailuser,
            subject: 'Réinitialisation de mot de passe',
            text: `Vous avez demandé la réinitialisation de votre mot de passe. Veuillez utiliser le lien suivant pour réinitialiser votre mot de passe : ${token}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500).json({ message: error.message });
            }
            res.status(200).json({ message: 'Email de réinitialisation envoyé' });
        });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

 
export const resetPassword = async (req, res) => {
     const { passworduser,token } = req.body;
 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
 
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
 
        const hashedPassword = await bcrypt.hash(passworduser, 10);
 
        user.passworduser = hashedPassword;
        await user.save();
 
        res.status(200).json({ message: 'Mot de passe réinitialisé avec succès' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
 