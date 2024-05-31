import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const produitSchema = new Schema({
    nameprod: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    prix: {
        type: Number,
        required: true,
    },
    pictureprod: {
        type: String,
        required: true,
    },
    quantiteprod: {
        type: Number,
        required: true,
    },
    categoryprod: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    dateAddedprod: {
        type: Date,
        default: Date.now,
    },
    
});

export default model('Produit', produitSchema);
