import React from 'react';
import { VideoEssay } from '../data/videos';
import { X, Play, Clock, Share2, BookOpen } from 'lucide-react';

interface VideoPlayerModalProps {
  video: VideoEssay | null;
  onClose: () => void;
}

export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({ video, onClose }) => {
  if (!video) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-[6px] animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl bg-[#1B2421] border border-white/10 rounded-[4px] shadow-2xl overflow-hidden text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar with close */}
        <div className="p-4 flex items-center justify-between border-b border-white/10 bg-[#0F382A]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#F26440]" />
            <span className="text-xs font-mono uppercase tracking-wider text-white/80">
              Botanical Voyage Cinema · {video.category}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player 16:9 */}
        <div className="relative aspect-[16/9] w-full bg-black">
          <iframe
            src={`${video.embedUrl}?autoplay=1&modestbranding=1&rel=0`}
            title={video.title}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Video Info and Chapter Timestamps */}
        <div className="p-6 bg-[#161e1a] space-y-4 max-h-[35vh] overflow-y-auto">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-white/60">
            <div className="flex items-center gap-2">
              <img
                src={video.creatorAvatar}
                alt={video.creatorName}
                referrerPolicy="no-referrer"
                className="w-6 h-6 rounded-full object-cover"
              />
              <span className="font-semibold text-white">{video.creatorName}</span>
              <span>·</span>
              <span className="font-mono">{video.creatorHandle}</span>
            </div>

            <div className="flex items-center gap-3 font-mono">
              <span>{video.views}</span>
              <span>·</span>
              <span className="text-[#F26440] font-semibold">{video.duration}</span>
            </div>
          </div>

          <h3 className="font-serif text-xl sm:text-2xl font-semibold text-white">
            {video.title}
          </h3>

          <p className="text-sm text-white/80 leading-relaxed font-light">
            {video.summary}
          </p>

          {/* Chapter Markers */}
          <div className="pt-3 border-t border-white/10">
            <span className="text-xs font-mono uppercase tracking-wider text-[#A5D0BC] block mb-2">
              Curated Chapters & Themes
            </span>
            <div className="flex flex-wrap gap-2">
              {video.keyTimestamps.map((ch, idx) => (
                <div
                  key={idx}
                  className="px-3 py-1.5 rounded-sm bg-white/5 border border-white/10 text-xs text-white/90 flex items-center gap-2"
                >
                  <span className="font-mono font-bold text-[#F26440] text-[11px]">{ch.time}</span>
                  <span>{ch.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
