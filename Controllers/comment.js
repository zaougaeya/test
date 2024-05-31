import { validationResult } from 'express-validator';
import Comment from '../Models/Comment.js';
import Article from '../Models/article.js';

export const addComment = async (req, res) => {
    const { user, article, content, rating } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const existingArticle = await Article.findById(article);
        if (!existingArticle) {
            return res.status(404).json({ message: 'Article non trouvé' });
        }
        const newComment = new Comment({
            user,
            article,
            content,
            rating,
        });

        const savedComment = await newComment.save();
        await Article.findByIdAndUpdate(article, { $push: { comments: savedComment._id } });

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


export const updateComment = async (req, res) => {
    const { user, content, rating } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const comment = await Comment.findById(req.params.commentId);
        if (!comment) {
            return res.status(404).json({ message: 'Commentaire non trouvé' });
        }

        if (String(comment.user) !== user) {
            return res.status(403).json({ message: 'Non autorisé à modifier ce commentaire' });
        }

        comment.content = content;
        comment.rating = rating;

        const updatedComment = await comment.save();
        res.status(200).json(updatedComment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.commentId);
        if (!comment) {
            return res.status(404).json({ message: 'Commentaire non trouvé' });
        }

        await Comment.findByIdAndDelete(req.params.commentId);
        await Article.findByIdAndUpdate(comment.article, { $pull: { comments: req.params.commentId } });

        res.status(200).json({ message: 'Commentaire supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


