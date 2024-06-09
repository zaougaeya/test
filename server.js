import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import articleRoutes from './Routes/article.js';
import categorieRoutes from './Routes/categorie.js';
import commentRoutes from './Routes/comment.js';
import produitRoutes  from './Routes/produit.js';
import eventRoutes from './Routes/event.js';
import localRoutes from './Routes/local.js';
import userRoutes from './Routes/userRoutes.js';
import panierRoutes from './Routes/panier.js';
import commandeRoutes from './Routes/commandeRouter.js';
import blogRoutes from './Routes/blog.js'; 
import commentaireRoutes from './Routes/commentaire.js';
import dotenv from "dotenv";

dotenv.config(); // Charger les variables d'environnement
//console.log(process.env);

 const emailUser = "oumayma.boughanmi@esprit.tn";
 const emailPass = "oumaBOGH999@";

 console.log(emailUser);
 const JWT_SECRET="mySuperSecretKey123!$%&*()";





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
app.use('/panier', panierRoutes);
app.use('/commande', commandeRoutes); // Add this line
app.use('/user', userRoutes);
app.use("/events", eventRoutes);
app.use("/locals", localRoutes);
app.use('/article', articleRoutes);
app.use('/categorie', categorieRoutes);
app.use('/comment',commentRoutes);
app.use('/produit', produitRoutes);
app.use('/blog', blogRoutes);
app.use('/commentaire', commentaireRoutes);

// Start server
const PORT = process.env.PORT || 3000;
const hostname = "127.0.0.1";

app.listen(PORT, hostname, () => {
    console.log(`server running on http://${hostname}:${PORT}`);
});