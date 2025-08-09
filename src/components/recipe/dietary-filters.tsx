"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { useRecipeStore } from "@/stores/recipe-store";

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
    color: "",
    description: "Show all recipes",
  },
  {
    id: "vegetarian",
    label: "Vegetarian",
    emoji: "🥬",
    color: "",
    description: "No meat or fish",
  },
  {
    id: "vegan",
    label: "Vegan",
    emoji: "🌱",
    color: "",
    description: "Plant-based only",
  },
  {
    id: "gluten-free",
    label: "Gluten-Free",
    emoji: "🌾",
    color: "",
    description: "No gluten ingredients",
  },
  {
    id: "dairy-free",
    label: "Dairy-Free",
    emoji: "🥛",
    color: "",
    description: "No dairy products",
  },
  {
    id: "keto",
    label: "Keto",
    emoji: "🥑",
    color: "",
    description: "Low carb, high fat",
  },
  {
    id: "paleo",
    label: "Paleo",
    emoji: "🦴",
    color: "",
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
  const { filters, filteredRecipes } = useRecipeStore();

  // Determine active filter from store
  const activeFilter = filters.dietary?.length ? filters.dietary[0] : "all";

  const handleFilterClick = (filterId: string) => {
    onFilterChange?.(filterId);
  };

  return (
    <div className={className}>
      <div className="mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 drop-shadow-lg">
          Recipes Based on Dietary Preferences
        </h2>
        <div className="w-16 h-1 bg-gradient-to-r from-emerald-500 to-purple-500 rounded-full"></div>
      </div>

      {/* Compact square dietary filter buttons */}
      <div className="flex gap-3 overflow-x-auto pb-4 sm:pb-0 scrollbar-hide">
        {dietaryFilters.map((filter, index) => (
          <motion.div
            key={filter.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant={activeFilter === filter.id ? "default" : "outline"}
              className={`
                flex-shrink-0 w-16 h-16 p-2 flex flex-col items-center justify-center gap-1 rounded-xl
                ${
                  activeFilter === filter.id
                    ? "bg-gradient-to-br from-emerald-500 to-purple-500 text-white border-0 shadow-lg"
                    : "bg-white/90 backdrop-blur-sm border border-white/30 text-gray-700 hover:bg-white hover:shadow-md"
                }
                transition-all duration-200
              `}
              onClick={() => handleFilterClick(filter.id)}
            >
              <motion.span
                className="text-lg"
                animate={{
                  scale: activeFilter === filter.id ? 1.1 : 1,
                  rotate: activeFilter === filter.id ? [0, 10, -10, 0] : 0,
                }}
                transition={{ duration: 0.3 }}
              >
                {filter.emoji}
              </motion.span>
              <span className="text-[10px] font-medium text-center leading-none">
                {filter.label}
              </span>
            </Button>
          </motion.div>
        ))}
      </div>

      {/* Active filter description */}
      {activeFilter !== "all" && (
        <div className="mt-4 flex items-center gap-2">
          <Badge
            variant="secondary"
            className="bg-emerald-500/20 text-white border-emerald-400/50 backdrop-blur-sm"
          >
            {dietaryFilters.find((f) => f.id === activeFilter)?.emoji}{" "}
            {dietaryFilters.find((f) => f.id === activeFilter)?.label}
          </Badge>
          <span className="text-sm text-white/90 drop-shadow-md">
            {dietaryFilters.find((f) => f.id === activeFilter)?.description}
          </span>
        </div>
      )}

      {/* Recipe count indicator */}
      <motion.div
        className="flex items-center justify-between mt-4 pt-4 border-t border-white/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <span className="text-sm text-white/90 drop-shadow-md">
          Showing recipes for:{" "}
          <span className="font-medium text-white drop-shadow-lg">
            {dietaryFilters.find((f) => f.id === activeFilter)?.label}
          </span>
        </span>
        <motion.span
          className="text-xs text-white/80 drop-shadow-md"
          key={filteredRecipes.length} // Re-animate when count changes
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          {filteredRecipes.length} recipe
          {filteredRecipes.length !== 1 ? "s" : ""}
        </motion.span>
      </motion.div>
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
