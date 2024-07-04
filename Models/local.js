import mongoose from "mongoose";

const { Schema, model } = mongoose;

const localSchema = new Schema({
  localname: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  locataire: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Locataire qui possède le local
    required: true
  },
  events: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event' // Événements se déroulant dans ce local
  }]
}, {
  timestamps: true,
});

export default model('Local', localSchema);
