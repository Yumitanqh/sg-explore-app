import React from 'react';
import { DiscoverySpot, getSpotReviews } from '../data/discoveries';
import { MrtBadge } from './MrtBadge';
import { GooglePlacesBadge } from './GooglePlacesBadge';
import { Bookmark, Clock, ArrowUpRight, Plus, Utensils, Check, Star, CheckCircle, MessageSquareQuote } from 'lucide-react';

interface DiscoveryCardProps {
  spot: DiscoverySpot;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  onSelectSpot: (spot: DiscoverySpot) => void;
  onAddToItinerary?: (spot: DiscoverySpot) => void;
  isInItinerary?: boolean;
  aspectRatio?: '4:3' | '16:9';
}

export const DiscoveryCard: React.FC<DiscoveryCardProps> = ({
  spot,
  isSaved,
  onToggleSave,
  onSelectSpot,
  onAddToItinerary,
  isInItinerary = false,
  aspectRatio = '4:3'
}) => {
  const reviews = getSpotReviews(spot);
  const topReview = reviews[0];

  return (
    <article className="group bg-white border border-[#E8E4DC] rounded-[4px] overflow-hidden flex flex-col transition-all duration-300 hover:shadow-[0_8px_24px_-4px_rgba(15,56,42,0.08)] hover:border-[#79A28F]/60">
      {/* Customer Review Showcase in place of picture */}
      <div
        className="relative w-full bg-gradient-to-br from-[#FAF8F3] via-[#F5EFE4] to-[#ECE3D2] border-b border-[#E8E4DC] p-5 cursor-pointer flex flex-col justify-between min-h-[225px]"
        onClick={() => onSelectSpot(spot)}
      >
        {/* Giant decorative quotation mark */}
        <span
          aria-hidden="true"
          className="absolute -top-3 left-4 text-7xl font-serif text-[#0F382A]/10 pointer-events-none select-none font-bold"
        >
          “
        </span>

        {/* Top Badges: Heartland & Save Button */}
        <div className="relative z-10 flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#0F382A] bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-full border border-[#D5CFC3] shadow-2xs">
              {spot.heartland || spot.neighborhood}
            </span>
            {spot.isLocalFavorite && (
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#1B2421] bg-[#F5A623] px-2 py-0.5 rounded-full shadow-2xs">
                Local Favorite
              </span>
            )}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave(spot.id);
            }}
            title={isSaved ? 'Remove from Saved Voyage' : 'Save to My Voyage'}
            className={`p-2 rounded-full border transition-all duration-200 cursor-pointer ${
              isSaved
                ? 'bg-[#0F382A] text-white border-[#0F382A] shadow-md'
                : 'bg-white/90 text-[#1B2421] border-[#D5CFC3] hover:bg-[#0F382A] hover:text-white'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Verified Customer Review Quote */}
        {topReview && (
          <div className="relative z-10 my-1">
            <div className="flex items-center gap-1.5 mb-1.5">
              <div className="flex items-center text-[#F5A623]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${
                      i < Math.floor(topReview.rating)
                        ? 'fill-current'
                        : 'text-[#D5CFC3]'
                    }`}
                  />
                ))}
              </div>
              <span className="text-[11px] font-mono font-bold text-[#1B2421]">
                {topReview.rating.toFixed(1)}
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#0F382A] bg-[#E2ECE6] px-1.5 py-0.2 rounded font-sans">
                {topReview.tag}
              </span>
            </div>

            <blockquote className="font-serif text-[14px] italic text-[#1B2421] leading-snug line-clamp-3 group-hover:text-[#0F382A] transition-colors">
              “{topReview.comment}”
            </blockquote>

            {topReview.visitedDishOrActivity && (
              <p className="mt-1.5 text-[11px] font-medium text-[#891D00] truncate">
                Dined / Tried: <strong>{topReview.visitedDishOrActivity}</strong>
              </p>
            )}

            <div className="mt-2 flex items-center gap-1.5 text-[11px] text-[#5A6C64]">
              <span className="font-semibold text-[#1B2421] truncate">{topReview.author}</span>
              <span aria-hidden="true">·</span>
              <span className="text-[10px] text-[#0F382A] font-semibold flex items-center gap-0.5">
                <CheckCircle className="w-2.5 h-2.5" /> Verified
              </span>
            </div>
          </div>
        )}

        {/* Bottom floating Google Places and MRT Badges */}
        <div className="relative z-10 pt-2.5 mt-2 border-t border-[#E2DDD3]/70 flex flex-wrap items-center justify-between gap-2">
          <GooglePlacesBadge rating={spot.rating} reviewsCount={spot.reviewsCount} />
          <MrtBadge mrt={spot.mrt} showExit={false} />
        </div>
      </div>

      {/* Card Content Section */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Unboxed Metadata (Zero-pill discipline) */}
          <div className="flex items-center gap-2 text-xs text-[#5A6C64] mb-2 font-medium">
            <span>{spot.categoryLabel}</span>
            <span aria-hidden="true">·</span>
            <span>{spot.priceTier}</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-[#5A6C64]" />
              {spot.recommendedDuration}
            </span>
          </div>

          {/* Title in Playfair Display */}
          <h3
            onClick={() => onSelectSpot(spot)}
            className="font-serif text-xl lg:text-[22px] font-semibold text-[#1B2421] leading-snug group-hover:text-[#0F382A] transition-colors cursor-pointer mb-2"
          >
            {spot.title}
          </h3>

          {/* Subtitle / Lead */}
          <p className="text-sm text-[#5A6C64] leading-relaxed line-clamp-2 mb-3 font-normal">
            {spot.editorialSubtitle}
          </p>

          {/* Must Try Food Dishes Pill if available */}
          {spot.mustTryDishes && spot.mustTryDishes.length > 0 && (
            <div className="p-2.5 bg-[#FFF8F2] border border-[#FFDAD2] rounded-[4px] mb-3 text-xs text-[#AD3313]">
              <span className="font-semibold text-[#891D00] uppercase tracking-wider text-[10px] flex items-center gap-1 mb-0.5">
                <Utensils className="w-3 h-3 text-[#F26440]" />
                <span>Must-Try Food Highlights:</span>
              </span>
              <span className="font-medium line-clamp-1">{spot.mustTryDishes.join(' · ')}</span>
            </div>
          )}

          {/* Sensory Highlight Note */}
          <div className="p-2.5 bg-[#FBF9F5] border border-[#E8E4DC] rounded-[4px] mb-4 text-xs text-[#414844]">
            <span className="font-semibold text-[#0F382A] uppercase tracking-wider text-[10px] block mb-0.5">
              Sensory Signature
            </span>
            <span className="italic line-clamp-1">{spot.sensory.aroma}</span>
          </div>
        </div>

        {/* Bottom Action Strip */}
        <div className="pt-3 border-t border-[#E8E4DC] flex items-center justify-between gap-2 text-xs">
          <button
            onClick={() => onSelectSpot(spot)}
            className="flex items-center gap-1 font-semibold text-[#0F382A] hover:text-[#1B2421] transition-colors cursor-pointer"
          >
            <span>Curatorial Guide</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          {onAddToItinerary && (
            <button
              onClick={() => onAddToItinerary(spot)}
              className={`px-3 py-1.5 rounded-[4px] text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                isInItinerary
                  ? 'bg-[#E2ECE6] text-[#0F382A] hover:bg-[#c1ecd7]'
                  : 'bg-[#0F382A] text-white hover:bg-[#1B2421]'
              }`}
            >
              {isInItinerary ? (
                <>
                  <Check className="w-3 h-3 text-[#0F382A]" />
                  <span>In Itinerary</span>
                </>
              ) : (
                <>
                  <Plus className="w-3 h-3" />
                  <span>+ Itinerary</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </article>
  );
};
