// panierController.js

import Panier from '../Models/panier.js';
import Article from '../Models/article.js';

// Create a new panier
export const createPanier = async (req, res) => {
    const { userId, items } = req.body;
    try {
        // Fetch the prices of the articles
        const itemsWithPrices = await Promise.all(items.map(async item => {
            const article = await Article.findById(item.productId);
            if (!article) throw new Error(`Article with ID ${item.productId} not found`);
            return { ...item, prix: article.prix }; // Add the price to the item
        }));

        // Calculate the total price
        const totalPrice = itemsWithPrices.reduce((acc, item) => acc + (item.quantity * item.prix), 0);

        // Create the panier with items including prices
        const newPanier = new Panier({ userId, items: itemsWithPrices, totalPrice });
        await newPanier.save();

        // Return the newly created panier with total price
        res.status(201).send({ ...newPanier.toObject(), totalPrice });
    } catch (error) {
        res.status(400).send(error);
    }
};

// Get Panier by User ID
export const getPanier = async (req, res) => {
    const { userId } = req.params;
    try {
        const panier = await Panier.findOne({ userId });
        if (!panier) return res.status(404).send({ message: 'Panier not found' });
        res.status(200).send(panier);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Update Panier by User ID
export const updatePanier = async (req, res) => {
    const { userId } = req.params;
    const { items } = req.body;
    try {
        // Fetch the prices of the articles
        const itemsWithPrices = await Promise.all(items.map(async item => {
            const article = await Article.findById(item.productId);
            if (!article) throw new Error(`Article with ID ${item.productId} not found`);
            return { ...item, prix: article.prix }; // Add the price to the item
        }));

        // Calculate the total price
        const totalPrice = itemsWithPrices.reduce((acc, item) => acc + (item.quantity * item.prix), 0);

        // Update the panier with items including prices
        const updatedPanier = await Panier.findOneAndUpdate({ userId }, { items: itemsWithPrices, totalPrice }, { new: true });
        if (!updatedPanier) return res.status(404).send({ message: 'Panier not found' });
        res.status(200).send(updatedPanier);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Delete Panier by User ID
export const deletePanier = async (req, res) => {
    const { userId } = req.params;
    try {
        const deletedPanier = await Panier.findOneAndDelete({ userId });
        if (!deletedPanier) return res.status(404).send({ message: 'Panier not found' });
        res.status(200).send({ message: 'Panier deleted successfully' });
    } catch (error) {
        res.status(500).send(error);
    }
};

// Add item to Panier
export const addItemToPanier = async (req, res) => {
    const { userId } = req.params;
    const { productId, quantity } = req.body;
    try {
        const panier = await Panier.findOne({ userId });
        if (!panier) {
            // If panier doesn't exist, create a new one
            const article = await Article.findById(productId);
            if (!article) throw new Error(`Article with ID ${productId} not found`);
            const newItem = { productId, quantity, prix: article.prix };
            const newPanier = new Panier({ userId, items: [newItem], totalPrice: quantity * article.prix });
            await newPanier.save();
            res.status(201).send(newPanier);
        } else {
            // If panier exists, update it with the new item
            const itemIndex = panier.items.findIndex(item => item.productId.toString() === productId);
            if (itemIndex > -1) {
                // If item already exists, update its quantity
                panier.items[itemIndex].quantity += quantity;
                panier.totalPrice += quantity * panier.items[itemIndex].prix;
            } else {
                // If item doesn't exist, add it to the panier
                const article = await Article.findById(productId);
                if (!article) throw new Error(`Article with ID ${productId} not found`);
                panier.items.push({ productId, quantity, prix: article.prix });
                panier.totalPrice += quantity * article.prix;
            }
            await panier.save();
            res.status(200).send(panier);
        }
    } catch (error) {
        res.status(400).send(error); }
    
    }