import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
});

const User = models.User || model('User', userSchema, 'User'); // Vérifie si le modèle existe déjà

export default User;
