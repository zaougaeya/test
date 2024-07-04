import mongoose from "mongoose";

const { Schema, model } = mongoose;

const categorieSchema = new Schema({
    namecat: {
        type: String,
       // required: true
    },
    picturecat: {
        type: String,
       // required: true
    }
});

export default model('category', categorieSchema);
