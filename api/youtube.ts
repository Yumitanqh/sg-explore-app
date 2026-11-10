import type { Request, Response } from 'express';

const GOOGLE_API_BASE = 'https://www.googleapis.com';

function getGoogleApiKey(): string | null {
  const key = process.env.GOOGLE_API_KEY || process.env.YOUTUBE_API_KEY;
  if (!key || key.trim().length === 0) {
    return null;
  }
  return key.trim();
}

export default async function handler(req: Request, res: Response) {
  const query = req.query as Record<string, string | undefined>;
  const body = (req.body || {}) as Record<string, unknown>;

  // Determine action: video | channel | uploads | comments | search | books | fonts
  const action = (query.action || query.type || body.action || 'video') as string;

  const apiKey = getGoogleApiKey();
  if (!apiKey) {
    return res.status(503).json({
      success: false,
      error: 'Google API key is not configured.',
      actionRequested: action,
      tip: 'Set GOOGLE_API_KEY or YOUTUBE_API_KEY in your environment variables. Key is securely injected via X-goog-api-key header.',
    });
  }

  // Pre-configured secure headers using the header form as required
  const secureHeaders: Record<string, string> = {
    'X-goog-api-key': apiKey,
    'Accept': 'application/json',
  };

  try {
    let targetUrl: URL;

    switch (action) {
      // 1. YouTube - stats for one video (1 unit)
      // GET https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=VIDEO_ID
      case 'video':
      case 'videos': {
        const videoId = (query.id || query.videoId || body.id || body.videoId || 'S_qs38iM43w') as string;
        const part = (query.part || body.part || 'snippet,statistics') as string;

        targetUrl = new URL(`${GOOGLE_API_BASE}/youtube/v3/videos`);
        targetUrl.searchParams.set('part', part);
        targetUrl.searchParams.set('id', videoId);
        break;
      }

      // 2. YouTube - a channel's numbers (1 unit)
      // GET https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&forHandle=SOME_HANDLE
      case 'channel':
      case 'channels': {
        const forHandle = (query.forHandle || query.handle || body.forHandle || body.handle) as string | undefined;
        const channelId = (query.channelId || query.id || body.channelId || body.id) as string | undefined;
        const part = (query.part || body.part || 'snippet,statistics') as string;

        targetUrl = new URL(`${GOOGLE_API_BASE}/youtube/v3/channels`);
        targetUrl.searchParams.set('part', part);

        if (forHandle) {
          // Normalize handle with '@'
          const normalized = forHandle.startsWith('@') ? forHandle : `@${forHandle}`;
          targetUrl.searchParams.set('forHandle', normalized);
        } else if (channelId) {
          targetUrl.searchParams.set('id', channelId);
        } else {
          targetUrl.searchParams.set('forHandle', '@botanicalvoyage.sg');
        }
        break;
      }

      // 3. YouTube - a channel's uploads WITHOUT burning search quota (1 unit/page)
      // GET https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=PLAYLIST_ID&maxResults=50
      case 'uploads':
      case 'playlist':
      case 'playlistItems': {
        const playlistId = (query.playlistId || body.playlistId || 'UULFy6p8m3fHqJ3-jT7M9DmA') as string;
        const maxResults = (query.maxResults || body.maxResults || '50') as string;
        const part = (query.part || body.part || 'snippet') as string;

        targetUrl = new URL(`${GOOGLE_API_BASE}/youtube/v3/playlistItems`);
        targetUrl.searchParams.set('part', part);
        targetUrl.searchParams.set('playlistId', playlistId);
        targetUrl.searchParams.set('maxResults', maxResults);
        break;
      }

      // 4. YouTube - comments on a video (1 unit/page)
      // GET https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=VIDEO_ID&maxResults=100
      case 'comments':
      case 'commentThreads': {
        const videoId = (query.videoId || query.id || body.videoId || body.id || 'S_qs38iM43w') as string;
        const maxResults = (query.maxResults || body.maxResults || '100') as string;
        const part = (query.part || body.part || 'snippet') as string;

        targetUrl = new URL(`${GOOGLE_API_BASE}/youtube/v3/commentThreads`);
        targetUrl.searchParams.set('part', part);
        targetUrl.searchParams.set('videoId', videoId);
        targetUrl.searchParams.set('maxResults', maxResults);
        break;
      }

      // 5. YouTube - search, the precious one (its own bucket: 100 calls/day/project)
      // GET https://www.googleapis.com/youtube/v3/search?part=snippet&q=QUERY&type=video
      case 'search': {
        const q = (query.q || query.query || body.q || body.query || 'Singapore Gardens by the Bay Cloud Forest') as string;
        const type = (query.type || body.type || 'video') as string;
        const maxResults = (query.maxResults || body.maxResults || '10') as string;
        const part = (query.part || body.part || 'snippet') as string;

        targetUrl = new URL(`${GOOGLE_API_BASE}/youtube/v3/search`);
        targetUrl.searchParams.set('part', part);
        targetUrl.searchParams.set('q', q);
        targetUrl.searchParams.set('type', type);
        targetUrl.searchParams.set('maxResults', maxResults);
        break;
      }

      // 6. Google Books - search volumes (key now mandatory - anonymous quota is zero)
      // GET https://www.googleapis.com/books/v1/volumes?q=QUERY&maxResults=10
      case 'books': {
        const q = (query.q || query.query || body.q || body.query || 'Singapore botanical garden history') as string;
        const maxResults = (query.maxResults || body.maxResults || '10') as string;

        targetUrl = new URL(`${GOOGLE_API_BASE}/books/v1/volumes`);
        targetUrl.searchParams.set('q', q);
        targetUrl.searchParams.set('maxResults', maxResults);
        break;
      }

      // 7. Google Fonts - the catalogue
      // GET https://www.googleapis.com/webfonts/v1/webfonts?sort=popularity
      case 'fonts': {
        const sort = (query.sort || body.sort || 'popularity') as string;

        targetUrl = new URL(`${GOOGLE_API_BASE}/webfonts/v1/webfonts`);
        targetUrl.searchParams.set('sort', sort);
        break;
      }

      default:
        return res.status(400).json({
          error: `Unknown Google/YouTube action: '${action}'. Supported: 'video', 'channel', 'uploads', 'comments', 'search', 'books', 'fonts'.`,
        });
    }

    // Perform request with X-goog-api-key header (no key leak in query strings or logs)
    const googleRes = await fetch(targetUrl.toString(), {
      method: 'GET',
      headers: secureHeaders,
    });

    const data = await googleRes.json();
    return res.status(googleRes.status).json(data);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return res.status(500).json({
      error: `Google/YouTube API proxy request failed: ${message}`,
    });
  }
}
