import type { Request, Response } from 'express';

// In-memory cache for OneMap token (valid for up to 3 days / ~72 hours)
interface TokenCache {
  token: string | null;
  expiresAt: number;
}

const tokenCache: TokenCache = {
  token: null,
  expiresAt: 0,
};

const ONEMAP_BASE_URL = 'https://www.onemap.gov.sg';

/**
 * Retrieves a valid OneMap API token.
 * Precedence:
 * 1. Static ONEMAP_TOKEN from environment if set.
 * 2. Cached in-memory token if not expired.
 * 3. Freshly minted token using ONEMAP_EMAIL and ONEMAP_PASSWORD.
 */
async function getOneMapToken(): Promise<{ token: string | null; error?: string }> {
  // If static token is supplied via environment
  if (process.env.ONEMAP_TOKEN && process.env.ONEMAP_TOKEN.trim().length > 0) {
    return { token: process.env.ONEMAP_TOKEN.trim() };
  }

  // If in-memory token is still valid (buffer 30 minutes before expiry)
  const now = Date.now();
  if (tokenCache.token && tokenCache.expiresAt > now + 30 * 60 * 1000) {
    return { token: tokenCache.token };
  }

  const email = process.env.ONEMAP_EMAIL;
  const password = process.env.ONEMAP_PASSWORD;

  if (!email || !password) {
    return {
      token: null,
      error: 'OneMap credentials not configured. Please set ONEMAP_EMAIL and ONEMAP_PASSWORD (or ONEMAP_TOKEN) in environment variables.',
    };
  }

  try {
    const mintResponse = await fetch(`${ONEMAP_BASE_URL}/api/auth/post/getToken`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!mintResponse.ok) {
      const errText = await mintResponse.text();
      return {
        token: null,
        error: `Failed to mint OneMap token (HTTP ${mintResponse.status}): ${errText}`,
      };
    }

    const data = await mintResponse.json();
    const token = data.access_token || data.token;

    if (!token) {
      return {
        token: null,
        error: 'OneMap token response did not contain an access_token property.',
      };
    }

    // Token lasts 3 days (~72 hours), we cache for 70 hours
    const expiryTimestamp = data.expiry_timestamp
      ? new Date(data.expiry_timestamp).getTime()
      : now + 70 * 60 * 60 * 1000;

    tokenCache.token = token;
    tokenCache.expiresAt = expiryTimestamp;

    return { token };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return { token: null, error: `OneMap token mint request error: ${message}` };
  }
}

export default async function handler(req: Request, res: Response) {
  // Extract query or body params
  const method = req.method;
  const query = req.query as Record<string, string | undefined>;
  const body = (req.body || {}) as Record<string, unknown>;

  // Determine action: search | revgeocode | route | token
  const pathParts = req.url ? req.url.split('?')[0].split('/').filter(Boolean) : [];
  const subRoute = pathParts[pathParts.length - 1]; // e.g. 'search', 'route', or 'onemap'
  const action = (query.action || (subRoute !== 'onemap' ? subRoute : '') || body.action || 'search') as string;

  // Handle explicit token check/mint
  if (action === 'token') {
    const tokenResult = await getOneMapToken();
    if (!tokenResult.token) {
      return res.status(503).json({
        success: false,
        error: tokenResult.error,
        configured: false,
      });
    }

    return res.status(200).json({
      success: true,
      configured: true,
      tokenExpiresAt: new Date(tokenCache.expiresAt).toISOString(),
      message: 'OneMap token active (lasts up to 3 days)',
    });
  }

  // Ensure token is available for protected endpoints
  const auth = await getOneMapToken();
  if (!auth.token) {
    return res.status(503).json({
      success: false,
      error: auth.error,
      actionRequested: action,
      tip: 'Set ONEMAP_EMAIL and ONEMAP_PASSWORD in .env or the hosting provider secrets panel.',
    });
  }

  const token = auth.token;

  try {
    switch (action) {
      // 1. Geocode / Search: https://www.onemap.gov.sg/api/common/elastic/search
      case 'search':
      case 'geocode': {
        const searchVal = (query.searchVal || query.q || body.searchVal || 'raffles place') as string;
        const returnGeom = (query.returnGeom || body.returnGeom || 'Y') as string;
        const getAddrDetails = (query.getAddrDetails || body.getAddrDetails || 'Y') as string;
        const pageNum = (query.pageNum || body.pageNum || '1') as string;

        const url = new URL(`${ONEMAP_BASE_URL}/api/common/elastic/search`);
        url.searchParams.set('searchVal', searchVal);
        url.searchParams.set('returnGeom', returnGeom);
        url.searchParams.set('getAddrDetails', getAddrDetails);
        url.searchParams.set('pageNum', pageNum);

        const response = await fetch(url.toString(), {
          method: 'GET',
          headers: {
            Authorization: token,
          },
        });

        const data = await response.json();
        return res.status(response.status).json(data);
      }

      // 2. Reverse Geocode: https://www.onemap.gov.sg/api/public/revgeocode
      case 'revgeocode':
      case 'reverse': {
        const location = (query.location || body.location || '1.3,103.8') as string;
        const buffer = (query.buffer || body.buffer || '40') as string;
        const addressType = (query.addressType || body.addressType || 'All') as string;

        const url = new URL(`${ONEMAP_BASE_URL}/api/public/revgeocode`);
        url.searchParams.set('location', location);
        url.searchParams.set('buffer', buffer);
        url.searchParams.set('addressType', addressType);

        const response = await fetch(url.toString(), {
          method: 'GET',
          headers: {
            Authorization: token,
          },
        });

        const data = await response.json();
        return res.status(response.status).json(data);
      }

      // 3. Routing: https://www.onemap.gov.sg/api/public/routingsvc/route
      // routeType: walk | drive | cycle | pt
      case 'route':
      case 'routing': {
        const start = (query.start || body.start || '1.320981,103.844150') as string;
        const end = (query.end || body.end || '1.326762,103.8559') as string;
        const routeType = (query.routeType || body.routeType || 'walk') as string;

        const url = new URL(`${ONEMAP_BASE_URL}/api/public/routingsvc/route`);
        url.searchParams.set('start', start);
        url.searchParams.set('end', end);
        url.searchParams.set('routeType', routeType);

        const response = await fetch(url.toString(), {
          method: 'GET',
          headers: {
            Authorization: token,
          },
        });

        const data = await response.json();
        return res.status(response.status).json(data);
      }

      default:
        return res.status(400).json({
          error: `Unknown OneMap action: '${action}'. Supported actions: 'search', 'revgeocode', 'route', 'token'.`,
        });
    }
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return res.status(500).json({
      error: `OneMap API proxy failed: ${message}`,
    });
  }
}
