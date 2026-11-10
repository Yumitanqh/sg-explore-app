import React, { useState, useEffect, useMemo } from 'react';
import { DISCOVERY_SPOTS, DiscoverySpot, NEIGHBORHOODS } from './data/discoveries';
import { CURATED_ITINERARIES } from './data/itineraries';
import { VIDEO_ESSAYS, VideoEssay } from './data/videos';
import { TopBar } from './components/TopBar';
import { EditorialHero } from './components/EditorialHero';
import { CategoryFilters } from './components/CategoryFilters';
import { DiscoveryCard } from './components/DiscoveryCard';
import { VideoCard } from './components/VideoCard';
import { InteractiveMap } from './components/InteractiveMap';
import { ItineraryTimeline } from './components/ItineraryTimeline';
import { SpotDetailModal } from './components/SpotDetailModal';
import { VideoPlayerModal } from './components/VideoPlayerModal';
import { SavedVoyageDrawer } from './components/SavedVoyageDrawer';
import { ApiDiagnosticsModal } from './components/ApiDiagnosticsModal';
import { Search, Compass, Sparkles, Filter, MapPin, ArrowRight, BookOpen, Layers, Server } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'discover' | 'itineraries' | 'map' | 'cinema' | 'saved'>('discover');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string>('All Neighborhoods');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals & Drawers
  const [activeSpotDetail, setActiveSpotDetail] = useState<DiscoverySpot | null>(null);
  const [activeVideoPlayer, setActiveVideoPlayer] = useState<VideoEssay | null>(null);
  const [isSavedDrawerOpen, setIsSavedDrawerOpen] = useState<boolean>(false);
  const [isApiDiagnosticsOpen, setIsApiDiagnosticsOpen] = useState<boolean>(false);

  // Saved Bookmarks with LocalStorage
  const [savedSpotIds, setSavedSpotIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('botanical_saved_voyage');
      return stored ? JSON.parse(stored) : ['cloud-forest-flower-dome', 'joo-chiat-peranakan-shophouses'];
    } catch {
      return ['cloud-forest-flower-dome', 'joo-chiat-peranakan-shophouses'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('botanical_saved_voyage', JSON.stringify(savedSpotIds));
    } catch {
      // storage quota or private browsing
    }
  }, [savedSpotIds]);

  const toggleSaveSpot = (spotId: string) => {
    setSavedSpotIds((prev) =>
      prev.includes(spotId) ? prev.filter((id) => id !== spotId) : [...prev, spotId]
    );
  };

  const handleClearAllSaved = () => {
    setSavedSpotIds([]);
  };

  const savedSpots = useMemo(() => {
    return DISCOVERY_SPOTS.filter((spot) => savedSpotIds.includes(spot.id));
  }, [savedSpotIds]);

  // Filtered discoveries
  const filteredSpots = useMemo(() => {
    return DISCOVERY_SPOTS.filter((spot) => {
      const matchesCategory = selectedCategory === 'all' || spot.category === selectedCategory;
      const matchesNeighborhood =
        selectedNeighborhood === 'All Neighborhoods' || spot.neighborhood === selectedNeighborhood;
      const matchesQuery =
        !searchQuery ||
        spot.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        spot.neighborhood.toLowerCase().includes(searchQuery.toLowerCase()) ||
        spot.editorialSubtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        spot.sensory.aroma.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesNeighborhood && matchesQuery;
    });
  }, [selectedCategory, selectedNeighborhood, searchQuery]);

  const featuredSpot = DISCOVERY_SPOTS[0];

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F5] text-[#1B2421] selection:bg-[#0F382A] selection:text-[#FBF9F5]">
      {/* 3-Zone Top Navigation Contract */}
      <TopBar
        activeTab={activeTab}
        onSelectTab={(tab) => {
          if (tab === 'saved') {
            setIsSavedDrawerOpen(true);
          } else {
            setActiveTab(tab);
          }
        }}
        savedCount={savedSpotIds.length}
        onOpenSavedDrawer={() => setIsSavedDrawerOpen(true)}
        onOpenApiDiagnostics={() => setIsApiDiagnosticsOpen(true)}
      />

      <main className="flex-1">
        {/* VIEW 1: DISCOVER SCREEN */}
        {activeTab === 'discover' && (
          <div>
            {/* Editorial Hero */}
            <EditorialHero
              onExploreClick={() => {
                const el = document.getElementById('curated-catalog');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              onSelectFeatured={(spot) => setActiveSpotDetail(spot)}
              featuredSpot={featuredSpot}
            />

            {/* Catalog Discovery Section */}
            <section id="curated-catalog" className="max-w-[1320px] mx-auto px-6 py-12">
              {/* Filter & Search Bar */}
              <div className="space-y-4 mb-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  {/* Category Pills */}
                  <div className="flex-1 min-w-0">
                    <CategoryFilters
                      selectedCategory={selectedCategory}
                      onSelectCategory={(cat) => setSelectedCategory(cat)}
                    />
                  </div>

                  {/* Neighborhood Selector & Search Input */}
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="relative">
                      <select
                        value={selectedNeighborhood}
                        onChange={(e) => setSelectedNeighborhood(e.target.value)}
                        className="appearance-none bg-white border border-[#E8E4DC] text-xs font-semibold text-[#1B2421] rounded-full pl-3.5 pr-8 py-2 focus:outline-none focus:border-[#0F382A] cursor-pointer"
                      >
                        {NEIGHBORHOODS.map((nh) => (
                          <option key={nh} value={nh}>
                            {nh}
                          </option>
                        ))}
                      </select>
                      <MapPin className="w-3.5 h-3.5 text-[#5A6C64] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>

                    <div className="relative">
                      <Search className="w-3.5 h-3.5 text-[#5A6C64] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search botanicals, laksa, MRT..."
                        className="bg-white border border-[#E8E4DC] text-xs rounded-full pl-9 pr-4 py-2 w-48 sm:w-64 focus:outline-none focus:border-[#0F382A] placeholder:text-[#5A6C64]/70"
                      />
                    </div>
                  </div>
                </div>

                {/* Filter Status Line */}
                <div className="flex items-center justify-between text-xs text-[#5A6C64] pt-2 border-t border-[#E8E4DC]">
                  <span>
                    Displaying <strong>{filteredSpots.length}</strong> curated destinations
                    {selectedNeighborhood !== 'All Neighborhoods' && ` in ${selectedNeighborhood}`}
                    {selectedCategory !== 'all' && ` · ${selectedCategory}`}
                  </span>
                  {(selectedCategory !== 'all' || selectedNeighborhood !== 'All Neighborhoods' || searchQuery) && (
                    <button
                      onClick={() => {
                        setSelectedCategory('all');
                        setSelectedNeighborhood('All Neighborhoods');
                        setSearchQuery('');
                      }}
                      className="text-[#0F382A] font-semibold hover:underline cursor-pointer"
                    >
                      Reset filters
                    </button>
                  )}
                </div>
              </div>

              {/* Discovery Cards Responsive Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {filteredSpots.map((spot, index) => (
                  <DiscoveryCard
                    key={spot.id}
                    spot={spot}
                    isSaved={savedSpotIds.includes(spot.id)}
                    onToggleSave={toggleSaveSpot}
                    onSelectSpot={(s) => setActiveSpotDetail(s)}
                    aspectRatio={index === 0 ? '16:9' : '4:3'}
                  />
                ))}
              </div>

              {filteredSpots.length === 0 && (
                <div className="text-center py-16 bg-white border border-[#E8E4DC] rounded-[4px] p-8">
                  <Compass className="w-10 h-10 text-[#5A6C64] mx-auto mb-3" />
                  <h4 className="font-serif text-lg font-semibold text-[#1B2421] mb-1">
                    No sanctuaries match your criteria
                  </h4>
                  <p className="text-xs text-[#5A6C64] mb-4">
                    Try broadening your neighborhood filter or resetting search terms.
                  </p>
                  <button
                    onClick={() => {
                      setSelectedCategory('all');
                      setSelectedNeighborhood('All Neighborhoods');
                      setSearchQuery('');
                    }}
                    className="px-4 py-2 bg-[#0F382A] text-white text-xs font-semibold rounded-[4px] cursor-pointer"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}

              {/* Curatorial Pull Quote */}
              <div className="my-16 py-12 border-y border-[#E8E4DC] text-center max-w-3xl mx-auto">
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#5A6C64] block mb-3">
                  Philosophy of the Garden City
                </span>
                <blockquote className="font-serif text-2xl lg:text-3xl text-[#0F382A] italic leading-snug mb-4">
                  “Nature in Singapore is never an amenity kept outside the gates. It is the living architectural tissue binding the tropical sky to human cadence.”
                </blockquote>
                <cite className="text-xs font-sans not-italic text-[#5A6C64] font-medium">
                  — The Curatorial Board · Botanical Voyage Singapore Dispatch
                </cite>
              </div>

              {/* Visual Cinema Preview Section */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#5A6C64] block">
                      Motion & Sound
                    </span>
                    <h2 className="font-serif text-2xl font-semibold text-[#0F382A]">
                      Visual Essays & Documentaries
                    </h2>
                  </div>

                  <button
                    onClick={() => setActiveTab('cinema')}
                    className="text-xs font-semibold text-[#0F382A] hover:text-[#F26440] transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span>View All Film Essays</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {VIDEO_ESSAYS.map((video) => (
                    <VideoCard
                      key={video.id}
                      video={video}
                      onPlayVideo={(v) => setActiveVideoPlayer(v)}
                    />
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}

        {/* VIEW 2: CURATED ITINERARIES SCREEN */}
        {activeTab === 'itineraries' && (
          <section className="max-w-[1320px] mx-auto px-6 py-10">
            <ItineraryTimeline
              itineraries={CURATED_ITINERARIES}
              onOpenSpotDetail={(spot) => setActiveSpotDetail(spot)}
              onPlanCustomTrip={() => setIsSavedDrawerOpen(true)}
            />
          </section>
        )}

        {/* VIEW 3: LIVING MAP EXPLORER SCREEN */}
        {activeTab === 'map' && (
          <section className="max-w-[1320px] mx-auto px-6 py-10">
            <InteractiveMap
              spots={DISCOVERY_SPOTS}
              selectedSpot={activeSpotDetail}
              onSelectSpot={(spot) => setActiveSpotDetail(spot)}
              onOpenDetailModal={(spot) => setActiveSpotDetail(spot)}
            />
          </section>
        )}

        {/* VIEW 4: VISUAL CINEMA SCREEN */}
        {activeTab === 'cinema' && (
          <section className="max-w-[1320px] mx-auto px-6 py-10 space-y-8">
            <div className="border-b border-[#E8E4DC] pb-6">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#5A6C64] block mb-1">
                Cinematic Field Dispatches
              </span>
              <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-[#0F382A] mb-3">
                Botanical Cinema & Cultural Documentaries
              </h2>
              <p className="text-sm text-[#5A6C64] max-w-2xl leading-relaxed">
                Step inside high-resolution film essays detailing architectural biomimicry, generational hawker master recipes, and Straits Chinese shophouse preservation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {VIDEO_ESSAYS.map((video) => (
                <VideoCard
                  key={video.id}
                  video={video}
                  onPlayVideo={(v) => setActiveVideoPlayer(v)}
                />
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Spot Detail Modal */}
      <SpotDetailModal
        spot={activeSpotDetail}
        onClose={() => setActiveSpotDetail(null)}
        isSaved={activeSpotDetail ? savedSpotIds.includes(activeSpotDetail.id) : false}
        onToggleSave={toggleSaveSpot}
      />

      {/* Video Player Modal */}
      <VideoPlayerModal
        video={activeVideoPlayer}
        onClose={() => setActiveVideoPlayer(null)}
      />

      {/* Saved Voyage Slide-Over Drawer */}
      <SavedVoyageDrawer
        isOpen={isSavedDrawerOpen}
        onClose={() => setIsSavedDrawerOpen(false)}
        savedSpots={savedSpots}
        onRemoveSaved={toggleSaveSpot}
        onSelectSpot={(s) => setActiveSpotDetail(s)}
        onClearAll={handleClearAllSaved}
      />

      {/* Serverless API Diagnostics Modal */}
      <ApiDiagnosticsModal
        isOpen={isApiDiagnosticsOpen}
        onClose={() => setIsApiDiagnosticsOpen(false)}
      />

      {/* Quiet Minimalist Editorial Footer */}
      <footer className="mt-16 border-t border-[#E8E4DC] bg-white py-10">
        <div className="max-w-[1320px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-[#5A6C64]">
          <div className="flex items-center gap-3">
            <span className="font-serif font-bold text-base text-[#0F382A]">Botanical Voyage</span>
            <span aria-hidden="true" className="text-[#E8E4DC]">·</span>
            <span>Singapore Heritage & Horticultural Archive</span>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => setActiveTab('discover')}
              className="hover:text-[#0F382A] transition-colors cursor-pointer"
            >
              Discoveries
            </button>
            <button
              onClick={() => setActiveTab('itineraries')}
              className="hover:text-[#0F382A] transition-colors cursor-pointer"
            >
              Itineraries
            </button>
            <button
              onClick={() => setActiveTab('map')}
              className="hover:text-[#0F382A] transition-colors cursor-pointer"
            >
              Living Map
            </button>
            <button
              onClick={() => setIsSavedDrawerOpen(true)}
              className="hover:text-[#0F382A] transition-colors cursor-pointer"
            >
              Saved ({savedSpotIds.length})
            </button>
            <button
              onClick={() => setIsApiDiagnosticsOpen(true)}
              className="hover:text-[#0F382A] transition-colors cursor-pointer font-mono text-[11px] flex items-center gap-1 text-[#0F382A] bg-[#F5F3EF] px-2.5 py-1 rounded-full border border-[#E8E4DC]"
            >
              <Server className="w-3 h-3" />
              <span>/api tester</span>
            </button>
          </div>

          <p className="font-mono text-[11px] text-[#5A6C64]">
            © 2026 Botanical Voyage. Published for the mindful explorer.
          </p>
        </div>
      </footer>
    </div>
  );
}
