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
      {/* Customer Review Showcase in place of picture */}
      <div
        onClick={() => onOpenStory(story)}
        className="relative w-full aspect-[16/10] overflow-hidden bg-gradient-to-br from-[#FAF8F3] via-[#F4EDE0] to-[#E9DFCD] border-b border-[#E8E4DC] p-5 cursor-pointer flex flex-col justify-between"
      >
        {/* Background decorative quote mark */}
        <span
          aria-hidden="true"
          className="absolute -top-3 left-4 text-7xl font-serif text-[#0F382A]/10 pointer-events-none select-none font-bold"
        >
          “
        </span>

        {/* Top Badges: Neighborhood & Review Count */}
        <div className="relative z-10 flex items-center justify-between gap-2">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#0F382A] bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-full border border-[#D5CFC3] shadow-2xs">
            {story.neighborhood}
          </span>

          <span className="text-[11px] font-mono font-medium text-[#0F382A] bg-[#E2ECE6] px-2.5 py-1 rounded-full border border-[#C1ECD7] flex items-center gap-1.5 shadow-2xs">
            <Star className="w-3 h-3 fill-[#F5A623] text-[#F5A623]" />
            <span>{story.reviews.length} Verified Reviews</span>
          </span>
        </div>

        {/* Highlight Customer Quote */}
        {topReview && (
          <div className="relative z-10 my-auto py-1">
            <blockquote className="font-serif text-sm sm:text-[15px] italic text-[#1B2421] leading-snug line-clamp-3 group-hover:text-[#0F382A] transition-colors">
              “{topReview.quote}”
            </blockquote>
          </div>
        )}

        {/* Bottom Reviewer Credit */}
        <div className="relative z-10 pt-2 border-t border-[#D5CFC3]/60 flex items-center justify-between text-xs text-[#5A6C64]">
          <span className="text-[11px] font-semibold text-[#1B2421] truncate max-w-[200px]">
            {topReview ? topReview.author : story.photographer}
          </span>
          <span className="text-[10px] uppercase tracking-wider bg-white/80 px-2 py-0.5 rounded border border-[#D5CFC3]">
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
