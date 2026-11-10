import React, { useState, useEffect, useMemo } from 'react';
import { DISCOVERY_SPOTS, DiscoverySpot, NEIGHBORHOODS } from './data/discoveries';
import { CURATED_ITINERARIES } from './data/itineraries';
import { PHOTO_STORIES, PhotoStory } from './data/photoStories';
import { TopBar } from './components/TopBar';
import { EditorialHero } from './components/EditorialHero';
import { CategoryFilters } from './components/CategoryFilters';
import { DiscoveryCard } from './components/DiscoveryCard';
import { PhotoStoryCard } from './components/PhotoStoryCard';
import { InteractiveMap } from './components/InteractiveMap';
import { ItineraryTimeline } from './components/ItineraryTimeline';
import { CustomItineraryBuilder } from './components/CustomItineraryBuilder';
import { SpotDetailModal } from './components/SpotDetailModal';
import { PhotoGalleryModal } from './components/PhotoGalleryModal';
import { SavedVoyageDrawer } from './components/SavedVoyageDrawer';
import { ApiDiagnosticsModal } from './components/ApiDiagnosticsModal';
import { EducationalTour } from './components/EducationalTour';
import { Search, Compass, Sparkles, Filter, MapPin, ArrowRight, BookOpen, Layers, Server, Plus, Utensils, Check, Calendar, HelpCircle, Navigation, Camera, MessageSquareQuote } from 'lucide-react';

interface OneMapSearchResult {
  SEARCHVAL: string;
  BLK_NO?: string;
  ROAD_NAME?: string;
  BUILDING?: string;
  ADDRESS?: string;
  POSTAL?: string;
  X?: string;
  Y?: string;
  LATITUDE?: string;
  LONGITUDE?: string;
}

