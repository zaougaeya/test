import mongoose from "mongoose"
 
const {Schema,model} = mongoose
 
const userSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    lastname : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    phone : {
        type : Number,
        required : true
    },
    adress : {
        type : String,
        required : true,
        enum: ['male', 'femelle', 'autre']
    },
<<<<<<< Updated upstream

    gender : {
        type : String,
        required : true
    },
=======
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
   
 
 
>>>>>>> Stashed changes
})
export default model('user', userSchema)