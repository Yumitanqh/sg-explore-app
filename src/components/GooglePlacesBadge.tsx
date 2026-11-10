import React from 'react';
import { Star } from 'lucide-react';

interface GooglePlacesBadgeProps {
  rating: number;
  reviewsCount: number;
}

export const GooglePlacesBadge: React.FC<GooglePlacesBadgeProps> = ({
  rating,
  reviewsCount
}) => {
  return (
    <div className="inline-flex items-center gap-1.5 bg-white border border-[#E8E4DC] rounded-full px-2.5 py-1 text-xs shadow-xs">
      <Star className="w-3.5 h-3.5 fill-[#F5A623] text-[#F5A623]" />
      <span className="font-bold text-[#1B2421] text-xs font-mono">{rating.toFixed(1)}</span>
      <span className="text-[#5A6C64] text-[11px] font-sans">
        ({reviewsCount.toLocaleString()})
      </span>
    </div>
  );
};
