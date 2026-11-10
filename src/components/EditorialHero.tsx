import React from 'react';
import { Sparkles, Compass, MapPin, ArrowRight } from 'lucide-react';
import { DiscoverySpot } from '../data/discoveries';

interface EditorialHeroProps {
  onExploreClick: () => void;
  onSelectFeatured: (spot: DiscoverySpot) => void;
  featuredSpot: DiscoverySpot;
}

export const EditorialHero: React.FC<EditorialHeroProps> = ({
  onExploreClick,
  onSelectFeatured,
  featuredSpot
}) => {
  return (
    <section className="relative pt-6 pb-12 lg:pt-10 lg:pb-16 border-b border-[#E8E4DC]">
      <div className="max-w-[1320px] mx-auto px-6">
        {/* Curatorial Header Decker */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-[#5A6C64]">
            <span className="text-[#0F382A] font-bold">Vol. VII</span>
            <span aria-hidden="true">·</span>
            <span>The Equatorial Field Dispatch</span>
            <span aria-hidden="true">·</span>
            <span>Singapore 01°17′N 103°50′E</span>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-[#5A6C64]">
            <span className="w-2 h-2 rounded-full bg-[#0F382A]" />
            <span>Monsoon Mist Season · 28°C Ambient</span>
          </div>
        </div>

        {/* 2-Column Balanced Editorial Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Narrative Column (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-[62px] font-semibold text-[#0F382A] leading-[1.08] tracking-tight mb-6 text-balance">
                Lush Canopies, Heritage Shophouses & Twilight Nectar.
              </h1>

              <p className="text-base sm:text-lg text-[#414844] leading-relaxed max-w-2xl font-normal mb-8">
                Singapore balances UNESCO tropical rainforests with column-free modernist cloud conservatories, generational Peranakan craft, and Michelin-recognized street food woks. Welcome to an intentional sensory guide for the discerning flâneur.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={onExploreClick}
                  className="px-6 py-3.5 bg-[#0F382A] text-white font-semibold text-xs tracking-wider uppercase rounded-[4px] hover:bg-[#1B2421] transition-all shadow-sm hover:shadow-md cursor-pointer flex items-center gap-2"
                >
                  <Compass className="w-4 h-4 text-[#F5A623]" />
                  <span>Begin The Discovery</span>
                </button>

                <button
                  onClick={() => onSelectFeatured(featuredSpot)}
                  className="px-6 py-3.5 bg-white border border-[#E8E4DC] text-[#0F382A] font-semibold text-xs tracking-wider uppercase rounded-[4px] hover:bg-[#F5F3EF] hover:border-[#0F382A] transition-all cursor-pointer flex items-center gap-2"
                >
                  <span>Featured Chronicle</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Qualitative Editorial Triad Strip */}
            <div className="pt-6 border-t border-[#E8E4DC] grid grid-cols-3 gap-4 text-xs">
              <div>
                <span className="font-mono font-bold text-lg lg:text-xl text-[#0F382A] block tabular-nums">
                  1859
                </span>
                <span className="text-[#5A6C64] uppercase text-[10px] tracking-wider">
                  UNESCO Botanic Founding
                </span>
              </div>

              <div>
                <span className="font-mono font-bold text-lg lg:text-xl text-[#0F382A] block tabular-nums">
                  3,000+
                </span>
                <span className="text-[#5A6C64] uppercase text-[10px] tracking-wider">
                  Documented Orchid Hybrids
                </span>
              </div>

              <div>
                <span className="font-mono font-bold text-lg lg:text-xl text-[#0F382A] block tabular-nums">
                  110+
                </span>
                <span className="text-[#5A6C64] uppercase text-[10px] tracking-wider">
                  Hawker Food Sanctuaries
                </span>
              </div>
            </div>
          </div>

          {/* Right Lead Visual Column (5 cols) - Featured Customer Review Showcase */}
          <div className="lg:col-span-5 flex flex-col">
            <div
              onClick={() => onSelectFeatured(featuredSpot)}
              className="group relative flex-1 min-h-[380px] lg:min-h-[460px] rounded-[4px] p-6 sm:p-8 bg-gradient-to-br from-[#FAF8F3] via-[#F5EFE3] to-[#EBE0CD] border border-[#DDD5C5] cursor-pointer shadow-[0_8px_24px_-4px_rgba(15,56,42,0.1)] flex flex-col justify-between hover:border-[#79A28F] transition-all"
            >
              {/* Oversized background quotation mark */}
              <span
                aria-hidden="true"
                className="absolute -top-6 left-6 text-9xl font-serif text-[#0F382A]/10 pointer-events-none select-none font-bold"
              >
                “
              </span>

              {/* Top Curator Ribbon */}
              <div className="relative z-10 flex items-center justify-between gap-2 flex-wrap mb-4">
                <span className="px-3 py-1 bg-[#0F382A] text-white text-[11px] font-semibold uppercase tracking-wider rounded-full shadow-2xs">
                  Featured Diner Review
                </span>
                <span className="text-xs font-mono font-semibold text-[#0F382A] bg-white/80 backdrop-blur-xs px-2.5 py-1 rounded-sm border border-[#D5CFC3]">
                  {featuredSpot.neighborhood} · {featuredSpot.heartland || 'East Heartland'}
                </span>
              </div>

              {/* Central Customer Voice Callout */}
              <div className="relative z-10 my-auto py-2">
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center text-[#F5A623]">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i} className="text-base">★</span>
                    ))}
                  </div>
                  <span className="font-mono text-sm font-bold text-[#1B2421]">5.0</span>
                  <span className="text-xs font-mono text-[#5A6C64]">
                    ({featuredSpot.reviewsCount.toLocaleString()} verified diner reviews)
                  </span>
                </div>

                <blockquote className="font-serif text-xl sm:text-2xl font-semibold italic text-[#0F382A] leading-snug mb-4 group-hover:text-[#1B2421] transition-colors">
                  “Bedok 85’s soupy bak chor mee broth has an unmatched aroma from roasted sole fish and slow-boiled pork bones. Best midnight supper on the island.”
                </blockquote>

                <div className="p-3 bg-white/80 rounded border border-[#E2DDD3] space-y-1 text-xs">
                  <p className="text-[11px] font-semibold text-[#891D00] uppercase tracking-wider">
                    Recommended Order by Diners:
                  </p>
                  <p className="font-medium text-[#1B2421]">
                    {featuredSpot.mustTryDishes?.slice(0, 3).join(' · ') || 'Signature Minced Meat Noodles Soup ($5.00)'}
                  </p>
                </div>
              </div>

              {/* Bottom Customer Profile & Action */}
              <div className="relative z-10 pt-4 border-t border-[#DDD5C5] flex items-center justify-between text-xs text-[#5A6C64]">
                <div>
                  <p className="font-semibold text-[#1B2421] text-xs">
                    Uncle Desmond & Cheryl
                  </p>
                  <p className="text-[10px] text-[#0F382A] font-medium">
                    Bedok Residents (15 Yrs) · Verified Local Diners
                  </p>
                </div>

                <span className="font-semibold text-[#0F382A] group-hover:underline flex items-center gap-1 shrink-0">
                  Read all reviews <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
