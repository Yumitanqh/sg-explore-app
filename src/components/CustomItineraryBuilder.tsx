import React, { useState } from 'react';
import { DISCOVERY_SPOTS, DiscoverySpot } from '../data/discoveries';
import { MrtBadge } from './MrtBadge';
import { GooglePlacesBadge } from './GooglePlacesBadge';
import { Plus, Trash2, ArrowUp, ArrowDown, Clock, MapPin, Sparkles, Check, Copy, Printer, Calendar, Search, Utensils, Footprints } from 'lucide-react';

export interface CustomStop {
  id: string;
  title: string;
  neighborhood: string;
  time: string;
  duration: string;
  mrtTip?: string;
  notes?: string;
  spotId?: string;
  mustTry?: string;
}

interface CustomItineraryBuilderProps {
  onOpenSpotDetail: (spot: DiscoverySpot) => void;
  initialSpots?: DiscoverySpot[];
}

export const CustomItineraryBuilder: React.FC<CustomItineraryBuilderProps> = ({
  onOpenSpotDetail,
  initialSpots = []
}) => {
  const [itineraryTitle, setItineraryTitle] = useState('My Custom Singapore Food & Heritage Trail');
  const [stops, setStops] = useState<CustomStop[]>(() => {
    // If initial spots provided, populate them; otherwise provide a rich Bedok & East Coast heartland starter
    const defaultSpots = DISCOVERY_SPOTS.filter((s) =>
      ['bedok-85-fengshan-market', 'bedok-interchange-hawker-centre', 'percolate-bedok-cafe', 'bedok-reservoir-floating-deck'].includes(s.id)
    );

    const pool = initialSpots.length > 0 ? initialSpots : defaultSpots;

    return pool.map((s, idx) => ({
      id: `custom-stop-${s.id}-${idx}`,
      title: s.title,
      neighborhood: s.neighborhood,
      time: idx === 0 ? '08:30 AM' : idx === 1 ? '11:45 AM' : idx === 2 ? '03:15 PM' : '07:30 PM',
      duration: s.recommendedDuration,
      mrtTip: `${s.mrt.code} ${s.mrt.station}`,
      notes: s.curatorTip,
      spotId: s.id,
      mustTry: s.mustTryDishes ? s.mustTryDishes[0] : s.sensory.signatureExperience
    }));
  });

  const [searchPicker, setSearchPicker] = useState('');
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [customTitle, setCustomTitle] = useState('');
  const [customNeighborhood, setCustomNeighborhood] = useState('Bedok');
  const [customTime, setCustomTime] = useState('12:00 PM');
  const [customNotes, setCustomNotes] = useState('');
  const [copied, setCopied] = useState(false);

  // Recommendations picker list
  const recommendedPicker = DISCOVERY_SPOTS.filter((s) => {
    if (!searchPicker) return true;
    const q = searchPicker.toLowerCase();
    return (
      s.title.toLowerCase().includes(q) ||
      s.neighborhood.toLowerCase().includes(q) ||
      s.heartland.toLowerCase().includes(q) ||
      (s.mustTryDishes && s.mustTryDishes.some((d) => d.toLowerCase().includes(q)))
    );
  });

  const addRecommendedSpot = (spot: DiscoverySpot) => {
    const newStop: CustomStop = {
      id: `custom-stop-${spot.id}-${Date.now()}`,
      title: spot.title,
      neighborhood: spot.neighborhood,
      time: '12:00 PM',
      duration: spot.recommendedDuration,
      mrtTip: `${spot.mrt.code} ${spot.mrt.station}`,
      notes: spot.curatorTip,
      spotId: spot.id,
      mustTry: spot.mustTryDishes ? spot.mustTryDishes[0] : spot.sensory.signatureExperience
    };

    setStops((prev) => [...prev, newStop]);
  };

  const handleAddManualStop = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTitle.trim()) return;

    const newStop: CustomStop = {
      id: `custom-manual-${Date.now()}`,
      title: customTitle.trim(),
      neighborhood: customNeighborhood.trim(),
      time: customTime,
      duration: '1.5 Hours',
      notes: customNotes.trim()
    };

    setStops((prev) => [...prev, newStop]);
    setCustomTitle('');
    setCustomNotes('');
    setIsAddingNew(false);
  };

  const removeStop = (id: string) => {
    setStops((prev) => prev.filter((s) => s.id !== id));
  };

  const moveStop = (index: number, direction: 'up' | 'down') => {
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === stops.length - 1)) {
      return;
    }
    const newStops = [...stops];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    const temp = newStops[index];
    newStops[index] = newStops[targetIndex];
    newStops[targetIndex] = temp;
    setStops(newStops);
  };

  const updateStopField = (id: string, field: keyof CustomStop, value: string) => {
    setStops((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [field]: value } : s))
    );
  };

  const handleCopyItinerary = () => {
    const text = stops
      .map(
        (s, idx) =>
          `Stop ${idx + 1}: ${s.time} - ${s.title} (${s.neighborhood})\n` +
          `   - Transport: ${s.mrtTip || 'Walking/Bus'}\n` +
          (s.mustTry ? `   - Must-Try Dish: ${s.mustTry}\n` : '') +
          (s.notes ? `   - Notes: ${s.notes}\n` : '')
      )
      .join('\n');

    navigator.clipboard.writeText(`${itineraryTitle.toUpperCase()}\n\n${text}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white border border-[#E8E4DC] rounded-[4px] p-6 lg:p-8 shadow-xs">
      {/* Title & Actions Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#E8E4DC]">
        <div className="flex-1">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#0F382A] mb-1 font-semibold">
            <Calendar className="w-3.5 h-3.5 text-[#F26440]" />
            <span>Interactive Itinerary Creator</span>
          </div>
          <input
            type="text"
            value={itineraryTitle}
            onChange={(e) => setItineraryTitle(e.target.value)}
            className="font-serif text-2xl lg:text-3xl font-semibold text-[#0F382A] w-full bg-transparent border-b border-transparent hover:border-[#E8E4DC] focus:border-[#0F382A] focus:outline-none transition-colors"
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyItinerary}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-[4px] border border-[#E8E4DC] bg-[#FBF9F5] text-[#1B2421] hover:bg-[#F5F3EF] transition-all cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-green-700" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Schedule</span>
              </>
            )}
          </button>

          <button
            onClick={() => window.print()}
            title="Print Schedule"
            className="p-2 text-xs rounded-[4px] border border-[#E8E4DC] bg-[#FBF9F5] text-[#5A6C64] hover:text-[#0F382A] cursor-pointer"
          >
            <Printer className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main 2-Column Split: Stops Timeline on Left, Recommendations Drawer on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
        {/* Left Column: Itinerary Stops (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#5A6C64] font-medium">
              <strong>{stops.length}</strong> planned stops in this itinerary
            </span>

            <button
              onClick={() => setIsAddingNew(!isAddingNew)}
              className="text-xs font-semibold text-[#0F382A] hover:text-[#F26440] flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{isAddingNew ? 'Close manual stop' : 'Add custom personal spot'}</span>
            </button>
          </div>

          {/* Manual Stop Input Box */}
          {isAddingNew && (
            <form onSubmit={handleAddManualStop} className="p-4 bg-[#FBF9F5] border border-[#E8E4DC] rounded-[4px] space-y-3">
              <h4 className="font-serif text-sm font-semibold text-[#0F382A]">Add Personal Stop or Activity</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <input
                  type="text"
                  placeholder="Stop name (e.g. Bedok Point / Meet friends)"
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  className="sm:col-span-2 text-xs p-2 bg-white border border-[#E8E4DC] rounded-[4px]"
                  required
                />
                <input
                  type="text"
                  placeholder="Time (e.g. 02:00 PM)"
                  value={customTime}
                  onChange={(e) => setCustomTime(e.target.value)}
                  className="text-xs p-2 bg-white border border-[#E8E4DC] rounded-[4px]"
                />
              </div>
              <textarea
                placeholder="Notes or must-try food..."
                value={customNotes}
                onChange={(e) => setCustomNotes(e.target.value)}
                rows={2}
                className="w-full text-xs p-2 bg-white border border-[#E8E4DC] rounded-[4px]"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddingNew(false)}
                  className="px-3 py-1.5 text-xs text-[#5A6C64]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#0F382A] text-white text-xs font-semibold rounded-[4px] hover:bg-[#1B2421]"
                >
                  Add Stop
                </button>
              </div>
            </form>
          )}

          {/* Running Timeline of User Stops */}
          <div className="relative pl-6 space-y-5">
            {/* 1px Running Timeline Line */}
            <div className="absolute top-2 bottom-6 left-[7px] w-[1px] bg-[#E8E4DC]" />

            {stops.map((stop, index) => {
              const matchedSpot = DISCOVERY_SPOTS.find((s) => s.id === stop.spotId);

              return (
                <div key={stop.id} className="relative group">
                  {/* 8px emerald dot step marker */}
                  <div className="absolute -left-[19px] top-3 w-[9px] h-[9px] rounded-full bg-[#0F382A] ring-4 ring-white" />

                  {/* Stop Card */}
                  <div className="p-4 bg-[#FBF9F5] border border-[#E8E4DC] rounded-[4px] hover:border-[#79A28F] transition-all space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={stop.time}
                          onChange={(e) => updateStopField(stop.id, 'time', e.target.value)}
                          className="font-mono text-xs font-bold text-[#5A6C64] bg-white border border-[#E8E4DC] px-2 py-0.5 rounded w-24 focus:outline-[#0F382A]"
                        />
                        <span className="text-xs text-[#5A6C64] font-medium">{stop.neighborhood}</span>
                      </div>

                      {/* Reorder & Remove Controls */}
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => moveStop(index, 'up')}
                          disabled={index === 0}
                          title="Move earlier"
                          className="p-1 hover:bg-white rounded text-[#5A6C64] disabled:opacity-30 cursor-pointer"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => moveStop(index, 'down')}
                          disabled={index === stops.length - 1}
                          title="Move later"
                          className="p-1 hover:bg-white rounded text-[#5A6C64] disabled:opacity-30 cursor-pointer"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => removeStop(stop.id)}
                          title="Remove stop"
                          className="p-1 hover:bg-white rounded text-red-600 cursor-pointer ml-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <h5
                      onClick={() => matchedSpot && onOpenSpotDetail(matchedSpot)}
                      className={`font-serif text-base font-semibold text-[#1B2421] ${matchedSpot ? 'cursor-pointer hover:text-[#0F382A]' : ''}`}
                    >
                      {stop.title}
                    </h5>

                    {stop.mustTry && (
                      <div className="p-2 bg-white border border-[#E8E4DC] rounded text-xs text-[#0F382A] flex items-center gap-1.5">
                        <Utensils className="w-3.5 h-3.5 text-[#F26440] shrink-0" />
                        <span className="font-medium truncate">
                          <strong className="text-[#1B2421]">Must Try: </strong>
                          {stop.mustTry}
                        </span>
                      </div>
                    )}

                    {stop.mrtTip && (
                      <div className="text-[11px] font-mono text-[#5A6C64] flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#0F382A]" />
                        <span>Transit: {stop.mrtTip}</span>
                      </div>
                    )}

                    {/* Editable user notes */}
                    <input
                      type="text"
                      placeholder="Add personal note (e.g. reserve booth, ask for less chili)..."
                      value={stop.notes || ''}
                      onChange={(e) => updateStopField(stop.id, 'notes', e.target.value)}
                      className="w-full text-xs bg-white/70 border border-[#E8E4DC] rounded px-2.5 py-1 text-[#414844] focus:outline-[#0F382A]"
                    />
                  </div>
                </div>
              );
            })}

            {stops.length === 0 && (
              <div className="text-center py-10 bg-[#FBF9F5] border border-[#E8E4DC] rounded-[4px] p-6">
                <Footprints className="w-8 h-8 text-[#5A6C64] mx-auto mb-2" />
                <p className="text-sm font-semibold text-[#1B2421]">Your itinerary is empty</p>
                <p className="text-xs text-[#5A6C64] mt-1">
                  Choose from the recommended places on the right to start building your route.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Pick from Recommended Places (5 cols) */}
        <div className="lg:col-span-5 bg-[#FBF9F5] border border-[#E8E4DC] rounded-[4px] p-5 space-y-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#5A6C64] mb-1 font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-[#F5A623]" />
              <span>Recommended Places Library</span>
            </div>
            <h4 className="font-serif text-lg font-semibold text-[#0F382A]">
              Select Places to Add
            </h4>
            <p className="text-xs text-[#5A6C64] mt-0.5">
              Choose famous hawkers, heartland suppers, or heritage trails with one click.
            </p>
          </div>

          {/* Quick search filter for recommendations */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-[#5A6C64] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search Bedok, Tampines, Laksa, Kaya..."
              value={searchPicker}
              onChange={(e) => setSearchPicker(e.target.value)}
              className="w-full text-xs pl-8 pr-3 py-2 bg-white border border-[#E8E4DC] rounded-[4px] focus:outline-[#0F382A]"
            />
          </div>

          {/* Scrollable Recommended Places List */}
          <div className="space-y-3 max-h-[520px] overflow-y-auto pr-1">
            {recommendedPicker.map((spot) => {
              const alreadyAdded = stops.some((s) => s.spotId === spot.id);

              return (
                <div
                  key={spot.id}
                  className="p-3 bg-white border border-[#E8E4DC] rounded-[4px] hover:border-[#79A28F] transition-all flex items-start gap-3 shadow-2xs group"
                >
                  <div className="w-12 h-12 rounded-[3px] bg-gradient-to-br from-[#FAF8F3] to-[#EAE0CD] border border-[#DDD5C5] flex flex-col items-center justify-center shrink-0 p-1 text-center">
                    <span className="text-[#F5A623] text-xs">★</span>
                    <span className="font-mono text-xs font-bold text-[#1B2421] leading-none mt-0.5">
                      {spot.rating.toFixed(1)}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#5A6C64] truncate">
                        {spot.heartland || spot.neighborhood}
                      </span>
                      <GooglePlacesBadge rating={spot.rating} reviewsCount={spot.reviewsCount} />
                    </div>

                    <h6
                      onClick={() => onOpenSpotDetail(spot)}
                      className="font-serif text-xs font-semibold text-[#1B2421] truncate cursor-pointer hover:text-[#0F382A] mt-0.5"
                    >
                      {spot.title}
                    </h6>

                    {spot.mustTryDishes && spot.mustTryDishes.length > 0 && (
                      <p className="text-[11px] text-[#F26440] font-medium truncate mt-0.5">
                        ★ {spot.mustTryDishes[0]}
                      </p>
                    )}

                    <div className="mt-2 pt-2 border-t border-[#E8E4DC] flex items-center justify-between">
                      <MrtBadge mrt={spot.mrt} showExit={false} />

                      <button
                        onClick={() => addRecommendedSpot(spot)}
                        className={`text-xs font-semibold px-2.5 py-1 rounded-[3px] transition-all cursor-pointer flex items-center gap-1 ${
                          alreadyAdded
                            ? 'bg-[#E2ECE6] text-[#0F382A] hover:bg-[#c1ecd7]'
                            : 'bg-[#0F382A] text-white hover:bg-[#1B2421]'
                        }`}
                      >
                        <Plus className="w-3 h-3" />
                        <span>{alreadyAdded ? 'Add Again' : 'Add to Plan'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
