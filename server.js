import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import blogRoutes from './Routes/blog.js'; 
import commentaireRoutes from './Routes/commentaire.js';
import userRoutes from './Routes/userRoutes.js';  // Import user routes correctly

const app = express();
const PORT = process.env.PORT || 9090;
const hostname = "127.0.0.1";

mongoose.connect("mongodb://localhost:27017/artventuretn")
    .then(() => {
        console.log("Database connected");
    })
    .catch((e) => {
        console.log(e);
    });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(express.static("public"));

// Use routes
app.use('/blog', blogRoutes);
app.use('/commentaire', commentaireRoutes);
app.use('/user', userRoutes);  // Use user routes

app.listen(PORT, hostname, () => {
    console.log(`Server running on http://${hostname}:${PORT}`);
});
