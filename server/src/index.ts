import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import pictureRoutes from './routes/pictureRoutes';
import favoriteRoutes from './routes/favoriteRoutes';

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/auth', authRoutes);
app.use('/pictures', pictureRoutes);
app.use('/favorites', favoriteRoutes);

// MongoDB Connection

const MONGO_URI= "mongodb+srv://mteduid123:This_is_my_database@cluster0.c4ucs.mongodb.net/"

mongoose
  .connect(MONGO_URI as string)
  .then(() => {
    console.log('Connected to MongoDB successfully!');
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
  });

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
