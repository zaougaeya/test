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
        required : true
    },

    gender : {
        type : String,
        required : true
    },
})
export default model('user', userSchema)