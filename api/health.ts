import type { Request, Response } from 'express';

interface HealthResponse {
  status: 'ok' | 'degraded';
  timestamp: string;
  uptimeSeconds: number;
  environment: string;
  services: {
    onemap: {
      configured: boolean;
      authMethod: 'token' | 'email_password' | 'none';
      description: string;
    };
    google: {
      configured: boolean;
      headerForm: 'X-goog-api-key';
      hasYouTubeKey: boolean;
      description: string;
    };
  };
}

export default async function handler(req: Request, res: Response) {
  // Support both GET and HEAD
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.setHeader('Allow', 'GET, HEAD');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const hasOneMapToken = Boolean(process.env.ONEMAP_TOKEN);
  const hasOneMapCredentials = Boolean(process.env.ONEMAP_EMAIL && process.env.ONEMAP_PASSWORD);
  const onemapConfigured = hasOneMapToken || hasOneMapCredentials;

  const hasGoogleKey = Boolean(process.env.GOOGLE_API_KEY || process.env.YOUTUBE_API_KEY);

  const payload: HealthResponse = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    environment: process.env.NODE_ENV || 'development',
    services: {
      onemap: {
        configured: onemapConfigured,
        authMethod: hasOneMapToken ? 'token' : hasOneMapCredentials ? 'email_password' : 'none',
        description: 'OneMap Singapore geospatial search, reverse geocode, and multimodal routing',
      },
      google: {
        configured: hasGoogleKey,
        headerForm: 'X-goog-api-key',
        hasYouTubeKey: Boolean(process.env.YOUTUBE_API_KEY),
        description: 'YouTube Data API v3, Google Books API, and Google Fonts API',
      },
    },
  };

  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  return res.status(200).json(payload);
}
