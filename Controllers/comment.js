import { validationResult } from 'express-validator';
import Comment from '../Models/comment.js';
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
        existingArticle.comments.push(savedComment._id);
        await existingArticle.save();
        res.status(201).json(savedComment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const getCommentsByArticle = async (req, res) => {
    try {
        const comments = await Comment.find({article: req.params.articleId }).populate('user', 'nomuser prenomuser');
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};