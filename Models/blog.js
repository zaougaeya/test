import mongoose from "mongoose";

const { Schema, model } = mongoose;

const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    },
    contentType: {
        type: String,
        required: true
    },
    artType: {
        type: String,
        required: true
    },
    contentUrl: {
        type: String,
        required: true
    }
});

export default model('Blog', blogSchema, 'blogs');
