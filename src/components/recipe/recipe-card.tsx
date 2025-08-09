import { Recipe } from "@/types/recipe";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, ChefHat, Heart, Star } from "lucide-react";
import { getRecipeGradient, getRecipeIcon } from "@/lib/image-service";

interface RecipeCardProps {
  recipe: Recipe;
  onClick?: () => void;
}

export function RecipeCard({ recipe, onClick }: RecipeCardProps) {
  const totalTime = recipe.prepTime + recipe.cookTime;

  // Generate a consistent rating based on recipe ID for demo purposes
  const hash = recipe.id.split("").reduce((a, b) => a + b.charCodeAt(0), 0);
  const rating = 4.0 + (hash % 10) / 10;
  const reviewCount = 50 + (hash % 200);

  // Get recipe-specific gradient and icon
  const gradient = getRecipeGradient(recipe.title);
  const icon = getRecipeIcon(recipe.title);

  return (
    <Card
      className="group hover:shadow-xl transition-all duration-300 cursor-pointer bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:-translate-y-1 overflow-hidden"
      onClick={onClick}
    >
      {/* Recipe Image with Smart Placeholder */}
      <div
        className={`relative h-40 sm:h-48 bg-gradient-to-br ${gradient} overflow-hidden`}
      >
        {recipe.imageUrl ? (
          <>
            <img
              src={recipe.imageUrl}
              alt={recipe.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </>
        ) : (
          <>
            {/* Beautiful gradient placeholder with recipe icon */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-6xl sm:text-7xl opacity-20">{icon}</div>
            </div>
          </>
        )}

        {/* Favorite Button */}
        <button className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors group">
          <Heart className="h-4 w-4 text-gray-600 group-hover:text-rose-500 transition-colors" />
        </button>

        {/* Difficulty Badge */}
        <div className="absolute top-3 left-3">
          <Badge
            className={
              recipe.difficulty === "easy"
                ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-emerald-200"
                : recipe.difficulty === "medium"
                ? "bg-amber-100 text-amber-700 hover:bg-amber-200 border-amber-200"
                : "bg-rose-100 text-rose-700 hover:bg-rose-200 border-rose-200"
            }
          >
            {recipe.difficulty}
          </Badge>
        </div>

        {/* Cooking Time */}
        <div className="absolute bottom-3 left-3">
          <div className="flex items-center gap-1 px-2 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs text-gray-700">
            <Clock className="h-3 w-3" />
            <span>{totalTime} min</span>
          </div>
        </div>
      </div>

      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg line-clamp-2 group-hover:text-orange-600 transition-colors">
            {recipe.title}
          </CardTitle>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 text-sm">
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
            <span className="font-medium text-gray-700">
              {rating.toFixed(1)}
            </span>
          </div>
          <span className="text-gray-400">•</span>
          <span className="text-gray-500">{reviewCount} reviews</span>
        </div>

        <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
          {recipe.description}
        </p>
      </CardHeader>

      <CardContent className="pt-0">
        {/* Recipe Info */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-3 pb-3 border-b border-gray-100">
          <div className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            <span>{recipe.servings} servings</span>
          </div>
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
      </CardContent>
    </Card>
  );
}
