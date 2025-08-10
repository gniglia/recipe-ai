import { create } from "zustand";

import { sampleRecipes } from "@/constants/sample-recipes";
import { Recipe, RecipeFilters } from "@/types/recipe";
import {
  RecipeState,
  recipeStateTransforms,
  createInitialRecipeState,
} from "@/utils/recipe-state";

// Functional store with pure state transformations
export const useRecipeStore = create<
  RecipeState & {
    // Actions that transform state functionally
    setRecipes: (recipes: Recipe[]) => void;
    addRecipe: (recipe: Recipe) => void;
    updateRecipe: (id: string, updates: Partial<Recipe>) => void;
    deleteRecipe: (id: string) => void;
    setSelectedRecipe: (recipe: Recipe | null) => void;
    setSearchQuery: (query: string) => void;
    setFilters: (filters: Partial<RecipeFilters>) => void;
    clearFilters: () => void;
    setLoading: (isLoading: boolean) => void;
    setGenerating: (isGenerating: boolean) => void;

    // Favorite actions
    toggleFavorite: (recipeId: string) => void;
    setFavorites: (favoriteIds: string[]) => void;
    clearFavorites: () => void;
    isFavorite: (recipeId: string) => boolean;
    getFavoriteRecipes: () => Recipe[];
  }
>((set) => ({
  // Initial state using pure function
  ...createInitialRecipeState(sampleRecipes),

  // Pure functional actions - each uses immutable state transformations
  setRecipes: (recipes: Recipe[]) =>
    set((state) => recipeStateTransforms.setRecipes(state, recipes)),

  addRecipe: (recipe: Recipe) =>
    set((state) => recipeStateTransforms.addRecipe(state, recipe)),

  updateRecipe: (id: string, updates: Partial<Recipe>) =>
    set((state) => recipeStateTransforms.updateRecipe(state, id, updates)),

  deleteRecipe: (id: string) =>
    set((state) => recipeStateTransforms.removeRecipe(state, id)),

  setSelectedRecipe: (recipe: Recipe | null) =>
    set((state) => recipeStateTransforms.selectRecipe(state, recipe)),

  setSearchQuery: (searchQuery: string) =>
    set((state) => recipeStateTransforms.setSearchQuery(state, searchQuery)),

  setFilters: (newFilters: Partial<RecipeFilters>) =>
    set((state) => recipeStateTransforms.setFilters(state, newFilters)),

  clearFilters: () => set((state) => recipeStateTransforms.clearFilters(state)),

  setLoading: (isLoading: boolean) =>
    set((state) => recipeStateTransforms.setLoading(state, isLoading)),

  setGenerating: (isGenerating: boolean) =>
    set((state) => recipeStateTransforms.setGenerating(state, isGenerating)),

  // Favorite actions
  toggleFavorite: (recipeId: string) =>
    set((state) => recipeStateTransforms.toggleFavorite(state, recipeId)),

  setFavorites: (favoriteIds: string[]) =>
    set((state) => recipeStateTransforms.setFavorites(state, favoriteIds)),

  clearFavorites: () =>
    set((state) => recipeStateTransforms.clearFavorites(state)),

  // Favorite selectors as methods
  isFavorite: (recipeId: string): boolean => {
    const state = useRecipeStore.getState() as RecipeState;
    return state.favoriteRecipeIds.includes(recipeId);
  },

  getFavoriteRecipes: (): Recipe[] => {
    const state = useRecipeStore.getState() as RecipeState;
    return state.recipes.filter((recipe: Recipe) =>
      state.favoriteRecipeIds.includes(recipe.id),
    );
  },
}));
