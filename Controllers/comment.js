import { validationResult } from 'express-validator';
import Comment from '../Models/comment.js';
import Article from '../Models/article.js';
import Produit from '../Models/produit.js';

export const addComment = async (req, res) => {
    const { user, article, produit, content, rating } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        if (article) {
            const existingArticle = await Article.findById(article);
            if (!existingArticle) {
                return res.status(404).json({ message: 'Article non trouvé' });
            }
        } else if (produit) {
            const existingProduit = await Produit.findById(produit);
            if (!existingProduit) {
                return res.status(404).json({ message: 'Produit non trouvé' });
            }
        } else {
            return res.status(400).json({ message: 'Un commentaire doit être lié à un article ou un produit.' });
        }

        const newComment = new Comment({
            user,
            article,
            produit,
            content,
            rating,
        });

        const savedComment = await newComment.save();
        
        if (article) {
            await Article.findByIdAndUpdate(article, { $push: { comments: savedComment._id } });
        } else {
            await Produit.findByIdAndUpdate(produit, { $push: { comments: savedComment._id } });
        }

        res.status(201).json(savedComment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getCommentsByArticle = async (req, res) => {
    try {
        const comments = await Comment.find({ article: req.params.articleId }).populate('user', 'nomuser prenomuser');
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getCommentsByProduit = async (req, res) => {
    try {
        const comments = await Comment.find({ produit: req.params.produitId }).populate('user', 'nomuser prenomuser');
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
