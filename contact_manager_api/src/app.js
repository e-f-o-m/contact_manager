import cors from "cors";
import express, { json } from 'express';
import userRoutes from './routes/user.routes.js';
import contactRoutes from './routes/contact.routes.js';
import groupRoutes from './routes/group.routes.js';
import tagRoutes from './routes/tag.routes.js';

const app = express();
app.use(json());
app.use(cors());

// Rutas
app.use('/api', userRoutes);
app.use('/api', contactRoutes);
app.use('/api', groupRoutes);
app.use('/api', tagRoutes);
export default app;