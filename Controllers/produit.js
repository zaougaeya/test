import produit from '../Models/produit.js';

import { validationResult } from 'express-validator';

export function addOne(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    produit.create(req.body)
        .then(newProduit => {
            console.log("Nouvel produit créé avec succès :", newProduit);
            res.status(201).json(newProduit);
        })
        .catch(err => {
            res.status(500).json(err);
        });
}

export function getAll(req, res) {
    produit.find()
        .then(produits => res.status(200).json(produits))
        .catch(err => res.status(500).json(err));
}

export function getByName(req, res) {
    const nameprod = req.params.name; 

    produit.findOne({ nameprod: nameprod })
        .then(produit => {
            if (!produit) return res.status(404).json({ message: 'produit non trouvée' });
            res.status(200).json(produit);
        })
        .catch(err => res.status(500).json(err));
}


export function deleteById(req, res) {
    produit.findByIdAndDelete(req.params.id)
        .then(deletedProduit=> {
            if (!deletedProduit) return res.status(404).json({ message: 'produit non trouvé' });
            res.status(200).json({ message: 'suppression effectué' });
        })
        .catch(err => res.status(500).json(err));
}


export function updateById(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    produit.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(updatedProduit => {
            if (!updatedProduit) return res.status(404).json({ message: 'produit non trouvé '});
            res.status(200).json(updatedProduit);
        })
        .catch(err => res.status(500).json(err));
}
