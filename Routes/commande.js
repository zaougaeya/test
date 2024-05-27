// Routes/commandeRouter.js
import express from 'express';
import { createCommande, getAllCommandes, getCommandeById, updateCommande, deleteCommande } from '../Controllers/commandeController.js';

const router = express.Router();

// Create a new Commande
router.post('/', createCommande);

// Get all commandes
router.get('/', getAllCommandes);

// Get a single commande by ID
router.get('/:id', getCommandeById);

// Update a commande by ID
router.put('/:id', updateCommande);

// Delete a commande by ID
router.delete('/:id', deleteCommande);

export default router;
