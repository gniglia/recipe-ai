"use client";

import { motion } from "framer-motion";
import { Filter, X, Sparkles, ChefHat, ArrowUpDown } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GradientButton } from "@/components/ui/gradient-button";
import { useRecipeStore } from "@/stores/recipe-store";
import { Recipe } from "@/types/recipe";

import { RecipeCard } from "./recipe-card";
import { RecipeDetailModal } from "./recipe-detail-modal";


export function RecipeList() {
  const {
    filteredRecipes,
    selectedRecipe,
    searchQuery,
    filters,
    isLoading,
    setFilters,
    clearFilters,
    setSelectedRecipe,
  } = useRecipeStore();

  const handleRecipeClick = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    // TODO: Navigate to recipe detail page
    console.log("Selected recipe:", recipe.title);
  };

  const handleClearFilters = () => {
    clearFilters();
  };

  const activeFiltersCount =
    Object.entries(filters).filter(([key, value]) => {
      if (key === "source" && value === "all") return false;
      return value !== undefined && value !== null;
    }).length + (searchQuery ? 1 : 0);

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Filters */}
      <div className="space-y-3 sm:space-y-4">
        {/* Filter Tags */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs sm:text-sm text-muted-foreground">
                Filter by:
              </span>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
              <select
                value={filters.sortBy || "default"}
                onChange={(e) =>
                  setFilters({
                    sortBy:
                      e.target.value === "default"
                        ? undefined
                        : (e.target.value as
                            | "newest"
                            | "cookTime"
                            | "difficulty"
                            | "title"),
                  })
                }
                className="text-xs sm:text-sm border border-orange-200 rounded-md px-2 py-1 bg-white/70 focus:border-orange-300 focus:ring-orange-200 cursor-pointer"
              >
                <option value="default">Smart Sort</option>
                <option value="newest">Newest First</option>
                <option value="cookTime">Quickest</option>
                <option value="difficulty">Easiest</option>
                <option value="title">A-Z</option>
              </select>
            </div>
          </div>

          {/* Source Filter Row */}
          <div className="flex flex-wrap gap-2">
            <GradientButton
              variant="purple-pink"
              isActive={filters.source === "ai-generated"}
              onClick={() =>
                setFilters({
                  source:
                    filters.source === "ai-generated"
                      ? undefined
                      : "ai-generated",
                })
              }
              className="text-xs sm:text-sm h-8 px-3"
              size="sm"
            >
              <Sparkles className="h-3 w-3 mr-1" />
              AI Generated
            </GradientButton>

            <Button
              variant="ghost"
              size="sm"
              onClick={() =>
                setFilters({
                  source: filters.source === "regular" ? undefined : "regular",
                })
              }
              className={`text-xs sm:text-sm h-8 px-3 transition-all duration-200 ${
                filters.source === "regular"
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg border-0"
                  : "bg-white/20 text-white border border-white/30 hover:bg-white/30 backdrop-blur-sm"
              }`}
            >
              <ChefHat className="h-3 w-3 mr-1" />
              Regular
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() =>
                setFilters({
                  difficulty:
                    filters.difficulty === "easy" ? undefined : "easy",
                })
              }
              className={`text-xs sm:text-sm h-8 px-3 transition-all duration-200 ${
                filters.difficulty === "easy"
                  ? "bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-lg border-0"
                  : "bg-white/20 text-white border border-white/30 hover:bg-white/30 backdrop-blur-sm"
              }`}
            >
              Easy
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() =>
                setFilters({
                  maxPrepTime: filters.maxPrepTime === 30 ? undefined : 30,
                })
              }
              className={`text-xs sm:text-sm h-8 px-3 transition-all duration-200 ${
                filters.maxPrepTime === 30
                  ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg border-0"
                  : "bg-white/20 text-white border border-white/30 hover:bg-white/30 backdrop-blur-sm"
              }`}
            >
              Quick (≤30min)
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                const currentCuisines = filters.cuisine || [];
                const isSelected = currentCuisines.includes("Italian");
                setFilters({
                  cuisine: isSelected
                    ? currentCuisines.filter((c) => c !== "Italian")
                    : [...currentCuisines, "Italian"],
                });
              }}
              className={`text-xs sm:text-sm h-8 px-3 transition-all duration-200 ${
                filters.cuisine?.includes("Italian")
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg border-0"
                  : "bg-white/20 text-white border border-white/30 hover:bg-white/30 backdrop-blur-sm"
              }`}
            >
              Italian
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                const currentCuisines = filters.cuisine || [];
                const isSelected = currentCuisines.includes("Indian");
                setFilters({
                  cuisine: isSelected
                    ? currentCuisines.filter((c) => c !== "Indian")
                    : [...currentCuisines, "Indian"],
                });
              }}
              className={`text-xs sm:text-sm h-8 px-3 transition-all duration-200 ${
                filters.cuisine?.includes("Indian")
                  ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg border-0"
                  : "bg-white/20 text-white border border-white/30 hover:bg-white/30 backdrop-blur-sm"
              }`}
            >
              Indian
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                const currentCuisines = filters.cuisine || [];
                const isSelected = currentCuisines.includes("Mediterranean");
                setFilters({
                  cuisine: isSelected
                    ? currentCuisines.filter((c) => c !== "Mediterranean")
                    : [...currentCuisines, "Mediterranean"],
                });
              }}
              className={`text-xs sm:text-sm h-8 px-3 transition-all duration-200 ${
                filters.cuisine?.includes("Mediterranean")
                  ? "bg-gradient-to-r from-teal-500 to-blue-500 text-white shadow-lg border-0"
                  : "bg-white/20 text-white border border-white/30 hover:bg-white/30 backdrop-blur-sm"
              }`}
            >
              Mediterranean
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                const currentCuisines = filters.cuisine || [];
                const isSelected = currentCuisines.includes("Thai");
                setFilters({
                  cuisine: isSelected
                    ? currentCuisines.filter((c) => c !== "Thai")
                    : [...currentCuisines, "Thai"],
                });
              }}
              className={`text-xs sm:text-sm h-8 px-3 transition-all duration-200 ${
                filters.cuisine?.includes("Thai")
                  ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg border-0"
                  : "bg-white/20 text-white border border-white/30 hover:bg-white/30 backdrop-blur-sm"
              }`}
            >
              Thai
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                const currentCuisines = filters.cuisine || [];
                const isSelected = currentCuisines.includes("American");
                setFilters({
                  cuisine: isSelected
                    ? currentCuisines.filter((c) => c !== "American")
                    : [...currentCuisines, "American"],
                });
              }}
              className={`text-xs sm:text-sm h-8 px-3 transition-all duration-200 ${
                filters.cuisine?.includes("American")
                  ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg border-0"
                  : "bg-white/20 text-white border border-white/30 hover:bg-white/30 backdrop-blur-sm"
              }`}
            >
              American
            </Button>

            {activeFiltersCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearFilters}
                className="text-white/80 hover:text-white text-xs sm:text-sm h-8 px-3 border-white/30 hover:border-white/50"
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
        <div className="text-xs sm:text-sm text-white/90 drop-shadow-md">
          <span className="font-medium text-white drop-shadow-lg">
            {filteredRecipes.length}
          </span>{" "}
          recipe
          {filteredRecipes.length !== 1 ? "s" : ""}
          {searchQuery ? (
            <span> matching &quot;{searchQuery}&quot;</span>
          ) : (
            " found"
          )}
        </div>

        {/* Active Filters Display - Mobile: wrap, Desktop: inline */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap items-center gap-1 sm:gap-2">
            <span className="text-xs text-white/80 hidden sm:inline drop-shadow-md">
              Active:
            </span>
            {searchQuery && (
              <Badge
                variant="secondary"
                className="text-xs bg-blue-500/20 text-white border-blue-400/50 backdrop-blur-sm"
              >
                🔍{" "}
                {searchQuery.length > 12
                  ? searchQuery.slice(0, 12) + "..."
                  : searchQuery}
              </Badge>
            )}
            {filters.difficulty && (
              <Badge
                variant="secondary"
                className="text-xs bg-emerald-500/20 text-white border-emerald-400/50 backdrop-blur-sm"
              >
                {filters.difficulty}
              </Badge>
            )}
            {filters.maxPrepTime && (
              <Badge
                variant="secondary"
                className="text-xs bg-amber-500/20 text-white border-amber-400/50 backdrop-blur-sm"
              >
                ≤{filters.maxPrepTime}min
              </Badge>
            )}
            {filters.cuisine && (
              <Badge
                variant="secondary"
                className="text-xs bg-blue-500/20 text-white border-blue-400/50 backdrop-blur-sm"
              >
                {filters.cuisine}
              </Badge>
            )}
            {filters.source && filters.source !== "all" && (
              <Badge
                variant="secondary"
                className={`text-xs ${
                  filters.source === "ai-generated"
                    ? "bg-purple-100 text-purple-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {filters.source === "ai-generated" ? "✨ AI" : "👨‍🍳 Regular"}
              </Badge>
            )}
            {filters.sortBy && (
              <Badge
                variant="secondary"
                className="text-xs bg-gray-100 text-gray-700"
              >
                Sort:{" "}
                {filters.sortBy === "newest"
                  ? "Newest"
                  : filters.sortBy === "cookTime"
                  ? "Quickest"
                  : filters.sortBy === "difficulty"
                  ? "Easiest"
                  : filters.sortBy === "title"
                  ? "A-Z"
                  : filters.sortBy}
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
          <div className="text-base sm:text-lg text-white mb-2 font-medium drop-shadow-lg">
            No recipes found
          </div>
          <div className="text-xs sm:text-sm text-white/90 drop-shadow-md">
            Try adjusting your search or filters
          </div>
        </div>
      )}

      {/* Recipe Grid */}
      {!isLoading && filteredRecipes.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4">
          {filteredRecipes.map((recipe, index) => (
            <motion.div
              key={recipe.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <RecipeCard
                recipe={recipe}
                onClick={() => handleRecipeClick(recipe)}
              />
            </motion.div>
          ))}
        </div>
      )}

      <RecipeDetailModal
        recipe={selectedRecipe}
        open={!!selectedRecipe}
        onOpenChange={(open) => {
          if (!open) setSelectedRecipe(null);
        }}
      />
    </div>
  );
}
