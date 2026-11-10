import React, { useState } from 'react';
import { X, CheckCircle, AlertCircle, Play, Server, RefreshCw, Copy, Check, ExternalLink, ShieldCheck } from 'lucide-react';

interface ApiDiagnosticsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ApiDiagnosticsModal: React.FC<ApiDiagnosticsModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'health' | 'onemap' | 'youtube'>('health');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Record<string, unknown> | null>(null);
  const [statusCode, setStatusCode] = useState<number | null>(null);
  const [latencyMs, setLatencyMs] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  // OneMap test inputs
  const [onemapAction, setOnemapAction] = useState<'search' | 'revgeocode' | 'route' | 'token'>('search');
  const [searchVal, setSearchVal] = useState('raffles place');
  const [routeStart, setRouteStart] = useState('1.320981,103.844150');
  const [routeEnd, setRouteEnd] = useState('1.326762,103.8559');
  const [routeType, setRouteType] = useState('walk');

  // YouTube / Google test inputs
  const [youtubeAction, setYoutubeAction] = useState<'video' | 'channel' | 'uploads' | 'comments' | 'search' | 'books' | 'fonts'>('video');
  const [videoId, setVideoId] = useState('S_qs38iM43w');
  const [channelHandle, setChannelHandle] = useState('@botanicalvoyage.sg');
  const [searchQuery, setSearchQuery] = useState('Singapore Botanic Gardens Cloud Forest');

  if (!isOpen) return null;

  const runTest = async () => {
    setLoading(true);
    setResult(null);
    setStatusCode(null);
    const start = performance.now();

    try {
      let endpoint = '/api/health';

      if (activeTab === 'onemap') {
        if (onemapAction === 'token') {
          endpoint = '/api/onemap?action=token';
        } else if (onemapAction === 'search') {
          endpoint = `/api/onemap?action=search&searchVal=${encodeURIComponent(searchVal)}&returnGeom=Y&getAddrDetails=Y&pageNum=1`;
        } else if (onemapAction === 'revgeocode') {
          endpoint = `/api/onemap?action=revgeocode&location=1.3,103.8&buffer=40&addressType=All`;
        } else if (onemapAction === 'route') {
          endpoint = `/api/onemap?action=route&start=${encodeURIComponent(routeStart)}&end=${encodeURIComponent(routeEnd)}&routeType=${encodeURIComponent(routeType)}`;
        }
      } else if (activeTab === 'youtube') {
        if (youtubeAction === 'video') {
          endpoint = `/api/youtube?action=video&id=${encodeURIComponent(videoId)}`;
        } else if (youtubeAction === 'channel') {
          endpoint = `/api/youtube?action=channel&forHandle=${encodeURIComponent(channelHandle)}`;
        } else if (youtubeAction === 'uploads') {
          endpoint = `/api/youtube?action=uploads&playlistId=UULFy6p8m3fHqJ3-jT7M9DmA&maxResults=5`;
        } else if (youtubeAction === 'comments') {
          endpoint = `/api/youtube?action=comments&videoId=${encodeURIComponent(videoId)}&maxResults=10`;
        } else if (youtubeAction === 'search') {
          endpoint = `/api/youtube?action=search&q=${encodeURIComponent(searchQuery)}&maxResults=5`;
        } else if (youtubeAction === 'books') {
          endpoint = `/api/youtube?action=books&q=${encodeURIComponent(searchQuery)}&maxResults=5`;
        } else if (youtubeAction === 'fonts') {
          endpoint = `/api/youtube?action=fonts&sort=popularity`;
        }
      }

      const res = await fetch(endpoint);
      const data = await res.json();
      const elapsed = Math.round(performance.now() - start);

      setStatusCode(res.status);
      setLatencyMs(elapsed);
      setResult(data);
    } catch (err: unknown) {
      setStatusCode(500);
      setLatencyMs(Math.round(performance.now() - start));
      setResult({ error: err instanceof Error ? err.message : String(err) });
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(JSON.stringify(result, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="w-full max-w-3xl bg-[#FBF9F5] border border-[#E8E4DC] rounded-[4px] shadow-2xl flex flex-col max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#E8E4DC] bg-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#E2ECE6] text-[#0F382A] flex items-center justify-center">
              <Server className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-semibold text-[#0F382A]">
                Serverless API Connections & Live Endpoints
              </h3>
              <p className="text-xs text-[#5A6C64]">
                Endpoints stored in <code className="font-mono text-[#0F382A]">/api</code> (OneMap, YouTube v3, Books, Fonts)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#F5F3EF] text-[#5A6C64] hover:text-[#1B2421] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selectors */}
        <div className="flex items-center gap-2 px-6 pt-4 border-b border-[#E8E4DC] bg-[#F5F3EF]">
          <button
            onClick={() => {
              setActiveTab('health');
              setResult(null);
            }}
            className={`px-4 py-2 text-xs font-semibold rounded-t-[4px] border-t border-x transition-colors cursor-pointer ${
              activeTab === 'health'
                ? 'bg-white border-[#E8E4DC] text-[#0F382A] border-b-transparent -mb-[1px]'
                : 'text-[#5A6C64] border-transparent hover:text-[#1B2421]'
            }`}
          >
            /api/health.ts
          </button>
          <button
            onClick={() => {
              setActiveTab('onemap');
              setResult(null);
            }}
            className={`px-4 py-2 text-xs font-semibold rounded-t-[4px] border-t border-x transition-colors cursor-pointer ${
              activeTab === 'onemap'
                ? 'bg-white border-[#E8E4DC] text-[#0F382A] border-b-transparent -mb-[1px]'
                : 'text-[#5A6C64] border-transparent hover:text-[#1B2421]'
            }`}
          >
            /api/onemap.ts
          </button>
          <button
            onClick={() => {
              setActiveTab('youtube');
              setResult(null);
            }}
            className={`px-4 py-2 text-xs font-semibold rounded-t-[4px] border-t border-x transition-colors cursor-pointer ${
              activeTab === 'youtube'
                ? 'bg-white border-[#E8E4DC] text-[#0F382A] border-b-transparent -mb-[1px]'
                : 'text-[#5A6C64] border-transparent hover:text-[#1B2421]'
            }`}
          >
            /api/youtube.ts
          </button>
        </div>

        {/* Controls Body */}
        <div className="p-6 space-y-4 overflow-y-auto flex-1">
          {activeTab === 'health' && (
            <div className="text-xs space-y-3 bg-white p-4 rounded-[4px] border border-[#E8E4DC]">
              <p className="text-[#414844] leading-relaxed">
                Tests system availability, process uptime, and checks whether credentials exist for OneMap and Google APIs without revealing secret keys.
              </p>
              <div className="flex items-center gap-2 font-mono text-[11px] text-[#5A6C64] bg-[#FBF9F5] p-2 rounded">
                <span className="font-bold text-[#0F382A]">GET</span> /api/health
              </div>
            </div>
          )}

          {activeTab === 'onemap' && (
            <div className="space-y-3 bg-white p-4 rounded-[4px] border border-[#E8E4DC] text-xs">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-semibold text-[#0F382A]">Action:</span>
                {(['search', 'revgeocode', 'route', 'token'] as const).map((act) => (
                  <button
                    key={act}
                    onClick={() => setOnemapAction(act)}
                    className={`px-3 py-1 rounded-full text-[11px] font-semibold border transition-all cursor-pointer ${
                      onemapAction === act
                        ? 'bg-[#0F382A] text-white border-[#0F382A]'
                        : 'bg-white text-[#5A6C64] border-[#E8E4DC]'
                    }`}
                  >
                    {act}
                  </button>
                ))}
              </div>

              {onemapAction === 'search' && (
                <div>
                  <label className="block text-[11px] font-medium text-[#5A6C64] mb-1">
                    Search Location (searchVal):
                  </label>
                  <input
                    type="text"
                    value={searchVal}
                    onChange={(e) => setSearchVal(e.target.value)}
                    className="w-full text-xs p-2 bg-[#FBF9F5] border border-[#E8E4DC] rounded-[4px]"
                  />
                </div>
              )}

              {onemapAction === 'route' && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div>
                    <label className="block text-[10px] text-[#5A6C64]">Start Lat,Lng:</label>
                    <input
                      type="text"
                      value={routeStart}
                      onChange={(e) => setRouteStart(e.target.value)}
                      className="w-full text-xs p-1.5 bg-[#FBF9F5] border border-[#E8E4DC] rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-[#5A6C64]">End Lat,Lng:</label>
                    <input
                      type="text"
                      value={routeEnd}
                      onChange={(e) => setRouteEnd(e.target.value)}
                      className="w-full text-xs p-1.5 bg-[#FBF9F5] border border-[#E8E4DC] rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-[#5A6C64]">Mode:</label>
                    <select
                      value={routeType}
                      onChange={(e) => setRouteType(e.target.value)}
                      className="w-full text-xs p-1.5 bg-[#FBF9F5] border border-[#E8E4DC] rounded"
                    >
                      <option value="walk">walk</option>
                      <option value="drive">drive</option>
                      <option value="cycle">cycle</option>
                      <option value="pt">pt (public transit)</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'youtube' && (
            <div className="space-y-3 bg-white p-4 rounded-[4px] border border-[#E8E4DC] text-xs">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-semibold text-[#0F382A]">Endpoint:</span>
                {(['video', 'channel', 'uploads', 'comments', 'search', 'books', 'fonts'] as const).map((act) => (
                  <button
                    key={act}
                    onClick={() => setYoutubeAction(act)}
                    className={`px-3 py-1 rounded-full text-[11px] font-semibold border transition-all cursor-pointer ${
                      youtubeAction === act
                        ? 'bg-[#0F382A] text-white border-[#0F382A]'
                        : 'bg-white text-[#5A6C64] border-[#E8E4DC]'
                    }`}
                  >
                    {act}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-1.5 text-[11px] text-[#0F382A] bg-[#E2ECE6] px-3 py-1.5 rounded-[4px]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#0F382A]" />
                <span>Uses secure <code className="font-mono font-bold">X-goog-api-key</code> request header</span>
              </div>

              {youtubeAction === 'video' && (
                <div>
                  <label className="block text-[11px] font-medium text-[#5A6C64] mb-1">
                    YouTube Video ID:
                  </label>
                  <input
                    type="text"
                    value={videoId}
                    onChange={(e) => setVideoId(e.target.value)}
                    className="w-full text-xs p-2 bg-[#FBF9F5] border border-[#E8E4DC] rounded-[4px]"
                  />
                </div>
              )}

              {youtubeAction === 'channel' && (
                <div>
                  <label className="block text-[11px] font-medium text-[#5A6C64] mb-1">
                    Channel Handle (forHandle):
                  </label>
                  <input
                    type="text"
                    value={channelHandle}
                    onChange={(e) => setChannelHandle(e.target.value)}
                    className="w-full text-xs p-2 bg-[#FBF9F5] border border-[#E8E4DC] rounded-[4px]"
                  />
                </div>
              )}

              {(youtubeAction === 'search' || youtubeAction === 'books') && (
                <div>
                  <label className="block text-[11px] font-medium text-[#5A6C64] mb-1">
                    Query:
                  </label>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full text-xs p-2 bg-[#FBF9F5] border border-[#E8E4DC] rounded-[4px]"
                  />
                </div>
              )}
            </div>
          )}

          {/* Test Trigger Button */}
          <div className="flex items-center justify-between">
            <button
              onClick={runTest}
              disabled={loading}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#0F382A] text-white text-xs font-semibold uppercase tracking-wider rounded-[4px] hover:bg-[#1B2421] transition-all disabled:opacity-50 cursor-pointer shadow-xs"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Querying Live Endpoint...</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Execute Endpoint Request</span>
                </>
              )}
            </button>

            {statusCode !== null && (
              <div className="flex items-center gap-3 text-xs font-mono">
                <span className={`font-bold ${statusCode >= 200 && statusCode < 300 ? 'text-green-700' : 'text-amber-700'}`}>
                  HTTP {statusCode}
                </span>
                {latencyMs !== null && (
                  <span className="text-[#5A6C64]">{latencyMs} ms</span>
                )}
              </div>
            )}
          </div>

          {/* Response Payload Display */}
          {result !== null && (
            <div className="mt-4 bg-[#1B2421] rounded-[4px] p-4 text-white overflow-hidden">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 text-xs">
                <span className="font-mono text-[11px] text-[#A5D0BC]">Response Payload (JSON)</span>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1 text-[11px] text-white/70 hover:text-white transition-colors cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3 text-green-400" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy JSON</span>
                    </>
                  )}
                </button>
              </div>

              <pre className="font-mono text-xs text-[#EAE8E4] overflow-x-auto max-h-56 p-1">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-white border-t border-[#E8E4DC] flex items-center justify-between text-xs text-[#5A6C64]">
          <span className="font-mono text-[11px]">
            Ready for credentials in <code className="text-[#0F382A]">.env</code> or deployment secrets
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 font-semibold text-[#0F382A] hover:text-[#1B2421] cursor-pointer"
          >
            Close Diagnostics
          </button>
        </div>
      </div>
    </div>
  );
};
