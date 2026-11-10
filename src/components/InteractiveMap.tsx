import React, { useState } from 'react';
import { DiscoverySpot } from '../data/discoveries';
import { MrtBadge } from './MrtBadge';
import { GooglePlacesBadge } from './GooglePlacesBadge';
import { MapPin, Navigation, Compass, Layers, ZoomIn, ZoomOut, RotateCcw, ArrowRight } from 'lucide-react';

interface InteractiveMapProps {
  spots: DiscoverySpot[];
  selectedSpot: DiscoverySpot | null;
  onSelectSpot: (spot: DiscoverySpot) => void;
  onOpenDetailModal: (spot: DiscoverySpot) => void;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  spots,
  selectedSpot,
  onSelectSpot,
  onOpenDetailModal
}) => {
  const [hoveredSpot, setHoveredSpot] = useState<DiscoverySpot | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [showTransitLines, setShowTransitLines] = useState<boolean>(true);

  const activeSpot = hoveredSpot || selectedSpot || spots[0];

  return (
    <div className="relative w-full bg-[#EAE8E4] border border-[#E8E4DC] rounded-[4px] overflow-hidden shadow-xs">
      {/* Map Header / District Filter Bar */}
      <div className="p-4 bg-white/95 backdrop-blur-md border-b border-[#E8E4DC] flex flex-wrap items-center justify-between gap-4 z-20 relative">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#5A6C64] block">
            Spatial Cartography · Singapore Central Heritage & Canopy
          </span>
          <h2 className="font-serif text-lg font-semibold text-[#0F382A]">
            The Living Botanical & Transit Map
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowTransitLines(!showTransitLines)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-full border transition-all cursor-pointer flex items-center gap-1.5 ${
              showTransitLines
                ? 'bg-[#0F382A] text-white border-[#0F382A]'
                : 'bg-white text-[#5A6C64] border-[#E8E4DC] hover:text-[#0F382A]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>MRT Grid Overlay</span>
          </button>

          <div className="flex items-center bg-white border border-[#E8E4DC] rounded-full p-0.5">
            <button
              onClick={() => setZoomLevel((z) => Math.min(1.4, z + 0.1))}
              className="p-1.5 hover:bg-[#F5F3EF] rounded-full text-[#1B2421] transition-colors cursor-pointer"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setZoomLevel((z) => Math.max(0.8, z - 0.1))}
              className="p-1.5 hover:bg-[#F5F3EF] rounded-full text-[#1B2421] transition-colors cursor-pointer"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setZoomLevel(1)}
              className="p-1.5 hover:bg-[#F5F3EF] rounded-full text-[#1B2421] transition-colors cursor-pointer"
              title="Reset Zoom"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Interactive SVG Map Canvas */}
      <div className="relative w-full h-[540px] overflow-hidden bg-[#F4EFE6] select-none">
        <svg
          viewBox="0 0 1000 650"
          className="w-full h-full transition-transform duration-500 ease-out"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          <defs>
            {/* Subtle paper grid pattern */}
            <pattern id="cartoGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#E2DCD2" strokeWidth="0.5" />
            </pattern>
            {/* Botanical gradient for reservoirs & bays */}
            <linearGradient id="waterwayGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#C9D6CE" />
              <stop offset="100%" stopColor="#BACDC3" />
            </linearGradient>
            {/* Soft shadow for markers */}
            <filter id="markerShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#0F382A" floodOpacity="0.25" />
            </filter>
            <filter id="activeShadow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#F26440" floodOpacity="0.35" />
            </filter>
          </defs>

          {/* Grid Background */}
          <rect width="1000" height="650" fill="#F8F6F0" />
          <rect width="1000" height="650" fill="url(#cartoGrid)" />

          {/* Geographical Waterways: Singapore Strait, Marina Bay, Singapore River, Kallang Basin */}
          <path
            d="M 0,550 Q 250,560 420,530 T 700,520 Q 850,530 1000,550 L 1000,650 L 0,650 Z"
            fill="url(#waterwayGrad)"
            opacity="0.85"
          />
          {/* Sentosa Island Contour */}
          <path
            d="M 300,550 C 330,530 420,540 450,570 C 470,590 420,620 360,610 C 310,600 280,570 300,550 Z"
            fill="#EFE9DC"
            stroke="#D6CEBE"
            strokeWidth="1.5"
          />
          <text x="375" y="580" fill="#5A6C64" fontSize="10" fontFamily="Plus Jakarta Sans" fontWeight="600" letterSpacing="0.08em" textAnchor="middle">
            SENTOSA
          </text>

          {/* Marina Reservoir & Singapore River curve */}
          <path
            d="M 430,380 Q 480,390 530,370 T 620,380 C 670,390 710,430 730,480 C 740,510 680,540 600,530 C 540,520 500,470 510,430 T 430,380 Z"
            fill="url(#waterwayGrad)"
            opacity="0.9"
            stroke="#B4C7BD"
            strokeWidth="1"
          />
          {/* Singapore River Estuary */}
          <path
            d="M 420,380 Q 480,360 520,390 T 560,420"
            fill="none"
            stroke="#B4C7BD"
            strokeWidth="8"
            strokeLinecap="round"
          />

          {/* District Boundary & Canopy Shading */}
          <ellipse cx="280" cy="220" rx="90" ry="70" fill="#E2ECE6" opacity="0.6" />
          <text x="280" y="210" fill="#3F6656" fontSize="11" fontFamily="Playfair Display" fontStyle="italic" textAnchor="middle">
            Botanic Gardens UNESCO Reserve
          </text>

          <ellipse cx="660" cy="380" rx="80" ry="60" fill="#E2ECE6" opacity="0.6" />
          <text x="660" y="375" fill="#3F6656" fontSize="11" fontFamily="Playfair Display" fontStyle="italic" textAnchor="middle">
            Marina Bay Botanical Corridor
          </text>

          {/* Authentic MRT Lines Overlay */}
          {showTransitLines && (
            <g opacity="0.8">
              {/* Downtown Line (DT Blue #005EC4) */}
              <path
                d="M 180,180 L 280,220 L 400,280 L 480,330 L 550,330 L 620,390 L 650,420"
                fill="none"
                stroke="#005EC4"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeDasharray="none"
              />
              {/* Thomson-East Coast (TE Brown #9D5B25) */}
              <path
                d="M 280,120 L 360,200 L 460,300 L 500,380 L 530,420 L 640,430 L 800,350 L 900,340"
                fill="none"
                stroke="#9D5B25"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              {/* Circle Line (CC Orange #FA9E0D) */}
              <path
                d="M 280,220 C 240,320 280,480 380,510 C 440,530 520,490 560,420"
                fill="none"
                stroke="#FA9E0D"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              {/* North-South Line (NS Red #D42E12) */}
              <path
                d="M 380,100 L 420,240 L 480,330 L 520,430 L 550,500"
                fill="none"
                stroke="#D42E12"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </g>
          )}

          {/* Interactive Spot Pins */}
          {spots.map((spot) => {
            // Map coordinates from 0-100% to svg space
            const cx = (spot.coordinates.x / 100) * 1000;
            const cy = (spot.coordinates.y / 100) * 650;
            const isHovered = hoveredSpot?.id === spot.id;
            const isSelected = selectedSpot?.id === spot.id;
            const isActive = isHovered || isSelected;

            return (
              <g
                key={spot.id}
                transform={`translate(${cx}, ${cy})`}
                className="cursor-pointer transition-all duration-300"
                onClick={() => onSelectSpot(spot)}
                onMouseEnter={() => setHoveredSpot(spot)}
                onMouseLeave={() => setHoveredSpot(null)}
              >
                {/* Teardrop / Pill Botanical Marker */}
                <g filter={isActive ? 'url(#activeShadow)' : 'url(#markerShadow)'}>
                  {/* Pin Base Pulsing Ring when Active */}
                  {isActive && (
                    <circle
                      r="22"
                      fill="#F26440"
                      opacity="0.25"
                      className="animate-ping"
                    />
                  )}

                  {/* Marker Pin Teardrop Shape */}
                  <path
                    d="M 0,-34 C -12,-34 -18,-24 -18,-14 C -18,-2 -6,8 0,22 C 6,8 18,-2 18,-14 C 18,-24 12,-34 0,-34 Z"
                    fill={isActive ? '#F26440' : '#0F382A'}
                    stroke="#FFFFFF"
                    strokeWidth="2"
                    className="transition-colors duration-200"
                    transform={isActive ? 'scale(1.15) translate(0, -2)' : 'scale(1)'}
                  />

                  {/* White Center Dot or Icon */}
                  <circle
                    cx="0"
                    cy={isActive ? -18 : -14}
                    r="5"
                    fill="#FFFFFF"
                    className="transition-all duration-200"
                  />
                </g>

                {/* Pin Label Label Microcopy */}
                <g transform="translate(0, 30)">
                  <rect
                    x="-65"
                    y="-10"
                    width="130"
                    height="18"
                    rx="9"
                    fill={isActive ? '#0F382A' : '#FFFFFF'}
                    stroke={isActive ? '#0F382A' : '#E8E4DC'}
                    strokeWidth="1"
                    opacity={isActive ? '1' : '0.9'}
                  />
                  <text
                    x="0"
                    y="3"
                    fill={isActive ? '#FFFFFF' : '#1B2421'}
                    fontSize="9"
                    fontFamily="Plus Jakarta Sans"
                    fontWeight="600"
                    textAnchor="middle"
                  >
                    {spot.title.split('&')[0].trim()}
                  </text>
                </g>
              </g>
            );
          })}
        </svg>

        {/* Floating Active Spot Inspector Card */}
        {activeSpot && (
          <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:w-[360px] bg-white/95 backdrop-blur-md border border-[#E8E4DC] rounded-[4px] p-4 shadow-[0_8px_24px_-4px_rgba(15,56,42,0.12)] transition-all duration-300 z-30">
            <div className="flex items-start gap-3">
              <img
                src={activeSpot.image}
                alt={activeSpot.title}
                referrerPolicy="no-referrer"
                className="w-20 h-20 rounded-[3px] object-cover shrink-0 border border-[#E8E4DC]"
              />

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 text-[11px] text-[#5A6C64] mb-1 font-medium">
                  <span className="truncate">{activeSpot.neighborhood}</span>
                  <span>·</span>
                  <span className="font-mono">{activeSpot.priceTier}</span>
                </div>

                <h4 className="font-serif text-base font-semibold text-[#1B2421] truncate mb-1">
                  {activeSpot.title}
                </h4>

                <div className="flex items-center gap-2 mb-2">
                  <GooglePlacesBadge rating={activeSpot.rating} reviewsCount={activeSpot.reviewsCount} />
                </div>
              </div>
            </div>

            <div className="mt-3 pt-2.5 border-t border-[#E8E4DC] flex items-center justify-between text-xs">
              <MrtBadge mrt={activeSpot.mrt} showExit={true} />

              <button
                onClick={() => onOpenDetailModal(activeSpot)}
                className="flex items-center gap-1 font-semibold text-[#0F382A] hover:text-[#F26440] transition-colors cursor-pointer"
              >
                <span>Full Guide</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Map Legend */}
      <div className="p-3 bg-white border-t border-[#E8E4DC] flex flex-wrap items-center justify-between gap-3 text-xs text-[#5A6C64]">
        <div className="flex items-center gap-4 flex-wrap">
          <span className="font-semibold text-[#0F382A] text-[11px] uppercase tracking-wider">
            Transit Key:
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#005EC4]" /> Downtown (DT)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#9D5B25]" /> Thomson-East Coast (TE)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FA9E0D]" /> Circle (CC)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D42E12]" /> North-South (NS)
          </span>
        </div>

        <span className="font-mono text-[11px]">
          Hover or click pins to inspect neighborhood connections
        </span>
      </div>
    </div>
  );
};
