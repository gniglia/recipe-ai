"use client";

import { Clock, Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Recipe } from "@/types/recipe";

interface RecipeDetailModalProps {
  recipe: Recipe | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function RecipeDetailModal({
  recipe,
  open,
  onOpenChange,
}: RecipeDetailModalProps) {
  if (!recipe) return null;

  const totalTime = recipe.prepTime + recipe.cookTime;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[95vh] overflow-hidden p-0 bg-white">
        <div className="overflow-y-auto max-h-[95vh]">
          {/* Header */}
          <div className="p-8 pb-6">
            {/* Rating Stars */}
            <div className="flex items-center gap-1 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <span key={star} className="text-amber-400 text-lg">
                  ★
                </span>
              ))}
              <span className="ml-2 text-lg font-medium text-gray-900">
                5.0
              </span>
            </div>

            {/* Title */}
            <DialogTitle className="text-3xl font-bold text-gray-900 mb-6 leading-tight">
              {recipe.title}
            </DialogTitle>

            {/* Meta badges */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <Badge className="bg-orange-100 text-orange-700 border-orange-200 px-3 py-1 text-sm font-medium rounded-full">
                {recipe.cuisine || "Recipe"}
              </Badge>
              <div className="flex items-center gap-1 text-gray-600">
                <Clock className="h-4 w-4" />
                <span className="text-sm">{totalTime} min</span>
              </div>
              <div className="flex items-center gap-1 text-gray-600">
                <Users className="h-4 w-4" />
                <span className="text-sm">
                  {recipe.servings}-{recipe.servings + 2}
                </span>
              </div>
            </div>
          </div>

          {/* Ingredients */}
          <div className="px-8 mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-5 tracking-wide uppercase text-sm">
              INGREDIENTS
            </h2>
            <div className="space-y-2.5">
              {recipe.ingredients.map((ing) => (
                <div key={ing.id} className="flex items-start gap-4">
                  <span className="text-gray-900 font-medium text-sm min-w-0">
                    • {ing.amount} {ing.unit}
                  </span>
                  <span className="text-gray-600 flex-1 text-sm leading-relaxed">
                    {ing.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="mx-8 border-t border-gray-200 mb-8"></div>

          {/* Preparation */}
          <div className="px-8 mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-5 tracking-wide uppercase text-sm">
              PREPARATION
            </h2>
            <div className="space-y-5">
              {recipe.steps
                .sort((a, b) => a.stepNumber - b.stepNumber)
                .map((step) => (
                  <div key={step.id} className="flex gap-4">
                    <div className="flex-shrink-0 w-7 h-7 bg-gray-800 text-white rounded-full flex items-center justify-center text-xs font-semibold">
                      {step.stepNumber}
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-600 leading-relaxed text-sm">
                        {step.instruction}
                        {step.estimatedTime && (
                          <span className="text-gray-500 text-xs ml-2">
                            ({step.estimatedTime} min)
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Nutrition */}
          {recipe.nutritionInfo && (
            <>
              {/* Divider */}
              <div className="mx-8 border-t border-gray-200 mb-8"></div>

              <div className="px-8 mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4 tracking-wide uppercase text-sm">
                  NUTRITION
                </h2>
                <div className="grid grid-cols-4 gap-2">
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <div className="text-xs text-gray-500 mb-1">Calories</div>
                    <div className="text-sm font-semibold text-gray-900">
                      {recipe.nutritionInfo.calories}
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <div className="text-xs text-gray-500 mb-1">Protein</div>
                    <div className="text-sm font-semibold text-gray-900">
                      {recipe.nutritionInfo.protein}g
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <div className="text-xs text-gray-500 mb-1">Carbs</div>
                    <div className="text-sm font-semibold text-gray-900">
                      {recipe.nutritionInfo.carbs}g
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <div className="text-xs text-gray-500 mb-1">Fat</div>
                    <div className="text-sm font-semibold text-gray-900">
                      {recipe.nutritionInfo.fat}g
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
