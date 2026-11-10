import React from 'react';
import { CATEGORIES } from '../data/discoveries';

interface CategoryFiltersProps {
  selectedCategory: string;
  onSelectCategory: (id: string) => void;
}

export const CategoryFilters: React.FC<CategoryFiltersProps> = ({
  selectedCategory,
  onSelectCategory
}) => {
  return (
    <div className="w-full overflow-x-auto no-scrollbar py-2">
      <div className="flex items-center gap-2.5 min-w-max">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-5 py-2 text-xs font-semibold tracking-wide rounded-full transition-all duration-200 cursor-pointer whitespace-nowrap ${
                isSelected
                  ? 'bg-[#0F382A] text-white shadow-[0_4px_14px_rgba(15,56,42,0.18)] scale-[1.02]'
                  : 'bg-white border border-[#E8E4DC] text-[#1B2421] hover:border-[#0F382A] hover:bg-[#F5F3EF]'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
