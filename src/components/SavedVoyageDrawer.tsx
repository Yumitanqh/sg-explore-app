import React, { useState } from 'react';
import { DiscoverySpot } from '../data/discoveries';
import { MrtBadge } from './MrtBadge';
import { GooglePlacesBadge } from './GooglePlacesBadge';
import { X, Trash2, ArrowRight, Download, Copy, Check, Printer, Compass, Sparkles } from 'lucide-react';

interface SavedVoyageDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedSpots: DiscoverySpot[];
  onRemoveSaved: (id: string) => void;
  onSelectSpot: (spot: DiscoverySpot) => void;
  onClearAll: () => void;
}

export const SavedVoyageDrawer: React.FC<SavedVoyageDrawerProps> = ({
  isOpen,
  onClose,
  savedSpots,
  onRemoveSaved,
  onSelectSpot,
  onClearAll
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyText = () => {
    const text = savedSpots
      .map(
        (s, idx) =>
          `${idx + 1}. ${s.title} (${s.neighborhood})\n   - MRT: ${s.mrt.lineName} (${s.mrt.code}), ${s.mrt.exit}\n   - Rating: ${s.rating} (${s.reviewsCount.toLocaleString()} reviews)\n   - Sensory Note: ${s.sensory.aroma}\n   - Best Time: ${s.sensory.bestTime}\n`
      )
      .join('\n');

    navigator.clipboard.writeText(`BOTANICAL VOYAGE — SINGAPORE TRAVEL MEMO\n\n${text}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-[#0F382A]/40 backdrop-blur-[3px] animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-[#FBF9F5] h-full shadow-2xl border-l border-[#E8E4DC] flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-6 border-b border-[#E8E4DC] bg-white flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-[#5A6C64] mb-1 font-mono uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#F5A623]" />
              <span>Personal Collection</span>
            </div>
            <h3 className="font-serif text-2xl font-semibold text-[#0F382A]">
              My Saved Voyage
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[#F5F3EF] text-[#5A6C64] hover:text-[#1B2421] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Saved List Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {savedSpots.length === 0 ? (
            <div className="text-center py-16 px-4">
              <div className="w-16 h-16 rounded-full bg-[#E2ECE6] text-[#0F382A] flex items-center justify-center mx-auto mb-4">
                <Compass className="w-7 h-7" />
              </div>
              <h4 className="font-serif text-lg font-semibold text-[#1B2421] mb-2">
                No saved sanctuaries yet
              </h4>
              <p className="text-xs text-[#5A6C64] max-w-xs mx-auto leading-relaxed mb-6">
                Bookmark iconic mist conservatories, Peranakan shophouse streets, or Michelin food stalls across Singapore to assemble your personal sensory route.
              </p>
              <button
                onClick={onClose}
                className="px-5 py-2.5 bg-[#0F382A] text-white text-xs font-semibold rounded-[4px] hover:bg-[#1B2421] transition-all cursor-pointer"
              >
                Browse Curated Spots
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between text-xs text-[#5A6C64] pb-2">
                <span>{savedSpots.length} saved experiences</span>
                <button
                  onClick={onClearAll}
                  className="text-red-700 hover:underline cursor-pointer"
                >
                  Clear all
                </button>
              </div>

              {savedSpots.map((spot) => (
                <div
                  key={spot.id}
                  className="p-4 bg-white border border-[#E8E4DC] rounded-[4px] hover:border-[#79A28F] transition-all flex items-start gap-3.5 shadow-2xs group"
                >
                  <img
                    src={spot.image}
                    alt={spot.title}
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 rounded-[3px] object-cover shrink-0 border border-[#E8E4DC]"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#5A6C64] truncate">
                        {spot.neighborhood}
                      </span>
                      <button
                        onClick={() => onRemoveSaved(spot.id)}
                        className="text-[#5A6C64] hover:text-red-600 transition-colors cursor-pointer p-0.5"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <h5
                      onClick={() => {
                        onSelectSpot(spot);
                        onClose();
                      }}
                      className="font-serif text-sm font-semibold text-[#1B2421] group-hover:text-[#0F382A] transition-colors truncate cursor-pointer mt-0.5"
                    >
                      {spot.title}
                    </h5>

                    <div className="flex items-center gap-2 mt-1">
                      <GooglePlacesBadge rating={spot.rating} reviewsCount={spot.reviewsCount} />
                    </div>

                    <div className="mt-2 pt-2 border-t border-[#E8E4DC] flex items-center justify-between text-[11px]">
                      <MrtBadge mrt={spot.mrt} showExit={false} />
                      <button
                        onClick={() => {
                          onSelectSpot(spot);
                          onClose();
                        }}
                        className="font-semibold text-[#0F382A] hover:text-[#F26440] transition-colors flex items-center gap-0.5 cursor-pointer"
                      >
                        <span>View</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        {/* Drawer Footer Actions */}
        {savedSpots.length > 0 && (
          <div className="p-6 bg-white border-t border-[#E8E4DC] space-y-3">
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyText}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-[4px] border border-[#E8E4DC] text-[#1B2421] hover:bg-[#F5F3EF] transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-green-700" />
                    <span>Copied Memo!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Text Memo</span>
                  </>
                )}
              </button>

              <button
                onClick={handlePrint}
                className="p-2.5 rounded-[4px] border border-[#E8E4DC] text-[#1B2421] hover:bg-[#F5F3EF] transition-colors cursor-pointer"
                title="Print Itinerary"
              >
                <Printer className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={onClose}
              className="w-full py-2.5 bg-[#0F382A] text-white text-xs font-semibold rounded-[4px] uppercase tracking-wider hover:bg-[#1B2421] transition-all cursor-pointer shadow-sm"
            >
              Continue Exploring
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
