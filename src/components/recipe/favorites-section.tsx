"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRecipeStore } from "@/stores/recipe-store";
import { Recipe } from "@/types/recipe";
import { RecipeCard } from "./recipe-card";
import { Button } from "@/components/ui/button";
import { Heart, Sparkles, ArrowRight } from "lucide-react";

export function FavoritesSection() {
  const { favoriteRecipeIds, recipes, setSelectedRecipe, clearFavorites } =
    useRecipeStore();

  // Get favorite recipes
  const favoriteRecipes = recipes.filter((recipe) =>
    favoriteRecipeIds.includes(recipe.id),
  );

  const handleRecipeClick = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
  };

  if (favoriteRecipes.length === 0) {
    return (
      <motion.div
        className="text-center py-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="mb-6"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3,
          }}
        >
          <Heart className="h-16 w-16 mx-auto text-white drop-shadow-lg" />
        </motion.div>

        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 drop-shadow-lg">
          No Favorites Yet
        </h2>
        <p className="text-white/90 mb-8 max-w-md mx-auto text-lg sm:text-xl drop-shadow-md font-medium">
          Start exploring recipes and click the ❤️ icon to save your favorites
          here!
        </p>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={() => {
              const recipesSection = document.getElementById("recipes");
              recipesSection?.scrollIntoView({ behavior: "smooth" });
            }}
            className="bg-gradient-to-r from-emerald-500 to-purple-500 hover:from-emerald-600 hover:to-purple-600 text-white shadow-xl px-8 py-4 text-lg"
          >
            <Sparkles className="h-5 w-5 mr-2" />
            Explore Recipes
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <motion.h2
            className="text-3xl sm:text-4xl font-bold text-white mb-2 drop-shadow-lg"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Heart className="inline h-7 w-7 sm:h-9 sm:w-9 text-white mr-3 -mt-1 drop-shadow-lg" />
            Favorite Recipes
          </motion.h2>
          <motion.p
            className="text-white/90 text-lg font-medium drop-shadow-md"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {favoriteRecipes.length} saved recipe
            {favoriteRecipes.length !== 1 ? "s" : ""}
          </motion.p>
        </div>

        {favoriteRecipes.length > 0 && (
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button
              variant="outline"
              onClick={clearFavorites}
              className="text-white border-white/50 hover:text-red-300 hover:border-red-300 hover:bg-red-500/20 backdrop-blur-sm shadow-lg"
            >
              Clear All
            </Button>
          </motion.div>
        )}
      </div>

      {/* Favorites Grid */}
      <motion.div
        className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        layout
      >
        <AnimatePresence>
          {favoriteRecipes.map((recipe, index) => (
            <motion.div
              key={recipe.id}
              layout
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -20 }}
              transition={{
                duration: 0.4,
                delay: index * 0.1,
                layout: { duration: 0.3 },
              }}
              whileHover={{ y: -4 }}
            >
              <RecipeCard
                recipe={recipe}
                onClick={() => handleRecipeClick(recipe)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Fun Stats */}
      {favoriteRecipes.length >= 3 && (
        <motion.div
          className="text-center mt-8 p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h3 className="text-xl font-bold text-white mb-2 drop-shadow-lg">
            🎉 Great taste in recipes!
          </h3>
          <p className="text-white/90 text-lg font-medium drop-shadow-md">
            You&apos;ve saved {favoriteRecipes.length} delicious recipes. Time
            to start cooking! 👨‍🍳
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
