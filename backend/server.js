import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

import { connectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import universityRoutes from './routes/universityRoutes.js';
import applicationRoutes from './routes/applicationRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import testimonialRoutes from './routes/testimonialRoutes.js';
import aiRoutes from './routes/aiRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Resolve directories
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const UPLOADS_DIR = path.join(__dirname, 'uploads');
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Global configuration middleware
app.use(cors());
app.use(express.json());

// Serve static document/admission letter uploads
app.use('/uploads', express.static(UPLOADS_DIR));

// Bind modular API endpoints
app.use('/api/auth', authRoutes);
app.use('/api/universities', universityRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/ai', aiRoutes);

// Base sanity status route
app.get('/', (req, res) => {
  res.json({
    status: 'Bright Spot API Server is running!',
    timestamp: new Date().toISOString(),
    databaseMode: global.IS_MONGODB ? 'MongoDB Cluster' : 'File-based Local JSON DB'
  });
});

// Boot operations
const startServer = async () => {
  // Connect to database (Mongoose MongoDB -> Falls back to JSON DB in data/)
  await connectDB();

  app.listen(PORT, () => {
    console.log('===============================================================');
    console.log(`🚀  Bright Spot Server launched on port ${PORT}`);
    console.log(`🌐  Local Status Check: http://localhost:${PORT}/`);
    console.log('===============================================================\n');
  });
};

startServer();
