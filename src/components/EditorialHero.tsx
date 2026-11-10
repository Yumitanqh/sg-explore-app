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

          {/* Right Lead Visual Column (5 cols) */}
          <div className="lg:col-span-5 flex flex-col">
            <div
              onClick={() => onSelectFeatured(featuredSpot)}
              className="group relative flex-1 min-h-[380px] lg:min-h-[460px] rounded-[4px] overflow-hidden border border-[#E8E4DC] cursor-pointer shadow-[0_8px_24px_-4px_rgba(15,56,42,0.1)]"
            >
              <img
                src={featuredSpot.image}
                alt={featuredSpot.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              {/* Top Curator Ribbon */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <span className="px-3 py-1 bg-[#F26440] text-white text-[11px] font-semibold uppercase tracking-wider rounded-full shadow-sm">
                  Curator’s Selection
                </span>
                <span className="text-xs font-mono text-white/90 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-sm border border-white/20">
                  {featuredSpot.neighborhood}
                </span>
              </div>

              {/* Bottom Lead Capsule */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[11px] font-mono uppercase text-[#A5D0BC] tracking-wider block mb-1">
                  Spotlight Story
                </span>
                <h3 className="font-serif text-2xl font-semibold leading-snug group-hover:text-[#A5D0BC] transition-colors mb-2">
                  {featuredSpot.title}
                </h3>
                <p className="text-xs text-white/80 line-clamp-2 leading-relaxed">
                  {featuredSpot.editorialSubtitle}
                </p>

                <div className="mt-3 pt-3 border-t border-white/20 flex items-center justify-between text-xs text-white/90">
                  <span className="font-mono text-[11px]">
                    Rating {featuredSpot.rating} ★ ({featuredSpot.reviewsCount.toLocaleString()})
                  </span>
                  <span className="font-semibold underline underline-offset-4 flex items-center gap-1 group-hover:text-[#A5D0BC]">
                    Read Story <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
