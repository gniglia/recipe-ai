import { create } from "zustand";
import { Recipe, RecipeFilters } from "@/types/recipe";
import { sampleRecipes } from "@/constants/sample-recipes";

interface RecipeState {
  // Recipe data
  recipes: Recipe[];
  filteredRecipes: Recipe[];
  selectedRecipe: Recipe | null;

  // Filters and search
  filters: RecipeFilters;
  searchQuery: string;

  // Loading states
  isLoading: boolean;
  isGenerating: boolean;

  // Actions
  setRecipes: (recipes: Recipe[]) => void;
  addRecipe: (recipe: Recipe) => void;
  updateRecipe: (id: string, recipe: Partial<Recipe>) => void;
  deleteRecipe: (id: string) => void;
  setSelectedRecipe: (recipe: Recipe | null) => void;

  // Filter actions
  setSearchQuery: (query: string) => void;
  setFilters: (filters: Partial<RecipeFilters>) => void;
  clearFilters: () => void;
  applyFilters: () => void;

  // Loading actions
  setLoading: (loading: boolean) => void;
  setGenerating: (generating: boolean) => void;
}

export const useRecipeStore = create<RecipeState>((set, get) => ({
  // Initial state
  recipes: sampleRecipes,
  filteredRecipes: sampleRecipes,
  selectedRecipe: null,
  filters: {},
  searchQuery: "",
  isLoading: false,
  isGenerating: false,

  // Recipe actions
  setRecipes: (recipes) => {
    set({ recipes, filteredRecipes: recipes });
    get().applyFilters();
  },

  addRecipe: (recipe) => {
    const { recipes } = get();
    const newRecipes = [recipe, ...recipes];
    set({ recipes: newRecipes });
    get().applyFilters();
  },

  updateRecipe: (id, updatedRecipe) => {
    const { recipes } = get();
    const newRecipes = recipes.map((recipe) =>
      recipe.id === id ? { ...recipe, ...updatedRecipe } : recipe,
    );
    set({ recipes: newRecipes });
    get().applyFilters();
  },

  deleteRecipe: (id) => {
    const { recipes } = get();
    const newRecipes = recipes.filter((recipe) => recipe.id !== id);
    set({ recipes: newRecipes });
    get().applyFilters();
  },

  setSelectedRecipe: (recipe) => set({ selectedRecipe: recipe }),

  // Filter actions
  setSearchQuery: (searchQuery) => {
    set({ searchQuery });
    get().applyFilters();
  },

  setFilters: (newFilters) => {
    const { filters } = get();
    set({ filters: { ...filters, ...newFilters } });
    get().applyFilters();
  },

  clearFilters: () => {
    set({ filters: {}, searchQuery: "" });
    get().applyFilters();
  },

  applyFilters: () => {
    const { recipes, filters, searchQuery } = get();
    let filtered = [...recipes];

    // Apply search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (recipe) =>
          recipe.title.toLowerCase().includes(query) ||
          recipe.description.toLowerCase().includes(query) ||
          recipe.tags.some((tag) => tag.toLowerCase().includes(query)) ||
          recipe.cuisine?.toLowerCase().includes(query),
      );
    }

    // Apply cuisine filter
    if (filters.cuisine) {
      filtered = filtered.filter(
        (recipe) => recipe.cuisine === filters.cuisine,
      );
    }

    // Apply difficulty filter
    if (filters.difficulty) {
      filtered = filtered.filter(
        (recipe) => recipe.difficulty === filters.difficulty,
      );
    }

    // Apply max prep time filter
    if (filters.maxPrepTime) {
      filtered = filtered.filter(
        (recipe) => recipe.prepTime <= filters.maxPrepTime!,
      );
    }

    // Apply tags filter
    if (filters.tags && filters.tags.length > 0) {
      filtered = filtered.filter((recipe) =>
        filters.tags!.some((tag) => recipe.tags.includes(tag)),
      );
    }

    set({ filteredRecipes: filtered });
  },

  // Loading actions
  setLoading: (isLoading) => set({ isLoading }),
  setGenerating: (isGenerating) => set({ isGenerating }),
}));
