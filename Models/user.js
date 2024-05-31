import mongoose from "mongoose"

const {Schema,model} = mongoose

const userSchema = new Schema({
    nomuser : {
        type : String,
        required : true
    },
    prenomuser : {
        type : String,
        required : true
    },
    ageuser : {
        type : Number,
        required : true
    },
    phoneuser : {
        type : Number,
        required : true
    },
    sexeuser : {
        type : String,
        required : true,
        enum: ['male', 'femelle', 'autre']
    },
    mailuser : {
        type : String,
        required : true
    },
    passworduser : {
        type : String,
        required : true
    },
    addresseuser : {
        type : String,
        required : true
    },
    


})
export default model('user', userSchema)