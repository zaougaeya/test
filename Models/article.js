import mongoose from "mongoose"

const {Schema,model} = mongoose

const articleSchema = new Schema({
    namearti : {
        type : String,
        required : true
    },
    
    desc : {
        type : String,
        required : true
    },
    prix : {
        type : Number,
        required : true
    },
    picturearti : {
        type : String,
        required : true
    },
    Quantite : {
        type : Number,
        required : true
    }
})
export default model('article', articleSchema)