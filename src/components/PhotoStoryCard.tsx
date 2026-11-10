import React from 'react';
import { PhotoStory } from '../data/photoStories';
import { Camera, Star, ArrowUpRight, MessageSquare, MapPin } from 'lucide-react';

interface PhotoStoryCardProps {
  story: PhotoStory;
  onOpenStory: (story: PhotoStory) => void;
}

export const PhotoStoryCard: React.FC<PhotoStoryCardProps> = ({ story, onOpenStory }) => {
  const topReview = story.reviews && story.reviews.length > 0 ? story.reviews[0] : null;

  return (
    <article className="group bg-white border border-[#E8E4DC] rounded-[4px] overflow-hidden flex flex-col transition-all duration-300 hover:shadow-[0_8px_24px_-4px_rgba(15,56,42,0.08)] hover:border-[#79A28F]">
      {/* Visual Image Frame */}
      <div
        onClick={() => onOpenStory(story)}
        className="relative w-full aspect-[16/10] overflow-hidden bg-[#1B2421] cursor-pointer"
      >
        <img
          src={story.coverImage}
          alt={story.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Scrim Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/30 pointer-events-none" />

        {/* Top Badges: Neighborhood & Photo Count */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-white bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20">
            {story.neighborhood}
          </span>

          <span className="text-[11px] font-mono font-medium text-white bg-[#0F382A]/90 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20 flex items-center gap-1.5 shadow-xs">
            <Camera className="w-3 h-3 text-[#A5D0BC]" />
            <span>{story.gallery.length} Curated Photos</span>
          </span>
        </div>

        {/* Bottom Photographer Caption */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs z-10 pointer-events-none">
          <span className="text-[11px] font-mono text-white/90 truncate max-w-[220px]">
            Photo Dispatch by {story.photographer.split('·')[0]}
          </span>
          <span className="text-[10px] uppercase tracking-wider bg-white/20 backdrop-blur-md px-2 py-0.5 rounded">
            {story.activityOrTheme.split('&')[0]}
          </span>
        </div>
      </div>

      {/* Card Content Section */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#5A6C64] mb-2 font-medium">
            <span>{story.activityOrTheme}</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1 text-[#0F382A] font-semibold">
              <Star className="w-3.5 h-3.5 fill-[#F5A623] text-[#F5A623]" />
              <span>5.0 Verified Reviews</span>
            </span>
          </div>

          <h3
            onClick={() => onOpenStory(story)}
            className="font-serif text-lg lg:text-xl font-semibold text-[#1B2421] leading-snug group-hover:text-[#0F382A] transition-colors cursor-pointer mb-2.5"
          >
            {story.title}
          </h3>

          <p className="text-xs text-[#5A6C64] leading-relaxed line-clamp-2 mb-4 font-normal">
            {story.summary}
          </p>

          {/* Featured Real Visitor Review Snippet */}
          {topReview && (
            <div className="p-3 bg-[#FBF9F5] border border-[#E8E4DC] rounded-[4px] mb-4 text-xs space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-[#0F382A] text-[11px] flex items-center gap-1">
                  <MessageSquare className="w-3 h-3 text-[#F26440]" />
                  <span>{topReview.author}</span>
                </span>
                <span className="text-[10px] font-mono text-[#5A6C64]">{topReview.date}</span>
              </div>
              <p className="text-[#414844] italic line-clamp-2">
                "{topReview.quote}"
              </p>
            </div>
          )}
        </div>

        {/* Action Strip */}
        <div className="pt-3 border-t border-[#E8E4DC] flex items-center justify-between text-xs">
          <button
            onClick={() => onOpenStory(story)}
            className="flex items-center gap-1 font-semibold text-[#0F382A] hover:text-[#F26440] transition-colors cursor-pointer"
          >
            <span>View Full Photo Gallery & Reviews</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          <span className="font-mono text-[11px] text-[#5A6C64]">
            {story.reviews.length} Verified Tips
          </span>
        </div>
      </div>
    </article>
  );
};
