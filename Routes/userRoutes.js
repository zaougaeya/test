// userRoutes.js

import express from 'express';
<<<<<<< Updated upstream
import { createUser, getUsers, getUserById, updateUser, deleteUser } from '../Controllers/UserController.js';
=======
import {  getUsers, getUserById, updateUser, deleteUser, register } from '../Controllers/UserController.js';
>>>>>>> Stashed changes

const router = express.Router();

// Routes CRUD pour les utilisateurs
router.post('/', createUser); // Créer un nouvel utilisateur
router.get('/', getUsers); // Récupérer tous les utilisateurs
router.get('/:id', getUserById); // Récupérer un utilisateur par son ID
router.put('/:id', updateUser); // Mettre à jour un utilisateur
router.delete('/:id', deleteUser); // Supprimer un utilisateur

export default router;
