import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import articleRoutes from './Routes/article.js';
import panierRoutes from './Routes/panier.js';
import commandeRoutes from './Routes/commande.js';

const app = express();

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/artventuretn")
    .then(() => {
        console.log("database connected");
    })
    .catch((e) => {
        console.log(e);
    });

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(express.static("public"));

// Routes
app.use('/article', articleRoutes);
app.use('/panier', panierRoutes);
app.use('/commande', commandeRoutes); // Add this line

// Start server
const PORT = process.env.PORT || 9090;
const hostname = "127.0.0.1";

app.listen(PORT, hostname, () => {
    console.log(`server running on http://${hostname}:${PORT}`);
});
