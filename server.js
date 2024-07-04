import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import mongoose from 'mongoose';
import articleRoutes from './Routes/article.js';
import categorieRoutes from './Routes/categorie.js';
import produitRoutes from './Routes/produit.js';
import userRoutes from './Routes/userRoutes.js';
import commentRoutes from './Routes/comment.js';    

const app = express();

const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  heartbeatFrequencyMS: 10000, 
};

mongoose.connect('mongodb://localhost:27017/artventuretn', {family:4})
  .then(() => {
    console.log('Database connected with heartbeatFrequencyMS configured to 10000 ms');
  })
  .catch((e) => {
    console.log(e);
  });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(express.static('public'));

const PORT = process.env.PORT || 9090;
const hostname = '127.0.0.1';

app.use('/article', articleRoutes);
app.use('/categorie', categorieRoutes);
app.use('/produit', produitRoutes);
app.use('/user', userRoutes);
app.use('/comment', commentRoutes);

app.listen(PORT, hostname, () => {
  console.log(`Server running on http://${hostname}:${PORT}`);
});