export default function App() {
  const [activeTab, setActiveTab] = useState<'discover' | 'itineraries' | 'map' | 'photos' | 'saved'>('discover');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string>('All Singapore Areas');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals & Drawers
  const [activeSpotDetail, setActiveSpotDetail] = useState<DiscoverySpot | null>(null);
  const [activePhotoStory, setActivePhotoStory] = useState<PhotoStory | null>(null);
  const [isSavedDrawerOpen, setIsSavedDrawerOpen] = useState<boolean>(false);
  const [isApiDiagnosticsOpen, setIsApiDiagnosticsOpen] = useState<boolean>(false);

  // Educational Guided Tour (auto-opens on first use)
  const [isEducationalTourOpen, setIsEducationalTourOpen] = useState<boolean>(() => {
    try {
      return localStorage.getItem('botanical_tour_completed') !== 'true';
    } catch {
      return true;
    }
  });

  // Itinerary View Mode ('curated' vs 'custom')
  const [itineraryMode, setItineraryMode] = useState<'curated' | 'custom'>('curated');

  // Custom Itinerary Selected Spots
  const [customItinerarySpotIds, setCustomItinerarySpotIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('botanical_custom_itinerary');
      return stored
        ? JSON.parse(stored)
        : ['bedok-85-fengshan-market', 'bedok-interchange-hawker-centre', 'percolate-bedok-cafe'];
    } catch {
      return ['bedok-85-fengshan-market', 'bedok-interchange-hawker-centre', 'percolate-bedok-cafe'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('botanical_custom_itinerary', JSON.stringify(customItinerarySpotIds));
    } catch {
      // quota
    }
  }, [customItinerarySpotIds]);

  const toggleItinerarySpot = (spotId: string) => {
    setCustomItinerarySpotIds((prev) =>
      prev.includes(spotId) ? prev.filter((id) => id !== spotId) : [...prev, spotId]
    );
  };

  // Saved Bookmarks with LocalStorage
  const [savedSpotIds, setSavedSpotIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('botanical_saved_voyage');
      return stored ? JSON.parse(stored) : ['bedok-85-fengshan-market', 'cloud-forest-flower-dome', 'joo-chiat-peranakan-shophouses'];
    } catch {
      return ['bedok-85-fengshan-market', 'cloud-forest-flower-dome', 'joo-chiat-peranakan-shophouses'];
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

  const customItinerarySpots = useMemo(() => {
    return DISCOVERY_SPOTS.filter((spot) => customItinerarySpotIds.includes(spot.id));
  }, [customItinerarySpotIds]);

  // Live OneMap search results
  const [oneMapLiveResults, setOneMapLiveResults] = useState<OneMapSearchResult[]>([]);
  const [isSearchingOneMap, setIsSearchingOneMap] = useState<boolean>(false);

  const handleExecuteOneMapSearch = async (val: string) => {
    if (!val.trim()) {
      setOneMapLiveResults([]);
      return;
    }
    setIsSearchingOneMap(true);
    try {
      const res = await fetch(`/api/onemap?action=search&searchVal=${encodeURIComponent(val)}&returnGeom=Y&getAddrDetails=Y`);
      if (res.ok) {
        const data = await res.json();
        if (data && Array.isArray(data.results)) {
          setOneMapLiveResults(data.results.slice(0, 5));
        } else {
          setOneMapLiveResults([]);
        }
      } else {
        setOneMapLiveResults([]);
      }
    } catch {
      setOneMapLiveResults([]);
    } finally {
      setIsSearchingOneMap(false);
    }
  };

  // Filtered discoveries across all Singapore places (hawkers, heartlands, bakes, nature)
  const filteredSpots = useMemo(() => {
    return DISCOVERY_SPOTS.filter((spot) => {
      const matchesCategory = selectedCategory === 'all' || spot.category === selectedCategory;
      const matchesNeighborhood =
        selectedNeighborhood === 'All Singapore Areas' ||
        spot.neighborhood.toLowerCase().includes(selectedNeighborhood.toLowerCase()) ||
        (spot.heartland && spot.heartland.toLowerCase() === selectedNeighborhood.toLowerCase());

      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        spot.title.toLowerCase().includes(q) ||
        spot.neighborhood.toLowerCase().includes(q) ||
        (spot.heartland && spot.heartland.toLowerCase().includes(q)) ||
        spot.editorialSubtitle.toLowerCase().includes(q) ||
        spot.description.toLowerCase().includes(q) ||
        spot.sensory.aroma.toLowerCase().includes(q) ||
        (spot.mustTryDishes && spot.mustTryDishes.some((dish) => dish.toLowerCase().includes(q))) ||
        (spot.reviews && spot.reviews.some((r) => r.comment.toLowerCase().includes(q) || r.author.toLowerCase().includes(q) || (r.visitedDishOrActivity && r.visitedDishOrActivity.toLowerCase().includes(q))));

      return matchesCategory && matchesNeighborhood && matchesQuery;
    });
  }, [selectedCategory, selectedNeighborhood, searchQuery]);

  const featuredSpot = DISCOVERY_SPOTS[0]; // Bedok 85 Fengshan Market

  // Quick search keywords
  const QUICK_SEARCH_CHIPS = [
    { label: 'Khatib Chong Pang & Laksa', query: 'Khatib' },
    { label: 'Canberra Hot Spring & Hub', query: 'Canberra' },
    { label: 'Popular Bedok Food', query: 'Bedok' },
    { label: 'Toa Payoh Carrot Cake', query: 'Toa Payoh' },
    { label: 'Tampines Hawkers', query: 'Tampines' },
    { label: 'Old Airport Road', query: 'Old Airport Road' },
    { label: 'Tiong Bahru Bakes', query: 'Tiong Bahru' },
    { label: 'Katong Laksa', query: 'Katong' },
    { label: 'Chinatown', query: 'Chinatown' }
  ];

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
        onOpenEducationalTour={() => setIsEducationalTourOpen(true)}
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
            <section id="curated-catalog" className="max-w-[1320px] mx-auto px-6 py-10">
              {/* Universal Singapore Search Bar Container */}
              <div className="bg-white border border-[#E8E4DC] rounded-[4px] p-6 mb-8 shadow-xs space-y-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#0F382A] mb-1 font-semibold">
                    <Navigation className="w-3.5 h-3.5 text-[#F26440]" />
                    <span>Universal Singapore Search · All Heartland & Local Food Places</span>
                  </div>
                  <h2 className="font-serif text-2xl lg:text-3xl font-semibold text-[#1B2421]">
                    Key in any place or neighborhood in Singapore
                  </h2>
                  <p className="text-xs text-[#5A6C64] mt-0.5">
                    Not limited to tourist spots—search Bedok for famous soupy bak chor mee, Toa Payoh for crispy carrot cake, or any heartland gem.
                  </p>
                </div>

                {/* Primary Search Input Row */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-[#5A6C64] absolute left-4 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        if (e.target.value.length > 3) {
                          handleExecuteOneMapSearch(e.target.value);
                        } else {
                          setOneMapLiveResults([]);
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleExecuteOneMapSearch(searchQuery);
                        }
                      }}
                      placeholder="Type Bedok, Tampines, Laksa, Toa Payoh, Carrot Cake, Reservoir..."
                      className="w-full pl-11 pr-4 py-3 bg-[#FBF9F5] border border-[#E8E4DC] rounded-[4px] text-sm text-[#1B2421] placeholder:text-[#5A6C64]/70 focus:outline-none focus:border-[#0F382A] focus:bg-white transition-all"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => {
                          setSearchQuery('');
                          setOneMapLiveResults([]);
                        }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#5A6C64] hover:text-[#1B2421] cursor-pointer"
                      >
                        Clear
                      </button>
                    )}
                  </div>

                  {/* Neighborhood Area Selector */}
                  <div className="relative sm:w-56 shrink-0">
                    <select
                      value={selectedNeighborhood}
                      onChange={(e) => setSelectedNeighborhood(e.target.value)}
                      className="w-full appearance-none bg-[#FBF9F5] border border-[#E8E4DC] text-xs font-semibold text-[#1B2421] rounded-[4px] pl-3.5 pr-8 py-3 focus:outline-none focus:border-[#0F382A] cursor-pointer"
                    >
                      {NEIGHBORHOODS.map((nh) => (
                        <option key={nh} value={nh}>
                          {nh}
                        </option>
                      ))}
                    </select>
                    <MapPin className="w-3.5 h-3.5 text-[#5A6C64] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>

                  <button
                    onClick={() => handleExecuteOneMapSearch(searchQuery)}
                    className="px-6 py-3 bg-[#0F382A] text-white text-xs font-semibold uppercase tracking-wider rounded-[4px] hover:bg-[#1B2421] transition-all cursor-pointer whitespace-nowrap"
                  >
                    Search
                  </button>
                </div>

                {/* Quick Heartland Filter Chips */}
                <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                  <span className="font-semibold text-[#0F382A] text-[11px] uppercase tracking-wider">
                    Quick Discover:
                  </span>
                  {QUICK_SEARCH_CHIPS.map((chip) => (
                    <button
                      key={chip.label}
                      onClick={() => {
                        setSearchQuery(chip.query);
                        setSelectedNeighborhood('All Singapore Areas');
                      }}
                      className={`px-3 py-1 rounded-full border text-[11px] font-medium transition-all cursor-pointer ${
                        searchQuery.toLowerCase() === chip.query.toLowerCase()
                          ? 'bg-[#0F382A] text-white border-[#0F382A]'
                          : 'bg-white border-[#E8E4DC] text-[#414844] hover:border-[#0F382A] hover:bg-[#F5F3EF]'
                      }`}
                    >
                      {chip.label}
                    </button>
                  ))}
                </div>

                {/* Live OneMap Geocoder Autocomplete preview if available */}
                {oneMapLiveResults.length > 0 && (
                  <div className="p-3 bg-[#FBF9F5] border border-[#E8E4DC] rounded-[4px] space-y-2 text-xs">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#0F382A] block font-semibold">
                      OneMap Official Singapore Addresses ({oneMapLiveResults.length} matches):
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {oneMapLiveResults.map((om, idx) => (
                        <div
                          key={idx}
                          onClick={() => setSearchQuery(om.ROAD_NAME || om.SEARCHVAL)}
                          className="p-2 bg-white border border-[#E8E4DC] rounded hover:border-[#0F382A] cursor-pointer"
                        >
                          <p className="font-semibold text-[#1B2421] truncate">{om.SEARCHVAL}</p>
                          <p className="text-[11px] text-[#5A6C64] truncate">{om.ADDRESS} (Postal {om.POSTAL})</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Category Pills Strip */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <CategoryFilters
                      selectedCategory={selectedCategory}
                      onSelectCategory={(cat) => setSelectedCategory(cat)}
                    />
                  </div>

                  {/* Create My Own Itinerary Shortcut Button */}
                  <button
                    onClick={() => {
                      setActiveTab('itineraries');
                      setItineraryMode('custom');
                    }}
                    className="hidden sm:flex items-center gap-1.5 px-4 py-2 bg-[#F26440] text-white text-xs font-semibold rounded-[4px] hover:bg-[#ad3313] transition-all cursor-pointer shadow-xs shrink-0 ml-4"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Create My Own Itinerary</span>
                  </button>
                </div>

                {/* Filter Status Line */}
                <div className="flex items-center justify-between text-xs text-[#5A6C64] pt-2 border-t border-[#E8E4DC]">
                  <span>
                    Showing <strong>{filteredSpots.length}</strong> verified Singapore spots
                    {selectedNeighborhood !== 'All Singapore Areas' && ` in ${selectedNeighborhood}`}
                    {searchQuery && ` matching "${searchQuery}"`}
                  </span>

                  {(selectedCategory !== 'all' || selectedNeighborhood !== 'All Singapore Areas' || searchQuery) && (
                    <button
                      onClick={() => {
                        setSelectedCategory('all');
                        setSelectedNeighborhood('All Singapore Areas');
                        setSearchQuery('');
                        setOneMapLiveResults([]);
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
                    onAddToItinerary={(s) => toggleItinerarySpot(s.id)}
                    isInItinerary={customItinerarySpotIds.includes(spot.id)}
                    aspectRatio={index === 0 ? '16:9' : '4:3'}
                  />
                ))}
              </div>

              {/* Empty Search Fallback */}
              {filteredSpots.length === 0 && (
                <div className="text-center py-16 bg-white border border-[#E8E4DC] rounded-[4px] p-8">
                  <Compass className="w-10 h-10 text-[#5A6C64] mx-auto mb-3" />
                  <h4 className="font-serif text-lg font-semibold text-[#1B2421] mb-1">
                    No places found for "{searchQuery}"
                  </h4>
                  <p className="text-xs text-[#5A6C64] mb-4 max-w-md mx-auto">
                    We have curated heartland recommendations across northern, eastern, and central Singapore. Try one of these popular neighborhoods:
                  </p>
                  <div className="flex flex-wrap justify-center gap-2 max-w-xl mx-auto">
                    <button
                      onClick={() => {
                        setSearchQuery('Khatib');
                        setSelectedNeighborhood('All Singapore Areas');
                      }}
                      className="px-3 py-1.5 bg-[#0F382A] text-white text-xs font-semibold rounded-[4px] cursor-pointer hover:bg-[#1B2421]"
                    >
                      Khatib (Chong Pang & Adventure)
                    </button>
                    <button
                      onClick={() => {
                        setSearchQuery('Canberra');
                        setSelectedNeighborhood('All Singapore Areas');
                      }}
                      className="px-3 py-1.5 bg-[#0F382A] text-white text-xs font-semibold rounded-[4px] cursor-pointer hover:bg-[#1B2421]"
                    >
                      Canberra (Hot Spring & Hub)
                    </button>
                    <button
                      onClick={() => {
                        setSearchQuery('Bedok');
                        setSelectedNeighborhood('All Singapore Areas');
                      }}
                      className="px-3 py-1.5 bg-[#0F382A] text-white text-xs font-semibold rounded-[4px] cursor-pointer hover:bg-[#1B2421]"
                    >
                      Bedok (85 Fengshan & Cafes)
                    </button>
                    <button
                      onClick={() => {
                        setSelectedCategory('all');
                        setSelectedNeighborhood('All Singapore Areas');
                        setSearchQuery('');
                      }}
                      className="px-3 py-1.5 border border-[#E8E4DC] text-xs font-semibold rounded-[4px] cursor-pointer hover:border-[#0F382A]"
                    >
                      Clear All Filters
                    </button>
                  </div>
                </div>
              )}

              {/* Curatorial Pull Quote */}
              <div className="my-16 py-12 border-y border-[#E8E4DC] text-center max-w-3xl mx-auto">
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#5A6C64] block mb-3">
                  Heartland & Botanical Philosophy
                </span>
                <blockquote className="font-serif text-2xl lg:text-3xl text-[#0F382A] italic leading-snug mb-4">
                  “The soul of Singapore breathes not merely in steel conservatories, but in the fragrant morning steam of Bedok 85 and the enduring laughter over chai poh chwee kueh.”
                </blockquote>
                <cite className="text-xs font-sans not-italic text-[#5A6C64] font-medium">
                  — The Curatorial Board · Botanical Voyage Singapore Dispatch
                </cite>
              </div>

              {/* Curated Customer Reviews & Dining Testimonials Preview Section */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#5A6C64] block">
                      Authentic Diner Voices & Recommendations
                    </span>
                    <h2 className="font-serif text-2xl font-semibold text-[#0F382A]">
                      Customer Reviews & Dining Guides
                    </h2>
                  </div>

                  <button
                    onClick={() => setActiveTab('photos')}
                    className="text-xs font-semibold text-[#0F382A] hover:text-[#F26440] transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span>View All Customer Reviews</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {PHOTO_STORIES.slice(0, 4).map((story) => (
                    <PhotoStoryCard
                      key={story.id}
                      story={story}
                      onOpenStory={(s: PhotoStory) => setActivePhotoStory(s)}
                    />
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}

        {/* VIEW 2: ITINERARIES SCREEN (TOGGLE BETWEEN CURATED & CUSTOM BUILDER) */}
        {activeTab === 'itineraries' && (
          <section className="max-w-[1320px] mx-auto px-6 py-10 space-y-6">
            {/* Mode Switcher */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-white border border-[#E8E4DC] rounded-[4px]">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#5A6C64] block">
                  Itinerary Planner Options
                </span>
                <h3 className="font-serif text-xl font-semibold text-[#0F382A]">
                  {itineraryMode === 'curated' ? 'Curated 3-Day Botanical Odyssey' : 'Create My Own Custom Itinerary'}
                </h3>
              </div>

              <div className="flex items-center gap-2 bg-[#FBF9F5] p-1 rounded-[4px] border border-[#E8E4DC]">
                <button
                  onClick={() => setItineraryMode('curated')}
                  className={`px-4 py-2 text-xs font-semibold rounded-[3px] transition-all cursor-pointer ${
                    itineraryMode === 'curated'
                      ? 'bg-[#0F382A] text-white shadow-xs'
                      : 'text-[#5A6C64] hover:text-[#1B2421]'
                  }`}
                >
                  Curated 3-Day Trail
                </button>
                <button
                  onClick={() => setItineraryMode('custom')}
                  className={`px-4 py-2 text-xs font-semibold rounded-[3px] transition-all cursor-pointer flex items-center gap-1.5 ${
                    itineraryMode === 'custom'
                      ? 'bg-[#0F382A] text-white shadow-xs'
                      : 'text-[#5A6C64] hover:text-[#1B2421]'
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Create My Own ({customItinerarySpotIds.length} stops)</span>
                </button>
              </div>
            </div>

            {itineraryMode === 'curated' ? (
              <ItineraryTimeline
                itineraries={CURATED_ITINERARIES}
                onOpenSpotDetail={(spot) => setActiveSpotDetail(spot)}
                onPlanCustomTrip={() => setItineraryMode('custom')}
              />
            ) : (
              <CustomItineraryBuilder
                onOpenSpotDetail={(spot) => setActiveSpotDetail(spot)}
                initialSpots={customItinerarySpots}
              />
            )}
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

        {/* VIEW 4: CUSTOMER REVIEWS & GUIDES SCREEN */}
        {activeTab === 'photos' && (
          <section className="max-w-[1320px] mx-auto px-6 py-10 space-y-8">
            <div className="border-b border-[#E8E4DC] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#5A6C64] block mb-1">
                  Community Testimonials & Verified Visitor Voices
                </span>
                <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-[#0F382A] mb-3">
                  Customer Reviews & Neighborhood Guides
                </h2>
                <p className="text-sm text-[#5A6C64] max-w-2xl leading-relaxed">
                  Real experiences from local diners, residents, and travelers across Singapore’s neighborhoods—including Khatib Chong Pang, Canberra Hot Spring Park, Bedok 85, and Old Airport Road.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-[#5A6C64]">Review Dossiers:</span>
                <span className="px-3 py-1 bg-white border border-[#E8E4DC] text-xs font-semibold text-[#0F382A] rounded-full">
                  {PHOTO_STORIES.length} Verified Guides
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {PHOTO_STORIES.map((story) => (
                <PhotoStoryCard
                  key={story.id}
                  story={story}
                  onOpenStory={(s: PhotoStory) => setActivePhotoStory(s)}
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
        onAddToItinerary={(s) => toggleItinerarySpot(s.id)}
        isInItinerary={activeSpotDetail ? customItinerarySpotIds.includes(activeSpotDetail.id) : false}
      />

      {/* Photo Gallery & Visitor Review Modal */}
      <PhotoGalleryModal
        story={activePhotoStory}
        onClose={() => setActivePhotoStory(null)}
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

      {/* Educational Guided Tour Onboarding Modal */}
      <EducationalTour
        isOpen={isEducationalTourOpen}
        onClose={() => setIsEducationalTourOpen(false)}
        onTriggerSearch={(query) => {
          setSearchQuery(query);
          setActiveTab('discover');
          const el = document.getElementById('curated-catalog');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
        onNavigateTab={(tab) => {
          setActiveTab(tab);
          if (tab === 'itineraries') {
            setItineraryMode('custom');
          }
        }}
      />

      {/* Quiet Minimalist Editorial Footer */}
      <footer className="mt-16 border-t border-[#E8E4DC] bg-white py-10">
        <div className="max-w-[1320px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-[#5A6C64]">
          <div className="flex items-center gap-3">
            <span className="font-serif font-bold text-base text-[#0F382A]">Botanical Voyage</span>
            <span aria-hidden="true" className="text-[#E8E4DC]">·</span>
            <span>Singapore Heritage, Heartlands & Culinary Archive</span>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => setActiveTab('discover')}
              className="hover:text-[#0F382A] transition-colors cursor-pointer"
            >
              Discoveries
            </button>
            <button
              onClick={() => {
                setActiveTab('itineraries');
                setItineraryMode('custom');
              }}
              className="hover:text-[#0F382A] transition-colors cursor-pointer"
            >
              Create Itinerary
            </button>
            <button
              onClick={() => setActiveTab('map')}
              className="hover:text-[#0F382A] transition-colors cursor-pointer"
            >
              Living Map
            </button>
            <button
              onClick={() => setIsEducationalTourOpen(true)}
              className="hover:text-[#0F382A] transition-colors cursor-pointer flex items-center gap-1"
            >
              <HelpCircle className="w-3.5 h-3.5 text-[#F26440]" />
              <span>How To Use Guide</span>
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
