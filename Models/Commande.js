// Models/commande.js
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const commandeSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    panierId: { type: mongoose.Schema.Types.ObjectId, ref: 'Panier', required: true },
    createdAt: { type: Date, default: Date.now },
});

const Commande = model('Commande', commandeSchema);

export default Commande;
