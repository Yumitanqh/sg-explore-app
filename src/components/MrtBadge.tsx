import React from 'react';
import { MrtStation } from '../data/discoveries';
import { Train } from 'lucide-react';

interface MrtBadgeProps {
  mrt: MrtStation;
  showExit?: boolean;
}

const LINE_COLORS: Record<string, { bg: string; text: string; name: string }> = {
  DT: { bg: '#005EC4', text: '#FFFFFF', name: 'Downtown Line' },
  TE: { bg: '#9D5B25', text: '#FFFFFF', name: 'Thomson-East Coast' },
  NS: { bg: '#D42E12', text: '#FFFFFF', name: 'North-South Line' },
  EW: { bg: '#009645', text: '#FFFFFF', name: 'East-West Line' },
  CC: { bg: '#FA9E0D', text: '#FFFFFF', name: 'Circle Line' },
  NE: { bg: '#9016B2', text: '#FFFFFF', name: 'North-East Line' },
};

export const MrtBadge: React.FC<MrtBadgeProps> = ({ mrt, showExit = true }) => {
  const lineStyle = LINE_COLORS[mrt.line] || { bg: '#0F382A', text: '#FFFFFF', name: mrt.lineName };

  return (
    <div className="inline-flex items-center gap-2 bg-white/95 border border-[#E8E4DC] rounded-full px-2.5 py-1 text-xs shadow-xs">
      <span
        style={{ backgroundColor: lineStyle.bg, color: lineStyle.text }}
        className="px-1.5 py-0.5 rounded-full font-mono font-bold text-[10px] tracking-wider uppercase leading-none"
      >
        {mrt.code}
      </span>
      <span className="font-medium text-[#1B2421] text-[11px] truncate max-w-[130px]">
        {mrt.station}
      </span>
      {showExit && (
        <span className="text-[#5A6C64] text-[10px] border-l border-[#E8E4DC] pl-1.5 hidden sm:inline">
          {mrt.exit}
        </span>
      )}
    </div>
  );
};
