import React from 'react';
import { DiscoverySpot } from '../data/discoveries';
import { MrtBadge } from './MrtBadge';
import { GooglePlacesBadge } from './GooglePlacesBadge';
import { Bookmark, Clock, ArrowUpRight, Plus, Utensils, Check } from 'lucide-react';

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
  return (
    <article className="group bg-white border border-[#E8E4DC] rounded-[4px] overflow-hidden flex flex-col transition-all duration-300 hover:shadow-[0_8px_24px_-4px_rgba(15,56,42,0.08)] hover:border-[#79A28F]/50">
      {/* Editorial ratio image container */}
      <div
        className={`relative w-full overflow-hidden bg-[#F5F3EF] cursor-pointer ${
          aspectRatio === '16:9' ? 'aspect-[16/9]' : 'aspect-[4/3]'
        }`}
        onClick={() => onSelectSpot(spot)}
      >
        <img
          src={spot.image}
          alt={spot.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Ambient top & bottom scrims */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/25 pointer-events-none" />

        {/* Top Badges: Heartland/Neighborhood & Bookmark */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10">
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-white bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20">
              {spot.heartland || spot.neighborhood}
            </span>
            {spot.isLocalFavorite && (
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#1B2421] bg-[#F5A623] px-2 py-0.5 rounded-full shadow-xs">
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
            className={`p-2 rounded-full backdrop-blur-md border transition-all duration-200 cursor-pointer ${
              isSaved
                ? 'bg-[#0F382A] text-white border-[#0F382A] shadow-md'
                : 'bg-white/80 text-[#1B2421] border-white/40 hover:bg-white hover:text-[#0F382A]'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Bottom floating Google Places and MRT Badges */}
        <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-center justify-between gap-2 z-10 pointer-events-none">
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
