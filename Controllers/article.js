import article from '../Models/article.js'
export function addOne (req, res) {
    if (!validationResult(req).isEmpty()){
        res.status(400).json( { errors : validationResult(req).array() })
    }else {
    article.create(req.body).then(newArticle => {
        res.status(201).json(newArticle)
    })
    .catch(err => {
        res.status(500).json(err)
    })
    }
}