import mongoose from "mongoose";

const { Schema, model } = mongoose;

const eventSchema = new Schema(
  {
    eventname: {
      type: String,
      required: true,
    },
    descevent: {
      type: String,
      required: true,
    },
    prixevent: {
      type: Number,
      required: true,
    },
    picturevent: {
      type: String,
      required: true,
    },
    datdebevent: {
      type: Date,
      default: new Date(),
    },
    datfinevent: {
      type: Date,
      default: new Date(),
    },
    numberOfPerson: {
      type: Number,
      required: true,
    },
    catevent: {
      type: String,
      required: true,
    },
    host: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Utilisez 'User' car c'est le nom du modèle pour l'hôte
      //required: true
    },
    local: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Local', // Utilisez 'Local' car c'est le nom du modèle pour le local
      //required: true
    },
    participants: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User' // Utilisateurs qui participent
    }]
  },
  {
    timestamps: true,
  }
);

//export default model('Event', eventSchema);
export default model('Event',eventSchema);
