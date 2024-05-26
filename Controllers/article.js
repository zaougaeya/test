import article from '../Models/article.js'

import { validationResult } from 'express-validator';

export function addOne(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log("Erreurs de validation :", errors.array());
        return res.status(400).json({ errors: errors.array() });
    }
    req.body.dateAdded = new Date();
    console.log("Données de la requête (req.body) :", req.body);

    article.create(req.body)
        .then(newArticle => {
            console.log("Nouvel article créé avec succès :", newArticle);
            res.status(201).json(newArticle);
        })
        .catch(err => {
            console.error("Erreur lors de la création de l'article :", err);
            res.status(500).json(err);
        });
}


export function getAll(req, res) {
    article.find().populate('category')
        .then(articles => res.status(200).json(articles))
        .catch(err => res.status(500).json(err));
}

export function getById(req, res) {
    article.findById(req.params.id).populate('category')
        .then(article => {
            if (!article) return res.status(404).json({ message: 'Article non trouvé' });
            res.status(200).json(article);
        })
        .catch(err => res.status(500).json(err));
}

export function updateById(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    article.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(updatedArticle => {
            if (!updatedArticle) return res.status(404).json({ message: 'Article non trouvé '});
            res.status(200).json(updatedArticle);
        })
        .catch(err => res.status(500).json(err));
}

export function deleteById(req, res) {
    article.findByIdAndDelete(req.params.id)
        .then(deletedArticle => {
            if (!deletedArticle) return res.status(404).json({ message: 'Article non trouvé' });
            res.status(200).json({ message: 'suppression effectué' });
        })
        .catch(err => res.status(500).json(err));
}
