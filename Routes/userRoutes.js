// Routes/userRoutes.js
import express from 'express';
import User from '../models/user.js'; // Assurez-vous que le chemin est correct

const router = express.Router();

// Route pour ajouter un utilisateur
router.post('/', async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).send(newUser);
    } catch (err) {
        res.status(400).send(err);
    }
});

export default router;
