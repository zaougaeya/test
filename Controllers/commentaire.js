import Commentaire from '../models/commentaire.js';

// Ajouter un commentaire
export const addComment = async (req, res) => {
    try {
        const { content, author, blogId } = req.body;
        const newComment = new Commentaire({ content, author, blogId });
        const savedComment = await newComment.save();
        res.status(201).json(savedComment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Récupérer tous les commentaires d'un blog
export const getCommentsByBlogId = async (req, res) => {
    try {
        const comments = await Commentaire.find({ blogId: req.params.blogId });
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
