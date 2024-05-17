import mongoose from "mongoose"

const {Schema,model} = mongoose

const eventSchema = new Schema({
    titrevent : {
        type : String,
        required : true
    },
    
    descevent : {
        type : String,
        required : true
    },
    prixevent : {
        type : Number,
        required : true
    },
    picturevent : {
        type : String,
        required : true
    },
    datdebevent : {
        type : Date,
        default: new Date()

    },
    datfinevent : {
        type: Date,
        default: new Date()

    },
    nbpartic : {
        type : Number,
        required : true
    },
    categorievent : {
        type : String,
        required : true
    },
})
export default model('event', eventSchema)