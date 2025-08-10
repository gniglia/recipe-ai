import { ChefHat, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { DifficultyBadge } from "@/components/ui/difficulty-badge";
import { useRecipeStore } from "@/stores/recipe-store";
import { Recipe } from "@/types/recipe";

import { FavoriteButton } from "./favorite-button";
import { RecipeImage } from "./recipe-image";
import { RecipeMetaInfo } from "./recipe-meta-info";

interface RecipeCardProps {
  recipe: Recipe;
  onClick?: () => void;
}

export function RecipeCard({ recipe, onClick }: RecipeCardProps) {
  const { toggleFavorite, favoriteRecipeIds } = useRecipeStore();

  // Check if this recipe is favorited
  const isFavorited = favoriteRecipeIds.includes(recipe.id);
  const isAIGenerated =
    recipe.id.startsWith("ai-") || recipe.tags.includes("ai-generated");

  // Handle favorite toggle
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click when clicking heart
    toggleFavorite(recipe.id);
  };

  return (
    <Card
      className="group hover:shadow-xl transition-all duration-300 cursor-pointer bg-white border-0 shadow-lg hover:-translate-y-1 overflow-hidden pt-0 pb-6 h-[420px] flex flex-col rounded-lg"
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`View recipe details for ${recipe.title}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.();
        }
      }}
    >
      {/* Recipe Image with Smart Placeholder */}
      <RecipeImage
        recipe={recipe}
        className="h-48 flex-shrink-0"
        variant="card"
      >
        {/* Favorite Button */}
        <FavoriteButton
          isFavorite={isFavorited}
          onClick={handleFavoriteClick}
          variant="card"
          className="absolute top-3 right-3"
        />

        {/* Difficulty Badge + AI Badge */}
        <div className="absolute top-3 left-3">
          <DifficultyBadge difficulty={recipe.difficulty} />
          {isAIGenerated && (
            <div className="mt-2">
              <Badge className="bg-gradient-to-r from-emerald-500 to-purple-500 text-white border-0">
                <Sparkles className="h-3 w-3 mr-1" /> AI
              </Badge>
            </div>
          )}
        </div>

        {/* Cooking Time */}
        <div className="absolute bottom-3 left-3">
          <div className="px-2 py-1 bg-white/90 backdrop-blur-sm rounded-full">
            <RecipeMetaInfo
              recipe={recipe}
              showRating={false}
              showServings={false}
              variant="compact"
              className="text-xs text-gray-700"
            />
          </div>
        </div>
      </RecipeImage>

      {/* Card Content - Flexible */}
      <div className="flex flex-col flex-1 px-4 pt-3 pb-0">
        {/* Rating */}
        <RecipeMetaInfo
          recipe={recipe}
          showTime={false}
          showServings={false}
          variant="card"
          className="mb-2"
        />

        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 group-hover:text-emerald-600 transition-colors mb-3 min-h-[3rem]">
          {recipe.title}
        </h3>

        {/* Recipe Info */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-2 pb-2 border-b border-gray-100">
          <RecipeMetaInfo
            recipe={recipe}
            showRating={false}
            showTime={false}
            variant="card"
            className="text-sm"
          />
          <div className="flex items-center gap-1">
            <ChefHat className="h-3 w-3" />
            <span>{recipe.cuisine}</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {recipe.tags.slice(0, 3).map((tag, index) => (
            <Badge
              key={`${tag}-${index}`}
              variant="outline"
              className="text-xs bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100 transition-colors"
            >
              {tag}
            </Badge>
          ))}
          {recipe.tags.length > 3 && (
            <Badge
              variant="outline"
              className="text-xs bg-gray-50 text-gray-600 border-gray-200"
            >
              +{recipe.tags.length - 3}
            </Badge>
          )}
        </div>
      </div>
    </Card>
  );
}
