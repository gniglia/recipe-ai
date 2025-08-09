"use client";

import { useRecipeStore } from "@/stores/recipe-store";
import { RecipeCard } from "./recipe-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, X } from "lucide-react";

export function RecipeList() {
  const {
    filteredRecipes,
    searchQuery,
    filters,
    isLoading,
    setSearchQuery,
    setFilters,
    clearFilters,
    setSelectedRecipe,
  } = useRecipeStore();

  const handleRecipeClick = (recipe: any) => {
    setSelectedRecipe(recipe);
    // TODO: Navigate to recipe detail page
    console.log("Selected recipe:", recipe.title);
  };

  const handleClearFilters = () => {
    clearFilters();
  };

  const activeFiltersCount =
    Object.keys(filters).length + (searchQuery ? 1 : 0);

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Search and Filters */}
      <div className="space-y-3 sm:space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search recipes, ingredients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white/70 border-orange-200 focus:border-orange-300 focus:ring-orange-200"
          />
        </div>

        {/* Filter Tags */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs sm:text-sm text-muted-foreground">
              Quick Filters:
            </span>
          </div>

          {/* Mobile-friendly filter buttons */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant={filters.difficulty === "easy" ? "default" : "outline"}
              size="sm"
              onClick={() =>
                setFilters({
                  difficulty:
                    filters.difficulty === "easy" ? undefined : "easy",
                })
              }
              className="text-xs sm:text-sm h-8 px-3"
            >
              Easy
            </Button>

            <Button
              variant={filters.maxPrepTime === 30 ? "default" : "outline"}
              size="sm"
              onClick={() =>
                setFilters({
                  maxPrepTime: filters.maxPrepTime === 30 ? undefined : 30,
                })
              }
              className="text-xs sm:text-sm h-8 px-3"
            >
              Quick (≤30min)
            </Button>

            <Button
              variant={filters.cuisine === "Italian" ? "default" : "outline"}
              size="sm"
              onClick={() =>
                setFilters({
                  cuisine:
                    filters.cuisine === "Italian" ? undefined : "Italian",
                })
              }
              className="text-xs sm:text-sm h-8 px-3"
            >
              Italian
            </Button>

            {activeFiltersCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearFilters}
                className="text-muted-foreground text-xs sm:text-sm h-8 px-3"
              >
                <X className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                <span className="hidden sm:inline">Clear </span>(
                {activeFiltersCount})
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Results Summary */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
        <div className="text-xs sm:text-sm text-muted-foreground">
          <span className="font-medium">{filteredRecipes.length}</span> recipe
          {filteredRecipes.length !== 1 ? "s" : ""} found
          {searchQuery && (
            <span className="hidden sm:inline"> for "{searchQuery}"</span>
          )}
        </div>

        {/* Active Filters Display - Mobile: wrap, Desktop: inline */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap items-center gap-1 sm:gap-2">
            <span className="text-xs text-muted-foreground hidden sm:inline">
              Active:
            </span>
            {searchQuery && (
              <Badge
                variant="secondary"
                className="text-xs bg-orange-100 text-orange-700"
              >
                Search:{" "}
                {searchQuery.length > 10
                  ? searchQuery.slice(0, 10) + "..."
                  : searchQuery}
              </Badge>
            )}
            {filters.difficulty && (
              <Badge
                variant="secondary"
                className="text-xs bg-emerald-100 text-emerald-700"
              >
                {filters.difficulty}
              </Badge>
            )}
            {filters.maxPrepTime && (
              <Badge
                variant="secondary"
                className="text-xs bg-amber-100 text-amber-700"
              >
                ≤{filters.maxPrepTime}min
              </Badge>
            )}
            {filters.cuisine && (
              <Badge
                variant="secondary"
                className="text-xs bg-blue-100 text-blue-700"
              >
                {filters.cuisine}
              </Badge>
            )}
          </div>
        )}
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="text-center py-8 sm:py-12">
          <div className="text-sm sm:text-base text-muted-foreground">
            Loading recipes...
          </div>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && filteredRecipes.length === 0 && (
        <div className="text-center py-8 sm:py-12">
          <div className="text-6xl mb-4">🍽️</div>
          <div className="text-base sm:text-lg text-muted-foreground mb-2">
            No recipes found
          </div>
          <div className="text-xs sm:text-sm text-muted-foreground">
            Try adjusting your search or filters
          </div>
        </div>
      )}

      {/* Recipe Grid - Mobile: 1 column, Tablet: 2 columns, Desktop: 3 columns */}
      {!isLoading && filteredRecipes.length > 0 && (
        <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {filteredRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onClick={() => handleRecipeClick(recipe)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
