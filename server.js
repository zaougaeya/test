import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import articleRoutes from './Routes/article.js';
import userRoutes from './Routes/userRoutes.js';
import dotenv from "dotenv"; // Ajouter cette ligne pour charger les variables d'environnement


 dotenv.config(); // Charger les variables d'environnement
 const app = express();
 

mongoose.connect("mongodb://localhost:27017/artventuretn")
    .then(() => {
        console.log("database connected");
    })
    .catch((e) => {
        console.log(e);
    });


app.use(cors());
app.use(express.json());  
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(express.static("public"));
 



const PORT = process.env.PORT || 9090;
const hostname = "127.0.0.1";
app.use('/article', articleRoutes);
app.use('/user', userRoutes);


app.listen(PORT, hostname, () => {
    console.log(`server running on http://${hostname}:${PORT}`);
})


