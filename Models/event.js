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
    locataire: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Assuming there is a User model for locataires
      required: true
    },
    participants: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User' // Users who are participating
    }]
  },
  {
    timestamps: true,
  }
);

export default model('Event', eventSchema);
