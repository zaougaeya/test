import mongoose from "mongoose";

const { Schema, model } = mongoose;

const commentaireSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    blogId: {
        type: Schema.Types.ObjectId,
        ref: 'Blog',
        required: true
    }
});

export default model('Commentaire', commentaireSchema);
