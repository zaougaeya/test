import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const commentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    article: {
        type: Schema.Types.ObjectId,
        ref: 'Article',
        required: true,
    },
    produit: {
        type: Schema.Types.ObjectId,
        ref: 'Produit',
        required: true,
    },
    content: {
        type: String,
        required: true,
        minlength: 1,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    dateAdded: {
        type: Date,
        default: Date.now,
    },
});

export default model('Comment', commentSchema);