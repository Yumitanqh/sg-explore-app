import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import healthHandler from './api/health.ts';
import onemapHandler from './api/onemap.ts';
import youtubeHandler from './api/youtube.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  // Mount API endpoints
  app.all('/api/health', (req, res) => {
    return healthHandler(req, res);
  });

  app.all('/api/onemap*', (req, res) => {
    return onemapHandler(req, res);
  });

  app.all('/api/youtube*', (req, res) => {
    return youtubeHandler(req, res);
  });

  const isProduction = process.env.NODE_ENV === 'production';

  if (isProduction) {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        host: '0.0.0.0',
        hmr: process.env.DISABLE_HMR !== 'true',
        watch: process.env.DISABLE_HMR === 'true' ? null : {},
      },
      appType: 'spa',
    });

    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Botanical Voyage Server] Running on http://0.0.0.0:${PORT} (Node: ${process.version})`);
  });
}

startServer().catch((err) => {
  console.error('[Botanical Voyage Server] Failed to start:', err);
  process.exit(1);
});
