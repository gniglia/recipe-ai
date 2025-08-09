"use client";

import { DietaryFilters } from "@/components/recipe/dietary-filters";
import { RecipeList } from "@/components/recipe/recipe-list";
import { useRecipeStore } from "@/stores/recipe-store";

export function RecipeShowcase() {
  const { setFilters, filters } = useRecipeStore();

  const handleDietaryFilterChange = (filterId: string) => {
    if (filterId === "all") {
      // Clear dietary filters
      setFilters({ dietary: [] });
    } else {
      // Set single dietary filter (replace existing)
      setFilters({ dietary: [filterId] });
    }
  };

  return (
    <div className="space-y-8 sm:space-y-12">
      {/* Dietary Filters */}
      <DietaryFilters
        onFilterChange={handleDietaryFilterChange}
        className="pt-4 sm:pt-8"
      />

      {/* Recipe Collection */}
      <div>
        <RecipeList />
      </div>
    </div>
  );
}
