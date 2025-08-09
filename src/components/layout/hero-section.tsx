"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  ChefHat,
  Clock,
  Users,
  Heart,
  Search,
  Wand2,
  Loader2,
} from "lucide-react";
import { useState } from "react";
import { useGenerateRecipe } from "@/hooks/use-recipes";
import { parseIngredientsString } from "@/lib/ai-service";
import { useRecipeStore } from "@/stores/recipe-store";
import { toast } from "sonner";

export function HeroSection() {
  const [ingredientInput, setIngredientInput] = useState("");
  const generateRecipeMutation = useGenerateRecipe();
  const { addRecipe } = useRecipeStore();

  const handleGenerateRecipe = async () => {
    if (!ingredientInput.trim()) {
      toast.error("Please enter some ingredients!");
      return;
    }

    const ingredients = parseIngredientsString(ingredientInput);

    if (ingredients.length === 0) {
      toast.error("Please enter valid ingredients!");
      return;
    }

    try {
      const generatedRecipe = await generateRecipeMutation.mutateAsync(
        ingredients,
      );

      // Auto-save to Zustand store
      addRecipe(generatedRecipe);

      // Success! Show the generated recipe
      if (generatedRecipe.tags.includes("quick-meal")) {
        // This was a fallback recipe
        toast.success(
          `Created "${generatedRecipe.title}"! (Demo recipe - AI temporarily unavailable)`,
        );
      } else {
        // This was an AI-generated recipe
        toast.success(`AI generated and saved "${generatedRecipe.title}"!`);
      }

      // Clear the input
      setIngredientInput("");

      // TODO: Navigate to recipe detail page or scroll to recipe list
      console.log("Generated and saved recipe:", generatedRecipe);
    } catch (error) {
      console.error("Failed to generate recipe:", error);
      toast.error("Failed to generate recipe. Please try again!");
    }
  };

  const popularIngredients = [
    "chicken",
    "pasta",
    "tomatoes",
    "garlic",
    "onions",
    "cheese",
    "rice",
    "broccoli",
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-rose-50 to-pink-50 py-12 sm:py-20">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-40">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f97316' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Hero Content */}
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-4">
              <div className="bg-gradient-to-br from-orange-400 to-rose-400 p-2 rounded-xl">
                <ChefHat className="h-6 w-6 text-white" />
              </div>
              <Badge className="bg-gradient-to-r from-orange-500 to-rose-500 text-white border-0">
                AI-Powered
              </Badge>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">
              Your Smart{" "}
              <span className="bg-gradient-to-r from-orange-600 to-rose-600 bg-clip-text text-transparent">
                Recipe
              </span>{" "}
              Assistant
            </h1>

            <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Discover amazing recipes tailored to your ingredients, dietary
              preferences, and cooking style. Let AI transform your available
              ingredients into culinary masterpieces.
            </p>

            {/* AI Recipe Generator Preview */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg border border-orange-100 mb-6 sm:mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Wand2 className="h-5 w-5 text-orange-600" />
                <span className="font-semibold text-gray-800">
                  AI Recipe Generator
                </span>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <div className="relative">
                  <Input
                    placeholder="Enter ingredients you have (e.g., chicken, rice, broccoli)..."
                    value={ingredientInput}
                    onChange={(e) => setIngredientInput(e.target.value)}
                    className="pr-12 border-orange-200 focus:border-orange-300 focus:ring-orange-200"
                  />
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>

                <div className="flex flex-wrap gap-2">
                  <span className="text-xs sm:text-sm text-gray-500">
                    Popular:
                  </span>
                  {popularIngredients.slice(0, 4).map((ingredient) => (
                    <Button
                      key={ingredient}
                      variant="outline"
                      size="sm"
                      className="h-7 px-3 text-xs border-orange-200 hover:bg-orange-50 hover:border-orange-300"
                      onClick={() => {
                        const current = ingredientInput
                          ? ingredientInput + ", "
                          : "";
                        setIngredientInput(current + ingredient);
                      }}
                    >
                      {ingredient}
                    </Button>
                  ))}
                </div>

                <Button
                  onClick={handleGenerateRecipe}
                  disabled={generateRecipeMutation.isPending}
                  className="w-full bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {generateRecipeMutation.isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Generating Recipe...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 mr-2" />
                      Generate Recipe with AI
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 sm:gap-8">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
                  10K+
                </div>
                <div className="text-xs sm:text-sm text-gray-600">Recipes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
                  50K+
                </div>
                <div className="text-xs sm:text-sm text-gray-600">
                  AI Generated
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
                  95%
                </div>
                <div className="text-xs sm:text-sm text-gray-600">
                  Success Rate
                </div>
              </div>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="relative">
            {/* Recipe Cards Preview */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {/* Featured Recipe Card */}
              <div className="col-span-2 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-orange-100 transform rotate-1 hover:rotate-0 transition-transform">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-gradient-to-br from-yellow-200 via-orange-200 to-red-200 w-12 h-12 rounded-lg flex items-center justify-center text-2xl">
                    🍝
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 text-sm">
                      AI-Generated Pasta
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Clock className="h-3 w-3" />
                      <span>25 min</span>
                      <Users className="h-3 w-3 ml-1" />
                      <span>4 servings</span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <Badge className="bg-emerald-100 text-emerald-700 text-xs">
                    Easy
                  </Badge>
                  <Heart className="h-4 w-4 text-gray-400 hover:text-rose-500 transition-colors cursor-pointer" />
                </div>
              </div>

              {/* Mini Cards */}
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 shadow-md border border-rose-100 transform -rotate-2 hover:rotate-0 transition-transform">
                <div className="bg-gradient-to-br from-green-200 via-emerald-200 to-teal-200 w-full h-16 rounded-md flex items-center justify-center text-2xl mb-2">
                  🥗
                </div>
                <h4 className="font-medium text-gray-800 text-xs mb-1">
                  Fresh Salad
                </h4>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Clock className="h-3 w-3" />
                  <span>10m</span>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 shadow-md border border-pink-100 transform rotate-2 hover:rotate-0 transition-transform">
                <div className="bg-gradient-to-br from-pink-200 via-rose-200 to-red-200 w-full h-16 rounded-md flex items-center justify-center text-2xl mb-2">
                  🍰
                </div>
                <h4 className="font-medium text-gray-800 text-xs mb-1">
                  Sweet Treat
                </h4>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Clock className="h-3 w-3" />
                  <span>45m</span>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-gradient-to-br from-orange-400 to-rose-400 p-3 rounded-full shadow-lg animate-bounce">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
