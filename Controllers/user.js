// controllers/user.js

import User from "../Models/user.js";  // Adjust the path as necessary

export const addUser = async (req, res) => {
    try {
        const userData = req.body;
        const user = new User(userData);
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
