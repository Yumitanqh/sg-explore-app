import React, { useState } from 'react';
import { DayItinerary, ItineraryStop } from '../data/itineraries';
import { DISCOVERY_SPOTS, DiscoverySpot } from '../data/discoveries';
import { Clock, MapPin, Footprints, Train, CheckCircle2, Circle, Plus, Printer, ArrowRight, Share2, Sparkles } from 'lucide-react';

interface ItineraryTimelineProps {
  itineraries: DayItinerary[];
  onOpenSpotDetail: (spot: DiscoverySpot) => void;
  onPlanCustomTrip?: () => void;
}

export const ItineraryTimeline: React.FC<ItineraryTimelineProps> = ({
  itineraries,
  onOpenSpotDetail,
  onPlanCustomTrip
}) => {
  const [activeDayIndex, setActiveDayIndex] = useState<number>(0);
  const [completedStops, setCompletedStops] = useState<Record<string, boolean>>({});
  const [customNotes, setCustomNotes] = useState<Record<string, string>>({});
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [noteInput, setNoteInput] = useState<string>('');

  const currentDay = itineraries[activeDayIndex] || itineraries[0];

  const toggleStopComplete = (stopId: string) => {
    setCompletedStops((prev) => ({
      ...prev,
      [stopId]: !prev[stopId]
    }));
  };

  const handleSaveNote = (stopId: string) => {
    setCustomNotes((prev) => ({
      ...prev,
      [stopId]: noteInput
    }));
    setEditingNoteId(null);
    setNoteInput('');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white border border-[#E8E4DC] rounded-[4px] p-6 lg:p-8 shadow-xs">
      {/* Day Selector Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#E8E4DC]">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#5A6C64] block">
            The Sensory Singapore Odyssey
          </span>
          <h2 className="font-serif text-2xl lg:text-3xl font-semibold text-[#0F382A]">
            Curated 3-Day Botanical Trail
          </h2>
        </div>

        <div className="flex items-center gap-2">
          {itineraries.map((day, idx) => (
            <button
              key={day.dayNumber}
              onClick={() => setActiveDayIndex(idx)}
              className={`px-4 py-2 text-xs font-semibold rounded-full border transition-all cursor-pointer ${
                activeDayIndex === idx
                  ? 'bg-[#0F382A] text-white border-[#0F382A] shadow-xs'
                  : 'bg-[#FBF9F5] text-[#1B2421] border-[#E8E4DC] hover:border-[#0F382A]'
              }`}
            >
              Day 0{day.dayNumber}
            </button>
          ))}

          <button
            onClick={handlePrint}
            title="Print or Save Itinerary PDF"
            className="p-2 rounded-full border border-[#E8E4DC] text-[#5A6C64] hover:text-[#0F382A] hover:bg-[#F5F3EF] transition-colors cursor-pointer ml-1"
          >
            <Printer className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Day Overview Strip */}
      <div className="py-6 border-b border-[#E8E4DC] grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        <div className="md:col-span-2">
          <h3 className="font-serif text-xl font-semibold text-[#1B2421] mb-2">
            {currentDay.dayTitle}
          </h3>
          <p className="text-sm text-[#5A6C64] leading-relaxed">
            {currentDay.editorialBlurb}
          </p>
        </div>

        {/* Transit & Walking Stats Strip */}
        <div className="p-4 bg-[#FBF9F5] border border-[#E8E4DC] rounded-[4px] space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-[#5A6C64] flex items-center gap-1.5">
              <Footprints className="w-3.5 h-3.5 text-[#0F382A]" />
              Walking Distance:
            </span>
            <span className="font-mono font-semibold text-[#1B2421]">
              {currentDay.totalDistance} (~{currentDay.estimatedWalkingMinutes} min)
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[#5A6C64] flex items-center gap-1.5">
              <Train className="w-3.5 h-3.5 text-[#0F382A]" />
              Transit Recommendation:
            </span>
            <span className="font-mono font-semibold text-[#0F382A]">
              Singapore Tourist Pass
            </span>
          </div>

          <p className="text-[11px] text-[#5A6C64] pt-1 border-t border-[#E8E4DC]">
            {currentDay.transitSuggestion}
          </p>
        </div>
      </div>

      {/* Vertical Timeline Stops */}
      <div className="pt-8">
        <div className="relative pl-6 sm:pl-8 space-y-8">
          {/* Vertical running line in 1px #E8E4DC */}
          <div className="absolute top-2 bottom-6 left-[11px] sm:left-[15px] w-[1px] bg-[#E8E4DC]" />

          {currentDay.stops.map((stop, sIdx) => {
            const isCompleted = completedStops[stop.id];
            const matchingSpot = DISCOVERY_SPOTS.find((s) => s.id === stop.spotId);
            const stopNote = customNotes[stop.id];

            return (
              <div key={stop.id} className="relative group">
                {/* 8px emerald dot step marker */}
                <button
                  onClick={() => toggleStopComplete(stop.id)}
                  title={isCompleted ? 'Mark as pending' : 'Mark as completed'}
                  className="absolute -left-[19px] sm:-left-[23px] top-1.5 z-10 flex items-center justify-center cursor-pointer transition-transform group-hover:scale-125"
                >
                  {isCompleted ? (
                    <div className="w-4 h-4 rounded-full bg-[#0F382A] flex items-center justify-center text-white shadow-xs">
                      <CheckCircle2 className="w-3 h-3 text-[#F26440]" />
                    </div>
                  ) : (
                    <div className="w-[8px] h-[8px] rounded-full bg-[#0F382A] ring-4 ring-white" />
                  )}
                </button>

                {/* Content card indented alongside each stop */}
                <div className={`p-5 rounded-[4px] border transition-all ${
                  isCompleted
                    ? 'bg-[#F5F3EF]/60 border-[#E8E4DC] opacity-75'
                    : 'bg-[#FBF9F5] border-[#E8E4DC] hover:border-[#79A28F] hover:shadow-xs'
                }`}>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    {/* Arrival timestamp in muted sage bold microcopy */}
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#5A6C64]">
                        {stop.time}
                      </span>
                      <span aria-hidden="true" className="text-[#E8E4DC]">·</span>
                      <span className="text-xs font-medium text-[#5A6C64] flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {stop.duration}
                      </span>
                    </div>

                    {/* MRT tip pill */}
                    <span className="text-[11px] font-mono text-[#0F382A] bg-white border border-[#E8E4DC] px-2.5 py-0.5 rounded-full">
                      {stop.mrtTip}
                    </span>
                  </div>

                  {/* Stop title in Playfair Display */}
                  <h4 className="font-serif text-lg font-semibold text-[#1B2421] mb-2">
                    {stop.title}
                  </h4>

                  {/* Highlight statement */}
                  <p className="text-xs sm:text-sm text-[#414844] leading-relaxed mb-3">
                    {stop.highlight}
                  </p>

                  {/* Sensory focus pill */}
                  <div className="text-xs text-[#5A6C64] bg-white p-2.5 rounded-[4px] border border-[#E8E4DC] flex items-start gap-2 mb-3">
                    <Sparkles className="w-3.5 h-3.5 text-[#F5A623] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-[#0F382A] text-[11px] uppercase tracking-wider block">
                        Sensory Focus:
                      </span>
                      <span className="italic">{stop.sensoryFocus}</span>
                    </div>
                  </div>

                  {/* User custom note if any */}
                  {stopNote && (
                    <div className="text-xs bg-[#E2ECE6] text-[#0F382A] p-2.5 rounded-[4px] border border-[#C1ECD7] mb-3">
                      <span className="font-semibold block text-[10px] uppercase">My Note:</span>
                      <span>{stopNote}</span>
                    </div>
                  )}

                  {/* Add note field */}
                  {editingNoteId === stop.id ? (
                    <div className="mt-3 flex items-center gap-2">
                      <input
                        type="text"
                        value={noteInput}
                        onChange={(e) => setNoteInput(e.target.value)}
                        placeholder="Add personal note (e.g., Table booked under Marcus)..."
                        className="flex-1 text-xs bg-white border border-[#E8E4DC] rounded-[4px] px-3 py-1.5 focus:outline-[#0F382A]"
                      />
                      <button
                        onClick={() => handleSaveNote(stop.id)}
                        className="px-3 py-1.5 bg-[#0F382A] text-white text-xs font-semibold rounded-[4px] hover:bg-[#1B2421] cursor-pointer"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingNoteId(null)}
                        className="px-2 py-1.5 text-xs text-[#5A6C64] hover:text-[#1B2421] cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : null}

                  {/* Action buttons */}
                  <div className="pt-3 border-t border-[#E8E4DC] flex items-center justify-between text-xs">
                    <button
                      onClick={() => {
                        setEditingNoteId(stop.id);
                        setNoteInput(stopNote || '');
                      }}
                      className="text-[#5A6C64] hover:text-[#0F382A] font-medium transition-colors cursor-pointer"
                    >
                      {stopNote ? 'Edit note' : '+ Add personal note'}
                    </button>

                    {matchingSpot && (
                      <button
                        onClick={() => onOpenSpotDetail(matchingSpot)}
                        className="flex items-center gap-1 font-semibold text-[#0F382A] hover:text-[#F26440] transition-colors cursor-pointer"
                      >
                        <span>View Curatorial Story</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
