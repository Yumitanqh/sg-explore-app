import React from 'react';
import { DiscoverySpot } from '../data/discoveries';
import { MrtBadge } from './MrtBadge';
import { GooglePlacesBadge } from './GooglePlacesBadge';
import { X, Bookmark, Clock, MapPin, Sparkles, Navigation, Check, Share2 } from 'lucide-react';

interface SpotDetailModalProps {
  spot: DiscoverySpot | null;
  onClose: () => void;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  onAddToItinerary?: (spot: DiscoverySpot) => void;
  isInItinerary?: boolean;
}

export const SpotDetailModal: React.FC<SpotDetailModalProps> = ({
  spot,
  onClose,
  isSaved,
  onToggleSave,
  onAddToItinerary,
  isInItinerary = false
}) => {
  if (!spot) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-[#0F382A]/45 backdrop-blur-[4px] animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl bg-[#FBF9F5] border border-[#E8E4DC] rounded-[4px] shadow-[0_20px_40px_-15px_rgba(15,56,42,0.3)] overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header & Hero Image */}
        <div className="relative aspect-[16/9] w-full bg-[#1B2421] overflow-hidden">
          <img
            src={spot.image}
            alt={spot.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/30" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/80 transition-colors cursor-pointer z-10"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Top badges */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-white bg-[#0F382A]/90 px-3 py-1 rounded-full border border-white/20">
              {spot.categoryLabel}
            </span>
            <span className="text-xs font-medium text-white/90 bg-black/40 px-3 py-1 rounded-full backdrop-blur-md">
              {spot.neighborhood}
            </span>
          </div>

          {/* Title & Floating Badges */}
          <div className="absolute bottom-4 left-4 right-4">
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-white mb-2 leading-tight">
              {spot.title}
            </h2>
            <div className="flex flex-wrap items-center gap-3">
              <GooglePlacesBadge rating={spot.rating} reviewsCount={spot.reviewsCount} />
              <MrtBadge mrt={spot.mrt} showExit={true} />
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
          {/* Editorial Lead */}
          <div className="border-b border-[#E8E4DC] pb-5">
            <p className="font-serif text-lg text-[#1B2421] italic leading-relaxed">
              "{spot.editorialSubtitle}"
            </p>
          </div>

          {/* Curatorial Story */}
          <div className="space-y-3">
            <h3 className="font-serif text-xl font-semibold text-[#0F382A]">
              Curatorial Narrative
            </h3>
            <p className="text-sm text-[#414844] leading-relaxed">
              {spot.description}
            </p>
            <p className="text-sm text-[#414844] leading-relaxed">
              {spot.extendedCuratorialStory}
            </p>
          </div>

          {/* Sensory Profile Matrix */}
          <div className="bg-white border border-[#E8E4DC] rounded-[4px] p-5">
            <h4 className="font-serif text-base font-semibold text-[#0F382A] mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#F5A623]" />
              <span>Sensory & Botanical Profile</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-[#FBF9F5] rounded-[3px] border border-[#E8E4DC]">
                <span className="text-[#5A6C64] uppercase font-semibold text-[10px] tracking-wider block mb-1">
                  Aromatic Notes
                </span>
                <span className="text-[#1B2421] font-medium leading-relaxed">
                  {spot.sensory.aroma}
                </span>
              </div>

              <div className="p-3 bg-[#FBF9F5] rounded-[3px] border border-[#E8E4DC]">
                <span className="text-[#5A6C64] uppercase font-semibold text-[10px] tracking-wider block mb-1">
                  Atmospheric & Flora
                </span>
                <span className="text-[#1B2421] font-medium leading-relaxed">
                  {spot.sensory.floraOrAtmosphere}
                </span>
              </div>

              <div className="p-3 bg-[#FBF9F5] rounded-[3px] border border-[#E8E4DC]">
                <span className="text-[#5A6C64] uppercase font-semibold text-[10px] tracking-wider block mb-1">
                  Optimal Light & Hours
                </span>
                <span className="text-[#1B2421] font-medium font-mono">
                  {spot.sensory.bestTime}
                </span>
              </div>

              <div className="p-3 bg-[#FBF9F5] rounded-[3px] border border-[#E8E4DC]">
                <span className="text-[#5A6C64] uppercase font-semibold text-[10px] tracking-wider block mb-1">
                  Signature Moment
                </span>
                <span className="text-[#1B2421] font-medium leading-relaxed">
                  {spot.sensory.signatureExperience}
                </span>
              </div>
            </div>
          </div>

          {/* Practical Operations & Curator Tip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-3 bg-[#F5F3EF] rounded-[4px]">
              <span className="text-[#5A6C64] block font-semibold text-[10px] uppercase mb-1">
                Hours
              </span>
              <span className="font-mono text-[#1B2421]">{spot.openingHours}</span>
            </div>

            <div className="p-3 bg-[#F5F3EF] rounded-[4px]">
              <span className="text-[#5A6C64] block font-semibold text-[10px] uppercase mb-1">
                Duration
              </span>
              <span className="font-mono text-[#1B2421]">{spot.recommendedDuration}</span>
            </div>

            <div className="p-3 bg-[#F5F3EF] rounded-[4px]">
              <span className="text-[#5A6C64] block font-semibold text-[10px] uppercase mb-1">
                Address
              </span>
              <span className="text-[#1B2421] truncate block">{spot.address}</span>
            </div>
          </div>

          {/* Must-Try Dishes if available */}
          {spot.mustTryDishes && spot.mustTryDishes.length > 0 && (
            <div className="p-4 bg-[#FFF8F2] border border-[#FFDAD2] rounded-[4px] text-xs">
              <span className="font-bold text-[#891D00] uppercase tracking-wider text-[11px] block mb-2">
                ★ Must-Try Authentic Dishes & Special Orders:
              </span>
              <div className="flex flex-wrap gap-2">
                {spot.mustTryDishes.map((dish, dIdx) => (
                  <span
                    key={dIdx}
                    className="bg-white border border-[#FFDAD2] text-[#AD3313] px-3 py-1 rounded-[3px] font-medium"
                  >
                    {dish}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Curator Insider Secret */}
          <div className="p-4 bg-[#E2ECE6] border border-[#C1ECD7] rounded-[4px] text-xs text-[#0F382A]">
            <span className="font-bold text-[11px] uppercase tracking-wider block mb-1">
              Curator’s Insider Field Note:
            </span>
            <p className="leading-relaxed">
              {spot.curatorTip}
            </p>
          </div>
        </div>

        {/* Modal Action Footer */}
        <div className="p-5 bg-white border-t border-[#E8E4DC] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleSave(spot.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-[4px] font-semibold text-xs tracking-wide uppercase transition-all cursor-pointer ${
                isSaved
                  ? 'bg-[#0F382A] text-white'
                  : 'bg-white border border-[#0F382A] text-[#0F382A] hover:bg-[#F5F3EF]'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
              <span>{isSaved ? 'Saved' : 'Save'}</span>
            </button>

            {onAddToItinerary && (
              <button
                onClick={() => onAddToItinerary(spot)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-[4px] font-semibold text-xs tracking-wide uppercase transition-all cursor-pointer ${
                  isInItinerary
                    ? 'bg-[#E2ECE6] text-[#0F382A] hover:bg-[#c1ecd7]'
                    : 'bg-[#F26440] text-white hover:bg-[#ad3313]'
                }`}
              >
                <span>{isInItinerary ? '✓ In Itinerary' : '+ Add to Itinerary'}</span>
              </button>
            )}
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-[#5A6C64] hover:text-[#1B2421] transition-colors cursor-pointer"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
