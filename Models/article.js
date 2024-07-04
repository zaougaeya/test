import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const articleSchema = new Schema({
    namearti: {
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
    picturearti: {
        type: String,
        required: true,
    },
    Quantite: {
        type: Number,
        required: true,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'category',
        required: true,
    },
    dateAdded: {
        type: Date,
        default: Date.now,
    },
    discount: {
        type: Number,
        default: 0, 
    },
    prixApresRemise: {
        type: Number,
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment',
    }],
});
export default model('article', articleSchema);
