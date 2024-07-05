import categorie from '../Models/categorie.js';
import { validationResult } from 'express-validator';

export async function addOne(req, res) {
    
  

    try {
      
        console.log(req.body)
        const newCategorie = await categorie(req.body);
        newCategorie.save();
        console.log("Nouvelle catégorie créée avec succès :", newCategorie);
        res.status(201).json(newCategorie);
    } catch (err) {
        res.status(500).json(err);
    }
}

export function getAll(req, res) {
    categorie.find()
        .then(categories => res.status(200).json(categories))
        .catch(err => res.status(500).json(err));
}
export function getByName(req, res) {
    const nameCat = req.params.name; 

    categorie.findOne({ namecat: nameCat })
        .then(categorie => {
            if (!categorie) return res.status(404).json({ message: 'Catégorie non trouvée' });
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

export function getById(req, res) {
    const categorieId = req.params.id;

    categorie.findById(categorieId)
        .then(categorie => {
            if (!categorie) {
                return res.status(404).json({ message: 'Catégorie non trouvée' });
            }
            res.status(200).json(categorie);
        })
        .catch(err => {
            res.status(500).json(err);
        });
}

export async function updateById(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const existingCategorie = await categorie.findOne({ namecat: req.body.namecat, _id: { $ne: req.params.id } });
        if (existingCategorie) {
            return res.status(400).json({ errors: [{ msg: 'Le nom de la catégorie existe déjà' }] });
        }

        const updatedCategorie = await categorie.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCategorie) {
            return res.status(404).json({ message: 'Catégorie non trouvée' });
        }
        res.status(200).json(updatedCategorie);
    } catch (err) {
        res.status(500).json(err);
    }
}



