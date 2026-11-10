import React, { useState } from 'react';
import { DiscoverySpot, VisitorReview, getSpotReviews } from '../data/discoveries';
import { MrtBadge } from './MrtBadge';
import { GooglePlacesBadge } from './GooglePlacesBadge';
import { X, Bookmark, Clock, MapPin, Sparkles, Navigation, Check, Share2, Star, CheckCircle, MessageSquareQuote, Send, Plus } from 'lucide-react';

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
  const [userRating, setUserRating] = useState<number>(5);
  const [userName, setUserName] = useState<string>('');
  const [userComment, setUserComment] = useState<string>('');
  const [userDish, setUserDish] = useState<string>('');
  const [submittedReviews, setSubmittedReviews] = useState<VisitorReview[]>([]);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);

  if (!spot) return null;

  const initialReviews = getSpotReviews(spot);
  const allReviews = [...submittedReviews, ...initialReviews];
  const featuredReview = allReviews[0];

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim() || !userComment.trim()) return;

    const newRev: VisitorReview = {
      id: `user-rev-${Date.now()}`,
      author: userName.trim(),
      rating: userRating,
      date: 'Just now',
      tag: 'Food Quality',
      comment: userComment.trim(),
      visitedDishOrActivity: userDish.trim() || spot.mustTryDishes?.[0] || 'Signature Experience',
      verifiedLocal: true
    };

    setSubmittedReviews((prev) => [newRev, ...prev]);
    setUserName('');
    setUserComment('');
    setUserDish('');
    setSubmitSuccess(true);
    setTimeout(() => setSubmitSuccess(false), 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-[#0F382A]/45 backdrop-blur-[4px] animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl bg-[#FBF9F5] border border-[#E8E4DC] rounded-[4px] shadow-[0_20px_40px_-15px_rgba(15,56,42,0.3)] overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header: Verified Customer Review Plaque (Replaces picture) */}
        <div className="relative w-full bg-gradient-to-br from-[#FAF8F3] via-[#F4EDE0] to-[#EAE0CD] border-b border-[#E8E4DC] p-6 sm:p-8">
          {/* Decorative quotes watermark */}
          <span
            aria-hidden="true"
            className="absolute -top-6 left-6 text-9xl font-serif text-[#0F382A]/10 pointer-events-none select-none font-bold"
          >
            “
          </span>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-[#0F382A] hover:text-white text-[#1B2421] border border-[#D5CFC3] transition-colors cursor-pointer z-10"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Top badges */}
          <div className="relative z-10 flex items-center gap-2 mb-3 flex-wrap">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#0F382A] bg-white/90 px-3 py-1 rounded-full border border-[#D5CFC3] shadow-2xs">
              {spot.categoryLabel}
            </span>
            <span className="text-xs font-medium text-[#1B2421] bg-white/70 px-3 py-1 rounded-full border border-[#D5CFC3]">
              {spot.neighborhood} · {spot.heartland || 'Singapore'}
            </span>
            {spot.isLocalFavorite && (
              <span className="text-xs font-bold uppercase tracking-wider text-[#1B2421] bg-[#F5A623] px-2.5 py-0.5 rounded-full">
                Local Favorite
              </span>
            )}
          </div>

          {/* Title & Floating Badges */}
          <div className="relative z-10">
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#0F382A] mb-2 leading-tight">
              {spot.title}
            </h2>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <GooglePlacesBadge rating={spot.rating} reviewsCount={spot.reviewsCount} />
              <MrtBadge mrt={spot.mrt} showExit={true} />
            </div>

            {/* Featured Customer Quote Box */}
            {featuredReview && (
              <div className="p-4 bg-white/90 border border-[#D5CFC3] rounded-[4px] shadow-2xs space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <div className="flex text-[#F5A623]">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < Math.floor(featuredReview.rating) ? 'fill-current' : 'text-[#D5CFC3]'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-mono text-xs font-bold text-[#1B2421]">
                      {featuredReview.rating.toFixed(1)}
                    </span>
                    <span className="text-[11px] text-[#0F382A] font-semibold flex items-center gap-0.5">
                      <CheckCircle className="w-3 h-3" /> Verified Local Diner
                    </span>
                  </div>
                  <span className="text-[10px] text-[#5A6C64] font-mono">{featuredReview.date}</span>
                </div>

                <blockquote className="font-serif text-sm sm:text-base italic text-[#1B2421] leading-relaxed">
                  “{featuredReview.comment}”
                </blockquote>

                <div className="flex items-center justify-between text-xs text-[#5A6C64] pt-1">
                  <span className="font-medium text-[#891D00]">
                    Recommended Dish: {featuredReview.visitedDishOrActivity}
                  </span>
                  <span className="font-semibold text-[#1B2421]">— {featuredReview.author}</span>
                </div>
              </div>
            )}
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

          {/* Full Customer Reviews & Community Tips Feed */}
          <div className="bg-white border border-[#E8E4DC] rounded-[4px] p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-[#E8E4DC] pb-3">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#5A6C64] block">
                  Customer Testimonials
                </span>
                <h4 className="font-serif text-lg font-semibold text-[#0F382A]">
                  Verified Customer Reviews ({allReviews.length})
                </h4>
              </div>
              <span className="text-xs font-semibold text-[#0F382A] bg-[#E2ECE6] px-2.5 py-1 rounded-full border border-[#C1ECD7]">
                ★ {spot.rating} Overall Rating
              </span>
            </div>

            {/* Reviews Cards List */}
            <div className="space-y-3">
              {allReviews.map((rev) => (
                <div
                  key={rev.id}
                  className="p-3.5 bg-[#FBF9F5] border border-[#E8E4DC] rounded-[4px] space-y-1.5 text-xs"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-[#0F382A] text-white flex items-center justify-center text-[9px] font-bold">
                        {rev.author.slice(0, 2).toUpperCase()}
                      </div>
                      <span className="font-semibold text-[#1B2421]">{rev.author}</span>
                      {rev.verifiedLocal && (
                        <span className="text-[10px] text-[#0F382A] font-medium flex items-center gap-0.5">
                          <CheckCircle className="w-2.5 h-2.5" /> Verified
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5">
                      <div className="flex text-[#F5A623]">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span key={i} className="text-xs">
                            {i < rev.rating ? '★' : '☆'}
                          </span>
                        ))}
                      </div>
                      <span className="text-[10px] text-[#5A6C64]">{rev.date}</span>
                    </div>
                  </div>

                  <p className="text-sm italic text-[#1B2421] font-serif leading-relaxed">
                    “{rev.comment}”
                  </p>

                  {rev.visitedDishOrActivity && (
                    <p className="text-[11px] text-[#891D00] font-medium">
                      Ordered: <strong>{rev.visitedDishOrActivity}</strong>
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Interactive Write-a-Review Box */}
            <form onSubmit={handleAddReview} className="pt-3 border-t border-[#E8E4DC] space-y-3 text-xs">
              <span className="font-semibold text-[#0F382A] block text-xs">
                Share Your Customer Review for {spot.title}:
              </span>

              {submitSuccess && (
                <div className="p-2.5 bg-[#E2ECE6] text-[#0F382A] rounded border border-[#C1ECD7] font-semibold text-xs flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5" />
                  <span>Thank you! Your customer review has been posted.</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div>
                  <label className="text-[10px] uppercase font-semibold text-[#5A6C64] block mb-0.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="e.g. Alex Tan"
                    className="w-full px-2.5 py-1.5 bg-[#FBF9F5] border border-[#E8E4DC] rounded text-xs focus:outline-none focus:border-[#0F382A]"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase font-semibold text-[#5A6C64] block mb-0.5">
                    Dish / Experience Ordered
                  </label>
                  <input
                    type="text"
                    value={userDish}
                    onChange={(e) => setUserDish(e.target.value)}
                    placeholder={spot.mustTryDishes?.[0] || 'e.g. Nasi Lemak'}
                    className="w-full px-2.5 py-1.5 bg-[#FBF9F5] border border-[#E8E4DC] rounded text-xs focus:outline-none focus:border-[#0F382A]"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase font-semibold text-[#5A6C64] block mb-0.5">
                    Rating
                  </label>
                  <select
                    value={userRating}
                    onChange={(e) => setUserRating(Number(e.target.value))}
                    className="w-full px-2.5 py-1.5 bg-[#FBF9F5] border border-[#E8E4DC] rounded text-xs font-semibold focus:outline-none focus:border-[#0F382A]"
                  >
                    <option value={5}>★★★★★ 5.0 (Exceptional)</option>
                    <option value={4}>★★★★☆ 4.0 (Very Good)</option>
                    <option value={3}>★★★☆☆ 3.0 (Average)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase font-semibold text-[#5A6C64] block mb-0.5">
                  Your Review & Recommendations
                </label>
                <textarea
                  required
                  rows={2}
                  value={userComment}
                  onChange={(e) => setUserComment(e.target.value)}
                  placeholder="Describe your dining experience, taste of the dishes, queue time, and tips for future visitors..."
                  className="w-full px-2.5 py-1.5 bg-[#FBF9F5] border border-[#E8E4DC] rounded text-xs focus:outline-none focus:border-[#0F382A]"
                />
              </div>

              <button
                type="submit"
                className="px-4 py-2 bg-[#0F382A] text-white text-xs font-semibold uppercase tracking-wider rounded-[3px] hover:bg-[#1B2421] transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Send className="w-3 h-3" />
                <span>Submit Customer Review</span>
              </button>
            </form>
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
