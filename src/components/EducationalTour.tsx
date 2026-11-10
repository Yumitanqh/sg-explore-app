import React, { useState } from 'react';
import { Search, MapPin, Calendar, Sparkles, X, ChevronRight, ChevronLeft, Check, Compass, Utensils, Train, HelpCircle } from 'lucide-react';

interface EducationalTourProps {
  isOpen: boolean;
  onClose: () => void;
  onTriggerSearch?: (query: string) => void;
  onNavigateTab?: (tab: 'discover' | 'itineraries' | 'map' | 'photos' | 'saved') => void;
}

interface TourStep {
  title: string;
  badge: string;
  headline: string;
  description: string;
  tip: string;
  icon: React.ReactNode;
  actionText?: string;
  actionQuery?: string;
}

export const EducationalTour: React.FC<EducationalTourProps> = ({
  isOpen,
  onClose,
  onTriggerSearch,
  onNavigateTab
}) => {
  const [currentStep, setCurrentStep] = useState(0);

  if (!isOpen) return null;

  const tourSteps: TourStep[] = [
    {
      title: 'Universal Singapore Search',
      badge: 'Step 1 of 4 · Heartland & Local Food Discovery',
      headline: 'Search Any Town (e.g., Khatib, Canberra, Bedok, Toa Payoh)',
      description:
        'We’ve removed all tourist-only restrictions. Search any Singapore neighborhood to uncover Chong Pang supper stalls in Khatib, Sembawang Hot Spring Park in Canberra, soupy bak chor mee in Bedok 85, and authentic reviews.',
      tip: 'Try searching "Khatib" or "Canberra" to see northern food, hot springs, and adventure centers!',
      icon: <Search className="w-6 h-6 text-[#F26440]" />,
      actionText: 'Search "Khatib" Now',
      actionQuery: 'Khatib'
    },
    {
      title: 'Create Your Own Itinerary',
      badge: 'Step 2 of 4 · Custom Route Planner',
      headline: 'Choose Recommended Places & Craft Your Day',
      description:
        'Click "+ Add to Itinerary" on any place to construct a tailored route. Reorder stops, customize arrival times, add personal dining notes, and view transit connections.',
      tip: 'Navigate to "Curated Itineraries" in the top bar to customize stops or build from scratch.',
      icon: <Calendar className="w-6 h-6 text-[#0F382A]" />,
      actionText: 'Open Itinerary Builder'
    },
    {
      title: 'The Living Map & MRT Grid',
      badge: 'Step 3 of 4 · Spatial Exploration',
      headline: 'Interactive Transit Lines & Neighborhood Pins',
      description:
        'View authentic color-coded Singapore MRT lines (Downtown DT, Thomson-East Coast TE, East-West EW, North-South NS). Click markers for exit codes, walk times, and live OneMap routing.',
      tip: 'Use the zoom and MRT overlay switches to plan transit across island districts.',
      icon: <MapPin className="w-6 h-6 text-[#F5A623]" />,
      actionText: 'View Living Map'
    },
    {
      title: 'Sensory Curations & Soundscape',
      badge: 'Step 4 of 4 · Mindful Immersion',
      headline: 'Aromas, Must-Try Dishes & Canopy Mist Audio',
      description:
        'Every card details signature dishes, stall numbers, optimal lighting hours, and acoustic notes. Toggle the Canopy Mist Sound in the top bar for ambient tropical garden immersion.',
      tip: 'Save your favorite spots to your offline Travel Memo anytime using the bookmark button.',
      icon: <Sparkles className="w-6 h-6 text-[#0F382A]" />
    }
  ];

  const step = tourSteps[currentStep];

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    try {
      localStorage.setItem('botanical_tour_completed', 'true');
    } catch {
      // ignore
    }
    onClose();
  };

  const handleStepAction = () => {
    if (step.actionQuery && onTriggerSearch) {
      onTriggerSearch(step.actionQuery);
      handleComplete();
    } else if (currentStep === 1 && onNavigateTab) {
      onNavigateTab('itineraries');
      handleComplete();
    } else if (currentStep === 2 && onNavigateTab) {
      onNavigateTab('map');
      handleComplete();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-xl bg-[#FBF9F5] border border-[#E8E4DC] rounded-[4px] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="p-4 bg-white border-b border-[#E8E4DC] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-[#E2ECE6] text-[#0F382A] flex items-center justify-center">
              <Compass className="w-4 h-4" />
            </div>
            <span className="text-xs font-mono uppercase tracking-wider text-[#0F382A] font-semibold">
              Interactive Guide · Where to Click & Explore
            </span>
          </div>

          <button
            onClick={handleComplete}
            className="p-1 rounded-full hover:bg-[#F5F3EF] text-[#5A6C64] hover:text-[#1B2421] transition-colors cursor-pointer"
            title="Skip Tour"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Step Content */}
        <div className="p-6 sm:p-8 space-y-5">
          {/* Badge & Step Indicator */}
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#F26440] font-semibold bg-[#F26440]/10 px-2.5 py-1 rounded-full">
              {step.badge}
            </span>

            <div className="flex items-center gap-1.5">
              {tourSteps.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentStep(idx)}
                  className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                    currentStep === idx
                      ? 'bg-[#0F382A] w-5'
                      : 'bg-[#E8E4DC] hover:bg-[#79A28F]'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Icon & Title */}
          <div className="flex items-start gap-4">
            <div className="p-3 bg-white border border-[#E8E4DC] rounded-[4px] shrink-0 shadow-xs">
              {step.icon}
            </div>
            <div>
              <h3 className="font-serif text-2xl font-semibold text-[#1B2421] leading-tight mb-2">
                {step.headline}
              </h3>
              <p className="text-sm text-[#414844] leading-relaxed">
                {step.description}
              </p>
            </div>
          </div>

          {/* Curator Tip Box */}
          <div className="p-3.5 bg-white border border-[#E8E4DC] rounded-[4px] text-xs text-[#0F382A] flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-[#F5A623] shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong className="text-[#0F382A]">Pro-tip: </strong>
              <span className="text-[#414844]">{step.tip}</span>
            </p>
          </div>

          {/* Quick Action button for this step */}
          {step.actionText && (
            <button
              onClick={handleStepAction}
              className="w-full py-2.5 bg-[#E2ECE6] text-[#0F382A] text-xs font-semibold rounded-[4px] border border-[#C1ECD7] hover:bg-[#c1ecd7] transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>{step.actionText}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="p-4 bg-white border-t border-[#E8E4DC] flex items-center justify-between">
          <button
            onClick={handleComplete}
            className="text-xs font-semibold text-[#5A6C64] hover:text-[#1B2421] transition-colors cursor-pointer"
          >
            Skip Guide
          </button>

          <div className="flex items-center gap-2">
            {currentStep > 0 && (
              <button
                onClick={handlePrev}
                className="px-4 py-2 border border-[#E8E4DC] text-xs font-semibold text-[#1B2421] rounded-[4px] hover:bg-[#F5F3EF] transition-all cursor-pointer flex items-center gap-1"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            )}

            <button
              onClick={handleNext}
              className="px-5 py-2 bg-[#0F382A] text-white text-xs font-semibold uppercase tracking-wider rounded-[4px] hover:bg-[#1B2421] transition-all cursor-pointer flex items-center gap-1.5 shadow-xs"
            >
              <span>{currentStep === tourSteps.length - 1 ? 'Start Exploring' : 'Next Step'}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
