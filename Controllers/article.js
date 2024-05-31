import article from '../Models/article.js'
import categorie from '../Models/categorie.js'
import { validationResult } from 'express-validator';

export async function addOne(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const category = await categorie.findById(req.body.category);
        if (!category) {
            return res.status(404).json({ message: 'Catégorie non trouvée' });
        }
        if (req.body.discount) {
            req.body.discountedPrice = req.body.prix - (req.body.prix * (req.body.discount / 100));
        }
        req.body.dateAdded = new Date();
        const newArticle = await article.create(req.body);
        
        res.status(201).json(newArticle);
    } catch (err) {
        res.status(500).json({ message: 'Erreur lors de la création de l\'article', error: err });
    }
}

export function getAll(req, res) {
    article.find()
        .then(articles => res.status(200).json(articles))
        .catch(err => res.status(500).json(err));
}
export function getById(req, res) {
    article.findById(req.params.id).populate('category', 'namecat')
        .then(article => {
            if (!article) return res.status(404).json({ message: 'Article non trouvé' });
            res.status(200).json(article);
        })
        .catch(err => res.status(500).json({ message: 'Erreur lors de la récupération', error: err }));
}

export function getByName(req, res) {
    const namearti = req.params.name;

    article.findOne({ namearti: namearti })
        .then(article => {
            if (!article) return res.status(404).json({ message: 'article non trouvée' });
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
            if (!updatedArticle) return res.status(404).json({ message: 'Article non trouvé' });
            res.status(200).json(updatedArticle);
        })
        .catch(err => res.status(500).json({ message: 'Erreur lors de la mise à jour', error: err }));
}

export function deleteById(req, res) {
    article.findByIdAndDelete(req.params.id)
        .then(deletedArticle => {
            if (!deletedArticle) return res.status(404).json({ message: 'Article non trouvé' });
            res.status(200).json({ message: 'Suppression effectuée' });
        })
        .catch(err => res.status(500).json({ message: 'Erreur lors de la suppression', error: err }));
}

export async function getByCategoryName(req, res) {
    const categoryName = req.params.categoryName;

    try {
        const category = await categorie.findOne({ namecat: categoryName }); // Correction ici
        if (!category) {
            return res.status(404).json({ message: 'Catégorie non trouvée' });
        }

        const articles = await article.find({ category: category._id }).populate('category', 'namecat');
        res.status(200).json(articles);
    } catch (err) {
        res.status(500).json({ message: 'Erreur lors de la recherche', error: err });
    }
}

export async function getAllByPriceAscending(req, res) {
    try {
        const articles = await article.find().sort({ prix: 1 });
        res.status(200).json(articles);
    } catch (err) {
        res.status(500).json({ message: 'Erreur lors de la récupération des articles', error: err });
    }
}
