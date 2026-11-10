import React from 'react';
import { DiscoverySpot, VisitorReview, getSpotReviews } from '../data/discoveries';
import { Star, MessageSquareQuote, CheckCircle, Sparkles, Utensils, Heart } from 'lucide-react';

interface CustomerReviewCalloutProps {
  spot: DiscoverySpot;
  reviews?: VisitorReview[];
  onSelectSpot?: () => void;
  compact?: boolean;
}

export const CustomerReviewCallout: React.FC<CustomerReviewCalloutProps> = ({
  spot,
  reviews,
  onSelectSpot,
  compact = false
}) => {
  const allReviews = reviews && reviews.length > 0 ? reviews : getSpotReviews(spot);
  const featuredReview = allReviews[0];

  if (!featuredReview) return null;

  return (
    <div
      onClick={onSelectSpot}
      className={`relative w-full overflow-hidden rounded-[4px] border border-[#E2DDD3] bg-gradient-to-br from-[#FAF8F3] via-[#F5EFE4] to-[#ECE3D2] p-5 flex flex-col justify-between transition-all duration-300 group-hover:border-[#79A28F] ${
        compact ? 'min-h-[190px]' : 'min-h-[220px]'
      }`}
    >
      {/* Decorative Curatorial Background Quotes */}
      <span
        aria-hidden="true"
        className="absolute -top-3 left-3 text-7xl font-serif text-[#0F382A]/10 pointer-events-none select-none font-bold"
      >
        “
      </span>

      {/* Top Header: Customer Rating & Verified Badge */}
      <div className="relative z-10 flex items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-1.5">
          <div className="flex items-center text-[#F5A623]">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 ${
                  i < Math.floor(featuredReview.rating)
                    ? 'fill-current'
                    : i < featuredReview.rating
                    ? 'fill-current opacity-70'
                    : 'text-[#E8E4DC]'
                }`}
              />
            ))}
          </div>
          <span className="font-mono text-xs font-bold text-[#1B2421]">
            {featuredReview.rating.toFixed(1)}
          </span>
          <span className="text-[11px] font-mono text-[#5A6C64]">
            ({spot.reviewsCount.toLocaleString()} reviews)
          </span>
        </div>

        <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-[#0F382A] bg-[#E2ECE6] px-2 py-0.5 rounded-full border border-[#C1ECD7]">
          <CheckCircle className="w-2.5 h-2.5 text-[#0F382A]" />
          <span>Verified Diner</span>
        </span>
      </div>

      {/* Primary Customer Review Quote */}
      <div className="relative z-10 flex-1 my-1">
        <blockquote className="font-serif text-[14px] lg:text-[15px] italic text-[#1B2421] leading-snug line-clamp-3 group-hover:text-[#0F382A] transition-colors">
          “{featuredReview.comment}”
        </blockquote>

        {/* Visited Dish or Experience Tag */}
        {featuredReview.visitedDishOrActivity && (
          <div className="mt-2.5 flex items-center gap-1.5 text-[11px] font-medium text-[#891D00]">
            <Utensils className="w-3 h-3 text-[#F26440] shrink-0" />
            <span className="truncate">
              Recommended: <strong>{featuredReview.visitedDishOrActivity}</strong>
            </span>
          </div>
        )}
      </div>

      {/* Reviewer Meta Footer */}
      <div className="relative z-10 pt-3 border-t border-[#E2DDD3]/80 flex items-center justify-between text-xs text-[#5A6C64] mt-2">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-6 h-6 rounded-full bg-[#0F382A] text-white flex items-center justify-center text-[10px] font-bold shrink-0">
            {featuredReview.author.slice(0, 2).toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-[#1B2421] truncate text-[11px]">
              {featuredReview.author}
            </p>
            <p className="text-[10px] text-[#5A6C64] leading-tight">
              {featuredReview.date} · {featuredReview.tag}
            </p>
          </div>
        </div>

        <span className="text-[11px] font-semibold text-[#0F382A] group-hover:underline shrink-0">
          Read all {allReviews.length} reviews →
        </span>
      </div>
    </div>
  );
};
