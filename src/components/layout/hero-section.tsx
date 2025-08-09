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
    <section className="relative overflow-hidden py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Dark container with blur backdrop */}
        <div className="bg-black/60 backdrop-blur-lg rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-20">
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />
          </div>

          <div className="relative p-6 sm:p-8 lg:p-12">
            <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 items-start">
              {/* Main Hero Content - Takes 2 columns */}
              <div className="lg:col-span-2 text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-2 mb-4">
                  <div className="bg-gradient-to-br from-emerald-500 to-blue-500 p-2 rounded-xl">
                    <ChefHat className="h-6 w-6 text-white" />
                  </div>
                  <Badge className="bg-gradient-to-r from-emerald-500 to-purple-500 text-white border-0">
                    AI-Powered
                  </Badge>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                  Your Smart{" "}
                  <span className="bg-gradient-to-r from-emerald-400 to-purple-400 bg-clip-text text-transparent">
                    Recipe
                  </span>{" "}
                  Assistant
                </h1>

                <p className="text-base sm:text-lg text-gray-200 mb-6 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  Discover amazing recipes tailored to your ingredients, dietary
                  preferences, and cooking style. Let AI transform your
                  available ingredients into culinary masterpieces.
                </p>

                {/* AI Recipe Generator Preview */}
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg border border-white/20">
                  <div className="flex items-center gap-2 mb-4">
                    <Wand2 className="h-5 w-5 text-emerald-400" />
                    <span className="font-semibold text-white">
                      AI Recipe Generator
                    </span>
                  </div>

                  <div className="space-y-3 sm:space-y-4">
                    <div className="relative">
                      <Input
                        placeholder="Enter ingredients you have (e.g., chicken, rice, broccoli)..."
                        value={ingredientInput}
                        onChange={(e) => setIngredientInput(e.target.value)}
                        className="pr-12 bg-white/20 border-white/30 text-white placeholder:text-gray-300 focus:border-emerald-400 focus:ring-emerald-400/50"
                      />
                      <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs sm:text-sm text-gray-300">
                        Popular:
                      </span>
                      {popularIngredients.slice(0, 4).map((ingredient) => (
                        <Button
                          key={ingredient}
                          variant="ghost"
                          size="sm"
                          className="h-7 px-3 text-xs bg-white/20 border border-white/40 text-white hover:bg-emerald-500/30 hover:border-emerald-400 backdrop-blur-sm transition-all duration-200 shadow-sm"
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
                      className="w-full bg-gradient-to-r from-emerald-500 to-purple-500 hover:from-emerald-600 hover:to-purple-600 text-white shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
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
              </div>

              {/* Right Sidebar - Stats + Recipe Cards */}
              <div className="space-y-4 lg:self-end">
                {/* Subtle Stats Section */}
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                      <div className="text-lg font-bold text-white mb-1">
                        10K+
                      </div>
                      <div className="text-xs text-gray-400">Recipes</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-white mb-1">
                        50K+
                      </div>
                      <div className="text-xs text-gray-400">AI Generated</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-white mb-1">
                        95%
                      </div>
                      <div className="text-xs text-gray-400">Success Rate</div>
                    </div>
                  </div>
                </div>

                {/* Recipe Cards Preview */}
                <div className="space-y-3">
                  {/* Featured Recipe Card */}
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow-lg border border-orange-100 transform rotate-1 hover:rotate-0 transition-transform">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="bg-gradient-to-br from-yellow-200 via-orange-200 to-red-200 w-8 h-8 rounded-lg flex items-center justify-center text-lg">
                        🍝
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 text-xs">
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
                      <Heart className="h-3 w-3 text-gray-400 hover:text-rose-500 transition-colors cursor-pointer" />
                    </div>
                  </div>

                  {/* Mini Cards */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-white/80 backdrop-blur-sm rounded-lg p-2 shadow-md border border-rose-100 transform -rotate-1 hover:rotate-0 transition-transform">
                      <div className="bg-gradient-to-br from-green-200 via-emerald-200 to-teal-200 w-full h-12 rounded-md flex items-center justify-center text-lg mb-1">
                        🥗
                      </div>
                      <h4 className="font-medium text-gray-800 text-xs mb-1">
                        Fresh Salad
                      </h4>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Clock className="h-2 w-2" />
                        <span>10m</span>
                      </div>
                    </div>

                    <div className="bg-white/80 backdrop-blur-sm rounded-lg p-2 shadow-md border border-pink-100 transform rotate-1 hover:rotate-0 transition-transform">
                      <div className="bg-gradient-to-br from-pink-200 via-rose-200 to-red-200 w-full h-12 rounded-md flex items-center justify-center text-lg mb-1">
                        🍰
                      </div>
                      <h4 className="font-medium text-gray-800 text-xs mb-1">
                        Sweet Treat
                      </h4>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Clock className="h-2 w-2" />
                        <span>45m</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Elements - Bouncing animation */}
                <div className="absolute top-20 right-5 bg-gradient-to-br from-emerald-400 to-purple-400 p-3 rounded-full shadow-lg animate-bounce">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
