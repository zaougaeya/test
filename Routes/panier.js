// routes/panier.js

import express from 'express';
import { createPanier, getPanier, updatePanier, deletePanier, addItemToPanier } from '../Controllers/panierController.js';

const router = express.Router();

// Create a new Panier
router.post('/', createPanier);

// Get Panier by User ID
router.get('/:userId', getPanier);

// Update Panier by User ID
router.put('/:userId', updatePanier);

// Delete Panier by User ID
router.delete('/:userId', deletePanier);

// Add item to Panier
router.post('/:userId/add', addItemToPanier);

export default router;
