import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { rsvpRouter } from './routes/rsvp.js';
import { adminRouter } from './routes/admin.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/rsvp', rsvpRouter);
app.use('/api/admin', adminRouter);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    app: 'Yaswanth & Mrudula Wedding Portal',
    timestamp: new Date().toISOString(),
  });
});

// Serve frontend build in production
const distPath = path.join(__dirname, '..', 'dist');
app.use(express.static(distPath));

// For SPA routing fallback to index.html in production
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) {
    return next();
  }
  const indexPath = path.join(distPath, 'index.html');
  res.sendFile(indexPath, (err) => {
    if (err) {
      // In dev mode before build, send a helpful message
      res.status(200).send('API Server is running on port ' + PORT + '. Vite dev server runs at http://localhost:3000');
    }
  });
});

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`================================================================`);
    console.log(`✨ Yaswanth & Mrudula Wedding Backend running`);
    console.log(`📡 API listening at: http://localhost:${PORT}`);
    console.log(`🔐 Admin Dashboard Passcode configured`);
    console.log(`================================================================`);
  });
}

export default app;
