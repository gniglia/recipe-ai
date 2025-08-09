"use client";

import { DietaryFilters } from "@/components/recipe/dietary-filters";
import { RecipeList } from "@/components/recipe/recipe-list";

export function RecipeShowcase() {
  const handleDietaryFilterChange = (filterId: string) => {
    // TODO: Integrate with recipe filtering logic
    console.log("Dietary filter changed:", filterId);
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
