import 'dotenv/config';
import fs from 'fs';
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

// Handle malformed JSON body
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ error: 'Malformed JSON payload.' });
  }
  next();
});

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
  try {
    if (fs.existsSync(indexPath)) {
      let html = fs.readFileSync(indexPath, 'utf-8');
      const protocol = req.headers['x-forwarded-proto'] || (req.secure ? 'https' : 'http');
      const host = req.headers['x-forwarded-host'] || req.get('host');
      if (host) {
        const origin = `${protocol}://${host}`;
        html = html.replace(/content="\/images\/couple_festive_home\.jpg"/g, `content="${origin}/images/couple_festive_home.jpg"`);
        html = html.replace(/href="\/images\/couple_festive_home\.jpg"/g, `href="${origin}/images/couple_festive_home.jpg"`);
      }
      return res.setHeader('Content-Type', 'text/html').send(html);
    }
  } catch (e) {}

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
