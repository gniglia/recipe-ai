"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface DietaryFilter {
  id: string;
  label: string;
  emoji: string;
  color: string;
  description: string;
}

const dietaryFilters: DietaryFilter[] = [
  {
    id: "all",
    label: "All",
    emoji: "🍽️",
    color: "bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-200",
    description: "Show all recipes",
  },
  {
    id: "vegetarian",
    label: "Vegetarian",
    emoji: "🥬",
    color: "bg-green-100 text-green-700 hover:bg-green-200 border-green-200",
    description: "No meat or fish",
  },
  {
    id: "vegan",
    label: "Vegan",
    emoji: "🌱",
    color:
      "bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-emerald-200",
    description: "Plant-based only",
  },
  {
    id: "gluten-free",
    label: "Gluten-Free",
    emoji: "🌾",
    color: "bg-amber-100 text-amber-700 hover:bg-amber-200 border-amber-200",
    description: "No gluten ingredients",
  },
  {
    id: "dairy-free",
    label: "Dairy-Free",
    emoji: "🥛",
    color: "bg-blue-100 text-blue-700 hover:bg-blue-200 border-blue-200",
    description: "No dairy products",
  },
  {
    id: "keto",
    label: "Keto",
    emoji: "🥑",
    color:
      "bg-purple-100 text-purple-700 hover:bg-purple-200 border-purple-200",
    description: "Low carb, high fat",
  },
  {
    id: "paleo",
    label: "Paleo",
    emoji: "🦴",
    color:
      "bg-orange-100 text-orange-700 hover:bg-orange-200 border-orange-200",
    description: "Whole foods diet",
  },
];

interface DietaryFiltersProps {
  onFilterChange?: (filterId: string) => void;
  className?: string;
}

export function DietaryFilters({
  onFilterChange,
  className,
}: DietaryFiltersProps) {
  const [activeFilter, setActiveFilter] = useState("all");

  const handleFilterClick = (filterId: string) => {
    setActiveFilter(filterId);
    onFilterChange?.(filterId);
  };

  return (
    <div className={className}>
      <div className="mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
          Recipes Based on Dietary Preferences
        </h2>
        <div className="w-16 h-1 bg-gradient-to-r from-orange-500 to-rose-500 rounded-full"></div>
      </div>

      {/* Desktop: Horizontal scroll, Mobile: Grid */}
      <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-4 sm:pb-0 scrollbar-hide">
        {dietaryFilters.map((filter) => (
          <Button
            key={filter.id}
            variant={activeFilter === filter.id ? "default" : "outline"}
            className={`
              flex-shrink-0 h-auto p-3 sm:p-4 flex flex-col items-center gap-2 min-w-[80px] sm:min-w-[100px]
              ${
                activeFilter === filter.id
                  ? "bg-gradient-to-br from-orange-500 to-rose-500 text-white border-0 shadow-lg"
                  : filter.color
              }
              transition-all duration-200 hover:scale-105
            `}
            onClick={() => handleFilterClick(filter.id)}
          >
            <span className="text-lg sm:text-xl">{filter.emoji}</span>
            <span className="text-xs sm:text-sm font-medium text-center leading-tight">
              {filter.label}
            </span>
          </Button>
        ))}
      </div>

      {/* Active filter description */}
      {activeFilter !== "all" && (
        <div className="mt-4 flex items-center gap-2">
          <Badge
            variant="secondary"
            className="bg-orange-50 text-orange-700 border-orange-200"
          >
            {dietaryFilters.find((f) => f.id === activeFilter)?.emoji}{" "}
            {dietaryFilters.find((f) => f.id === activeFilter)?.label}
          </Badge>
          <span className="text-sm text-gray-600">
            {dietaryFilters.find((f) => f.id === activeFilter)?.description}
          </span>
        </div>
      )}

      {/* Recipe count indicator */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
        <span className="text-sm text-gray-600">
          Showing recipes for:{" "}
          <span className="font-medium text-gray-800">
            {dietaryFilters.find((f) => f.id === activeFilter)?.label}
          </span>
        </span>
        <span className="text-xs text-gray-500">1 / 15</span>
      </div>
    </div>
  );
}

// Add custom scrollbar styles to globals.css
export const dietaryFilterStyles = `
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
`;
