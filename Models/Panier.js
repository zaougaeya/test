import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const panierItemSchema = new Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'article', required: true },
    quantity: { type: Number, required: true },
    prix: { type: Number, required: true }, // Add the price of the product
});

const panierSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    items: [panierItemSchema],
    totalPrice: { type: Number, default: 0 } // Add totalPrice field with default value 0
});

// Calculate and update total price before saving
panierSchema.pre('save', function(next) {
    let totalPrice = 0;
    this.items.forEach(item => {
        totalPrice += item.quantity * item.prix; // Calculate the total price based on quantity and price of each item
    });
    this.totalPrice = totalPrice; // Assign the calculated total price to the totalPrice field
    next();
});

const Panier = model('Panier', panierSchema);

export default Panier;