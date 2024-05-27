import express from 'express'
import { body } from 'express-validator'
import {addOne} from '../Controllers/article.js'
const router = express.Router()
router
    .route('/')
    .post(
        body('namearti').isLength({ min : 5, max : 20}),
        body('desc').isLength({ min : 20}),
        body('prix'),
        body('picturearti'), 
        body('Quantite'),
        addOne)   
export default router