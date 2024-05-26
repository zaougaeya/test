import categorie from '../Models/categorie.js';

import { validationResult } from 'express-validator';

export function addOne(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    categorie.create(req.body)
        .then(newCategorie => {
            console.log("Nouvel Catégorie créé avec succès :", newCategorie);
            res.status(201).json(newCategorie);
        })
        .catch(err => {
            res.status(500).json(err);
        });
}

export function getAll(req, res) {
    categorie.find()
        .then(categories => res.status(200).json(categories))
        .catch(err => res.status(500).json(err));
}


export function getById(req, res) {
    categorie.findById(req.params.id)
        .then(categorie => {
            if (!categorie) return res.status(404).json({ message: 'categorie non trouvé' });
            res.status(200).json(categorie);
        })
        .catch(err => res.status(500).json(err));
}

export function deleteById(req, res) {
    categorie.findByIdAndDelete(req.params.id)
        .then(deletedCategorie => {
            if (!deletedCategorie) return res.status(404).json({ message: 'categorie non trouvé' });
            res.status(200).json({ message: 'suppression effectué' });
        })
        .catch(err => res.status(500).json(err));
}