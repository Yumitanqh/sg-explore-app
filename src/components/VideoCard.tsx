import React from 'react';
import { VideoEssay } from '../data/videos';
import { Play, Eye, Clock } from 'lucide-react';

interface VideoCardProps {
  video: VideoEssay;
  onPlayVideo: (video: VideoEssay) => void;
}

export const VideoCard: React.FC<VideoCardProps> = ({ video, onPlayVideo }) => {
  return (
    <article className="group bg-white border border-[#E8E4DC] rounded-[4px] overflow-hidden flex flex-col transition-all duration-300 hover:shadow-[0_8px_24px_-4px_rgba(15,56,42,0.08)]">
      {/* 16:9 frame with custom thumbnail overlay and coral play button */}
      <div
        onClick={() => onPlayVideo(video)}
        className="relative w-full aspect-[16/9] overflow-hidden bg-[#1B2421] cursor-pointer"
      >
        <img
          src={video.thumbnail}
          alt={video.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-90 group-hover:opacity-100"
        />

        {/* Ambient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30 transition-opacity" />

        {/* Center Coral-filled circular play badge with white play icon */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-14 h-14 rounded-full bg-[#F26440] text-white flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:bg-[#ff6e49]">
            <Play className="w-6 h-6 fill-white ml-0.5" />
          </div>
        </div>

        {/* Top duration & views badge */}
        <div className="absolute top-3 right-3 flex items-center gap-2 z-10 pointer-events-none">
          <span className="text-[11px] font-mono font-medium text-white bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-sm">
            {video.duration}
          </span>
        </div>

        {/* Creator avatar positioned bottom-left overlaid with semi-transparent frosted scrim */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2.5 z-10 pointer-events-none">
          <div className="p-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 shrink-0">
            <img
              src={video.creatorAvatar}
              alt={video.creatorName}
              referrerPolicy="no-referrer"
              className="w-8 h-8 rounded-full object-cover"
            />
          </div>
          <div className="bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-sm border border-white/10 text-white truncate max-w-[200px]">
            <p className="text-xs font-semibold leading-tight truncate">{video.creatorName}</p>
            <p className="text-[10px] text-white/80 font-mono leading-none">{video.creatorHandle}</p>
          </div>
        </div>
      </div>

      {/* Video metadata */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#5A6C64] mb-2 font-medium">
            <span>{video.category}</span>
            <span aria-hidden="true">·</span>
            <span>{video.views}</span>
          </div>

          <h3
            onClick={() => onPlayVideo(video)}
            className="font-serif text-lg font-semibold text-[#1B2421] leading-snug group-hover:text-[#0F382A] transition-colors cursor-pointer mb-2"
          >
            {video.title}
          </h3>

          <p className="text-xs text-[#5A6C64] leading-relaxed line-clamp-2">
            {video.summary}
          </p>
        </div>

        <div className="pt-3 mt-4 border-t border-[#E8E4DC] flex items-center justify-between text-xs text-[#5A6C64]">
          <span className="font-mono text-[11px]">Chapter Notes Available</span>
          <button
            onClick={() => onPlayVideo(video)}
            className="font-semibold text-[#F26440] hover:text-[#ad3313] transition-colors cursor-pointer"
          >
            Watch Essay
          </button>
        </div>
      </div>
    </article>
  );
};
