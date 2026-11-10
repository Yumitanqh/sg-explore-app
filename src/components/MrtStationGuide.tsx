import React, { useState, useMemo } from 'react';
import { MRT_STATIONS_DATA, MRT_LINES, MrtStationDetail } from '../data/mrtStations';
import { DISCOVERY_SPOTS, DiscoverySpot } from '../data/discoveries';
import { Search, Train, Utensils, Compass, MapPin, ArrowRight, Star, Clock, Check, Plus, MessageSquareQuote, ChevronRight, Sparkles } from 'lucide-react';

interface MrtStationGuideProps {
  onSelectSpotDetail?: (spot: DiscoverySpot) => void;
  onAddStationToItinerary?: (spot: DiscoverySpot) => void;
  initialSearchQuery?: string;
}

export const MrtStationGuide: React.FC<MrtStationGuideProps> = ({
  onSelectSpotDetail,
  onAddStationToItinerary,
  initialSearchQuery = ''
}) => {
  const [selectedLine, setSelectedLine] = useState<string>('all');
  const [stationQuery, setStationQuery] = useState<string>(initialSearchQuery);

  const filteredStations = useMemo(() => {
    return MRT_STATIONS_DATA.filter((station) => {
      const matchesLine = selectedLine === 'all' || station.line === selectedLine;
      const q = stationQuery.toLowerCase().trim();

      const matchesQuery =
        !q ||
        station.name.toLowerCase().includes(q) ||
        station.code.toLowerCase().includes(q) ||
        station.neighborhood.toLowerCase().includes(q) ||
        station.eatRecommendations.some(
          (e) =>
            e.name.toLowerCase().includes(q) ||
            e.dish.toLowerCase().includes(q) ||
            e.customerReview.toLowerCase().includes(q)
        ) ||
        station.doRecommendations.some(
          (d) =>
            d.name.toLowerCase().includes(q) ||
            d.experience.toLowerCase().includes(q) ||
            d.customerTip.toLowerCase().includes(q)
        );

      return matchesLine && matchesQuery;
    });
  }, [selectedLine, stationQuery]);

  return (
    <div className="space-y-8">
      {/* Top Header & Search Hero */}
      <div className="bg-white border border-[#E8E4DC] rounded-[4px] p-6 lg:p-8 shadow-xs space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#0F382A] font-semibold mb-1">
              <Train className="w-4 h-4 text-[#D42E12]" />
              <span>Singapore Mass Rapid Transit (MRT) Food & Activity Directory</span>
            </div>
            <h2 className="font-serif text-3xl font-semibold text-[#1B2421]">
              Every MRT Station: What to Eat & What to Do
            </h2>
            <p className="text-sm text-[#5A6C64] mt-1 max-w-2xl leading-relaxed">
              Step off at any Singapore MRT station and know immediately where to eat famous local hawkers and what activities to do right by the exit.
            </p>
          </div>

          <div className="text-right shrink-0">
            <span className="font-mono text-2xl font-bold text-[#0F382A]">
              {MRT_STATIONS_DATA.length}
            </span>
            <span className="block text-xs text-[#5A6C64] uppercase font-mono">
              Curated Stations
            </span>
          </div>
        </div>

        {/* Station Search Input */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#5A6C64] absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={stationQuery}
              onChange={(e) => setStationQuery(e.target.value)}
              placeholder="Search station (e.g. Khatib, Canberra, Bedok, NS14, Chinatown) or dish (Laksa, Nasi Lemak)..."
              className="w-full pl-11 pr-4 py-3 bg-[#FBF9F5] border border-[#E8E4DC] rounded-[4px] text-sm text-[#1B2421] placeholder:text-[#5A6C64]/70 focus:outline-none focus:border-[#0F382A] focus:bg-white transition-all"
            />
            {stationQuery && (
              <button
                onClick={() => setStationQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#5A6C64] hover:text-[#1B2421] cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* MRT Line Filter Buttons */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#E8E4DC]">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#5A6C64] mr-2">
            Lines:
          </span>
          {MRT_LINES.map((line) => (
            <button
              key={line.id}
              onClick={() => setSelectedLine(line.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 border ${
                selectedLine === line.id
                  ? 'bg-[#0F382A] text-white border-[#0F382A] shadow-2xs font-semibold'
                  : 'bg-white border-[#E8E4DC] text-[#414844] hover:border-[#0F382A] hover:bg-[#F5F3EF]'
              }`}
            >
              {'color' in line && (
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: line.color }}
                />
              )}
              <span>{line.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Stations List Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between text-xs text-[#5A6C64]">
          <span>
            Showing <strong>{filteredStations.length}</strong> stations
            {selectedLine !== 'all' && ` on ${selectedLine} Line`}
            {stationQuery && ` matching "${stationQuery}"`}
          </span>

          {(selectedLine !== 'all' || stationQuery) && (
            <button
              onClick={() => {
                setSelectedLine('all');
                setStationQuery('');
              }}
              className="text-[#0F382A] font-semibold hover:underline cursor-pointer"
            >
              Reset station filters
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredStations.map((station) => {
            const matchingSpot = station.spotIdMatch
              ? DISCOVERY_SPOTS.find((s) => s.id === station.spotIdMatch)
              : null;

            return (
              <article
                key={station.code}
                className="bg-white border border-[#E8E4DC] rounded-[4px] overflow-hidden flex flex-col justify-between hover:border-[#79A28F] transition-all duration-300 shadow-2xs"
              >
                {/* Top Station Ribbon */}
                <div
                  className="px-5 py-4 border-b border-[#E8E4DC] flex items-center justify-between"
                  style={{ borderTop: `4px solid ${station.lineColor}` }}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="px-2.5 py-1 rounded-[3px] text-xs font-mono font-bold text-white shadow-2xs"
                      style={{ backgroundColor: station.lineColor }}
                    >
                      {station.code}
                    </span>
                    <div>
                      <h3 className="font-serif text-xl font-bold text-[#1B2421]">
                        {station.name}
                      </h3>
                      <p className="text-[11px] text-[#5A6C64] font-medium">
                        {station.lineName} · {station.neighborhood}
                      </p>
                    </div>
                  </div>

                  {matchingSpot && onSelectSpotDetail && (
                    <button
                      onClick={() => onSelectSpotDetail(matchingSpot)}
                      className="text-xs font-semibold text-[#0F382A] hover:text-[#F26440] transition-colors flex items-center gap-1 cursor-pointer shrink-0"
                    >
                      <span>Full Dossier</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Body: What to Eat & What to Do Columns */}
                <div className="p-5 space-y-5 flex-1">
                  {/* WHAT TO EAT SECTION */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#891D00]">
                      <Utensils className="w-3.5 h-3.5 text-[#F26440]" />
                      <span>What to Eat at {station.name} ({station.eatRecommendations.length} spots)</span>
                    </div>

                    <div className="space-y-2.5">
                      {station.eatRecommendations.map((food, fIdx) => (
                        <div
                          key={fIdx}
                          className="p-3.5 bg-gradient-to-br from-[#FAF8F3] to-[#F5EFE4] border border-[#E8E4DC] rounded-[4px] space-y-1.5 text-xs"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-serif font-bold text-sm text-[#1B2421]">
                              {food.name}
                            </span>
                            <div className="flex items-center gap-1 text-[#F5A623]">
                              <Star className="w-3 h-3 fill-current" />
                              <span className="font-mono text-xs font-bold text-[#1B2421]">
                                {food.rating}
                              </span>
                            </div>
                          </div>

                          <p className="text-[#891D00] font-medium text-[11px]">
                            Must-Try: <strong>{food.dish}</strong>
                          </p>

                          <div className="flex items-center gap-2 text-[11px] text-[#5A6C64]">
                            <span className="flex items-center gap-1 font-mono text-[#0F382A]">
                              <MapPin className="w-3 h-3" />
                              {food.exit}
                            </span>
                            <span>·</span>
                            <span className="font-mono">{food.priceTier}</span>
                          </div>

                          <blockquote className="font-serif italic text-[#414844] text-[11px] pt-1 border-t border-[#E8E4DC]/60">
                            “{food.customerReview}”
                          </blockquote>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* WHAT TO DO SECTION */}
                  <div className="space-y-3 pt-3 border-t border-[#E8E4DC]">
                    <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#0F382A]">
                      <Compass className="w-3.5 h-3.5 text-[#0F382A]" />
                      <span>What to Do ({station.doRecommendations.length} activities)</span>
                    </div>

                    <div className="space-y-2.5">
                      {station.doRecommendations.map((act, aIdx) => (
                        <div
                          key={aIdx}
                          className="p-3.5 bg-[#E2ECE6]/50 border border-[#C1ECD7] rounded-[4px] space-y-1 text-xs text-[#0F382A]"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <h5 className="font-semibold text-sm text-[#0F382A]">
                              {act.name}
                            </h5>
                            <span className="text-[10px] font-mono text-[#5A6C64] bg-white px-2 py-0.5 rounded border border-[#C1ECD7]">
                              {act.exit}
                            </span>
                          </div>

                          <p className="text-xs text-[#334D41] leading-relaxed">
                            {act.experience}
                          </p>

                          <p className="text-[11px] text-[#0F382A] pt-1">
                            <strong>Insider Tip:</strong> {act.customerTip}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Action Bar */}
                {matchingSpot && onAddStationToItinerary && (
                  <div className="px-5 py-3 bg-[#FBF9F5] border-t border-[#E8E4DC] flex items-center justify-between text-xs">
                    <span className="text-[#5A6C64] text-[11px]">
                      Add {station.name} highlights to your day trip:
                    </span>
                    <button
                      onClick={() => onAddStationToItinerary(matchingSpot)}
                      className="px-3 py-1.5 bg-[#0F382A] text-white text-xs font-semibold rounded-[3px] hover:bg-[#1B2421] transition-all cursor-pointer flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" />
                      <span>+ Itinerary</span>
                    </button>
                  </div>
                )}
              </article>
            );
          })}
        </div>

        {filteredStations.length === 0 && (
          <div className="text-center py-16 bg-white border border-[#E8E4DC] rounded-[4px] p-8">
            <Train className="w-10 h-10 text-[#5A6C64] mx-auto mb-3" />
            <h4 className="font-serif text-lg font-semibold text-[#1B2421] mb-1">
              No MRT stations matching "{stationQuery}"
            </h4>
            <p className="text-xs text-[#5A6C64] mb-4">
              Try searching for Khatib, Canberra, Bedok, Chinatown, Orchard, or dish names like Laksa or Prata.
            </p>
            <button
              onClick={() => {
                setSelectedLine('all');
                setStationQuery('');
              }}
              className="px-4 py-2 bg-[#0F382A] text-white text-xs font-semibold rounded-[4px] cursor-pointer"
            >
              View All Stations
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
