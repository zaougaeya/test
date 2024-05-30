// Controllers/commandeController.js 
import Commande from '../Models/commande.js';
import Panier from '../Models/panier.js';
import { generateOrderPDF } from '../utils/pdfGenerator.js';

export const pdfcreate = async (req, res) => {
    const { userId, panierId } = req.body;
    console.log('Received request to create PDF with:', { userId, panierId });

    try {
        if (!userId || !panierId) {
            console.error('User ID and Panier ID are required');
            return res.status(400).send({ message: 'User ID and Panier ID are required' });
        }

        const panier = await Panier.findById(panierId);
        if (!panier) {
            console.error('Panier not found with ID:', panierId);
            return res.status(404).send({ message: 'Panier not found' });
        }

        const newCommande = new Commande({ userId, panierId, orderTotal: panier.totalPrice });
        await newCommande.save();
        console.log('New commande created:', newCommande);

        const order = {
            ...newCommande.toObject(),
            items: panier.items // Add items to the order object
        };

        const pdfPath = generateOrderPDF(order);
        console.log('PDF generated at path:', pdfPath);

        res.status(201).send({ ...newCommande.toObject(), pdfPath });
    } catch (error) {
        console.error('Error creating commande:', error);
        res.status(400).send({ message: 'Error creating commande', error });
    }
};

// Create a new Commande
export const createCommande = async (req, res) => {
    const { userId, panierId } = req.body;
    try {
        // Check if userId and panierId are provided
        if (!userId || !panierId) {
            return res.status(400).send({ message: 'User ID and Panier ID are required' });
        }

        // Create the commande
        const newCommande = new Commande({ userId, panierId });
        await newCommande.save();
        
        res.status(201).send(newCommande);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Get all commandes
export const getAllCommandes = async (req, res) => {
    try {
        const commandes = await Commande.find();
        res.status(200).send(commandes);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Get a single commande by ID
export const getCommandeById = async (req, res) => {
    const { id } = req.params;
    try {
        const commande = await Commande.findById(id);
        if (!commande) {
            return res.status(404).send({ message: 'Commande not found' });
        }
        res.status(200).send(commande);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Update a commande by ID
export const updateCommande = async (req, res) => {
    const { id } = req.params;
    const { userId, panierId } = req.body;
    try {
        const updatedCommande = await Commande.findByIdAndUpdate(id, { userId, panierId }, { new: true });
        if (!updatedCommande) {
            return res.status(404).send({ message: 'Commande not found' });
        }
        res.status(200).send(updatedCommande);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Delete a commande by ID
export const deleteCommande = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedCommande = await Commande.findByIdAndDelete(id);
        if (!deletedCommande) {
            return res.status(404).send({ message: 'Commande not found' });
        }
        res.status(200).send({ message: 'Commande deleted successfully' });
    } catch (error) {
        res.status(500).send(error);
    }
};
