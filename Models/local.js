import mongoose from "mongoose";

const { Schema, model } = mongoose;

const localSchema = new Schema(
  {
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
<<<<<<< Updated upstream
      ref: 'User', // Locataire who owns the local
=======
      ref: 'User', // Locataire qui possède le local
>>>>>>> Stashed changes
      required: true
    },
    events: [{
      type: mongoose.Schema.Types.ObjectId,
<<<<<<< Updated upstream
      ref: 'Event' // Events happening in this local
=======
      ref: 'Event' // Événements se déroulant dans ce local
>>>>>>> Stashed changes
    }]
  },
  {
    timestamps: true,
  }
);

<<<<<<< Updated upstream
//export default model('Local', localSchema);
export default model ('Local',localSchema);
=======
export default model('Local', localSchema);
>>>>>>> Stashed changes
