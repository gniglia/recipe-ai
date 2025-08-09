import { Clock, Users, Star } from "lucide-react";
import { Recipe } from "@/types/recipe";

interface RecipeMetaInfoProps {
  recipe: Recipe;
  showRating?: boolean;
  showTime?: boolean;
  showServings?: boolean;
  variant?: "card" | "modal" | "compact";
  className?: string;
}

export function RecipeMetaInfo({
  recipe,
  showRating = true,
  showTime = true,
  showServings = true,
  variant = "card",
  className = "",
}: RecipeMetaInfoProps) {
  const totalTime = recipe.prepTime + recipe.cookTime;

  // Generate consistent rating for demo
  const hash = recipe.id.split("").reduce((a, b) => a + b.charCodeAt(0), 0);
  const rating = 4.0 + (hash % 10) / 10;
  const reviewCount = 50 + (hash % 200);

  const isCompact = variant === "compact";
  const isModal = variant === "modal";

  return (
    <div
      className={`flex items-center gap-2 ${
        isModal ? "text-sm" : "text-xs sm:text-sm"
      } ${className}`}
    >
      {showRating && (
        <>
          <div className="flex items-center gap-1">
            <Star
              className={`${
                isCompact ? "h-3 w-3" : "h-3 w-3"
              } fill-amber-400 text-amber-400`}
            />
            <span
              className={`font-medium ${
                isModal ? "text-gray-700" : "text-gray-700"
              }`}
            >
              {rating.toFixed(1)}
            </span>
          </div>
          {(showTime || showServings) && (
            <span className="text-gray-400">•</span>
          )}
        </>
      )}

      {showTime && (
        <>
          <div className="flex items-center gap-1">
            <Clock className={`${isCompact ? "h-3 w-3" : "h-3 w-3"}`} />
            <span className={isModal ? "text-gray-600" : "text-gray-500"}>
              {totalTime} min
            </span>
          </div>
          {showServings && <span className="text-gray-400">•</span>}
        </>
      )}

      {showServings && (
        <div className="flex items-center gap-1">
          <Users className={`${isCompact ? "h-3 w-3" : "h-3 w-3"}`} />
          <span className={isModal ? "text-gray-600" : "text-gray-500"}>
            {recipe.servings} servings
          </span>
        </div>
      )}

      {showRating && !isModal && (
        <>
          <span className="text-gray-400">•</span>
          <span className="text-gray-500">{reviewCount} reviews</span>
        </>
      )}
    </div>
  );
}
