import express from 'express';
import env from 'dotenv';
import userRoute from './routes/userRoutes.js';
import messageRouter from './routes/messageRouter.js';
import cookieParser from 'cookie-parser';
import { connectDB } from './config/db.js';
import cors from 'cors';

import { app,server } from "./socket/socket.js"
env.config();

const corsOption = {
  origin: 'http://localhost:3000',
  credentials: true,
};
app.use(cors(corsOption));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/v1/user', userRoute);
app.use('/api/v1/message', messageRouter);

app.get('/', (req, res) => {
  res.send('Hi, server is running!');
});

const PORT = process.env.PORT || 4000;
connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((error) => {
  console.error('Failed to connect to the database:', error.message);
});
