// userController.js
import { validationResult } from 'express-validator';
 
import User from '../Models/user.js';
 
// Créer un nouvel utilisateur
export const createUser = async (req, res) => {
    const { nomuser, prenomuser, ageuser, phoneuser, sexeuser, mailuser, passworduser, addresseuser } = req.body;
 
    // Valider les champs (ajoutez d'autres validations selon vos besoins)
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
        const newUser = new User({ nomuser, prenomuser, ageuser, phoneuser, sexeuser, mailuser, passworduser, addresseuser });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
 
// Récupérer tous les utilisateurs
export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
 
// Récupérer un utilisateur par son ID
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
 
    // Valider les champs (ajoutez d'autres validations selon vos besoins)
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
    // Ajoutez d'autres validations selon vos besoins...
 
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
 
// Supprimer un utilisateur
export const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};