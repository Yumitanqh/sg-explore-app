import React, { useState } from 'react';
import { Bookmark, Volume2, VolumeX, Sparkles, Server } from 'lucide-react';
import { soundscape } from '../utils/soundscapes';

interface TopBarProps {
  activeTab: 'discover' | 'itineraries' | 'map' | 'cinema' | 'saved';
  onSelectTab: (tab: 'discover' | 'itineraries' | 'map' | 'cinema' | 'saved') => void;
  savedCount: number;
  onOpenSavedDrawer: () => void;
  onOpenApiDiagnostics?: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  activeTab,
  onSelectTab,
  savedCount,
  onOpenSavedDrawer,
  onOpenApiDiagnostics,
}) => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  const toggleSound = () => {
    if (isAudioPlaying) {
      soundscape.stop();
      setIsAudioPlaying(false);
    } else {
      soundscape.startRainSoundscape(0.2);
      setIsAudioPlaying(true);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FBF9F5]/90 backdrop-blur-md border-b border-[#E8E4DC]">
      <div className="max-w-[1320px] mx-auto px-6 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element in Playfair Display) */}
        <button
          onClick={() => onSelectTab('discover')}
          className="text-left group cursor-pointer focus-visible:outline-none shrink-0"
        >
          <span className="font-serif text-2xl lg:text-[28px] font-semibold tracking-tight text-[#0F382A] group-hover:text-[#1B2421] transition-colors whitespace-nowrap">
            Botanical Voyage
          </span>
        </button>

        {/* Zone 2: 4–5 single-line clean nav links */}
        <nav className="hidden md:flex items-center gap-8 text-[15px] font-medium text-[#5A6C64]">
          <button
            onClick={() => onSelectTab('discover')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 relative ${
              activeTab === 'discover'
                ? 'text-[#0F382A] font-semibold'
                : 'hover:text-[#1B2421]'
            }`}
          >
            Discoveries
            {activeTab === 'discover' && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#0F382A] rounded-full" />
            )}
          </button>

          <button
            onClick={() => onSelectTab('itineraries')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 relative ${
              activeTab === 'itineraries'
                ? 'text-[#0F382A] font-semibold'
                : 'hover:text-[#1B2421]'
            }`}
          >
            Curated Itineraries
            {activeTab === 'itineraries' && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#0F382A] rounded-full" />
            )}
          </button>

          <button
            onClick={() => onSelectTab('map')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 relative ${
              activeTab === 'map'
                ? 'text-[#0F382A] font-semibold'
                : 'hover:text-[#1B2421]'
            }`}
          >
            Living Map
            {activeTab === 'map' && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#0F382A] rounded-full" />
            )}
          </button>

          <button
            onClick={() => onSelectTab('cinema')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 relative ${
              activeTab === 'cinema'
                ? 'text-[#0F382A] font-semibold'
                : 'hover:text-[#1B2421]'
            }`}
          >
            Visual Cinema
            {activeTab === 'cinema' && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#0F382A] rounded-full" />
            )}
          </button>

          <button
            onClick={() => onSelectTab('saved')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 relative flex items-center gap-1.5 ${
              activeTab === 'saved'
                ? 'text-[#0F382A] font-semibold'
                : 'hover:text-[#1B2421]'
            }`}
          >
            Saved Voyage
            {savedCount > 0 && (
              <span className="text-xs bg-[#0F382A] text-white px-1.5 py-0.2 rounded-full font-mono">
                {savedCount}
              </span>
            )}
            {activeTab === 'saved' && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#0F382A] rounded-full" />
            )}
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action + Ambient Garden Sound Toggle + API Tester */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Serverless API Diagnostics */}
          {onOpenApiDiagnostics && (
            <button
              onClick={onOpenApiDiagnostics}
              title="Inspect Serverless APIs (OneMap, YouTube v3, Books, Fonts)"
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-full border border-[#E8E4DC] bg-white text-[#5A6C64] hover:text-[#0F382A] hover:border-[#0F382A] transition-all cursor-pointer"
            >
              <Server className="w-3.5 h-3.5 text-[#0F382A]" />
              <span className="hidden sm:inline font-mono">/api</span>
            </button>
          )}

          {/* Subtle Ambient Soundscape Toggle */}
          <button
            onClick={toggleSound}
            title={isAudioPlaying ? 'Mute Garden Rain Ambience' : 'Play Botanical Garden Petrichor Ambience'}
            className={`flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-full border transition-all cursor-pointer ${
              isAudioPlaying
                ? 'bg-[#0F382A] text-[#FBF9F5] border-[#0F382A] shadow-sm'
                : 'bg-white text-[#5A6C64] border-[#E8E4DC] hover:border-[#0F382A] hover:text-[#0F382A]'
            }`}
          >
            {isAudioPlaying ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-[#F26440] animate-pulse" />
                <span className="hidden sm:inline">Canopy Mist Sound</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 opacity-60" />
                <span className="hidden sm:inline">Soundscape</span>
              </>
            )}
          </button>

          {/* Primary CTA */}
          <button
            onClick={onOpenSavedDrawer}
            className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold tracking-wide uppercase text-white bg-[#0F382A] rounded-[4px] hover:bg-[#1B2421] transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#F5A623]" />
            <span className="whitespace-nowrap">Plan My Voyage</span>
          </button>
        </div>
      </div>

      {/* Mobile navigation tab strip */}
      <div className="md:hidden flex items-center justify-around px-4 py-2 border-t border-[#E8E4DC] bg-[#FBF9F5] text-xs font-medium text-[#5A6C64]">
        <button
          onClick={() => onSelectTab('discover')}
          className={`py-1 ${activeTab === 'discover' ? 'text-[#0F382A] font-bold border-b-2 border-[#0F382A]' : ''}`}
        >
          Discover
        </button>
        <button
          onClick={() => onSelectTab('itineraries')}
          className={`py-1 ${activeTab === 'itineraries' ? 'text-[#0F382A] font-bold border-b-2 border-[#0F382A]' : ''}`}
        >
          Itineraries
        </button>
        <button
          onClick={() => onSelectTab('map')}
          className={`py-1 ${activeTab === 'map' ? 'text-[#0F382A] font-bold border-b-2 border-[#0F382A]' : ''}`}
        >
          Map
        </button>
        <button
          onClick={() => onSelectTab('cinema')}
          className={`py-1 ${activeTab === 'cinema' ? 'text-[#0F382A] font-bold border-b-2 border-[#0F382A]' : ''}`}
        >
          Cinema
        </button>
        <button
          onClick={() => onSelectTab('saved')}
          className={`py-1 flex items-center gap-1 ${activeTab === 'saved' ? 'text-[#0F382A] font-bold border-b-2 border-[#0F382A]' : ''}`}
        >
          <Bookmark className="w-3.5 h-3.5" />
          <span>Saved ({savedCount})</span>
        </button>
      </div>
    </header>
  );
};
