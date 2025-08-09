import { Recipe, RecipeFilters } from "@/types/recipe";
import { applyFiltersToRecipes } from "./recipe-filters";

// Pure state type
export interface RecipeState {
  recipes: Recipe[];
  filteredRecipes: Recipe[];
  selectedRecipe: Recipe | null;
  filters: RecipeFilters;
  searchQuery: string;
  isLoading: boolean;
  isGenerating: boolean;
  favoriteRecipeIds: string[]; // New: Track favorite recipe IDs
}

// Pure state transformations (no side effects)
export const recipeStateTransforms = {
  // Recipe collection transformations
  setRecipes: (state: RecipeState, recipes: Recipe[]): RecipeState => ({
    ...state,
    recipes,
    filteredRecipes: applyFiltersToRecipes(
      recipes,
      state.filters,
      state.searchQuery,
    ),
  }),

  addRecipe: (state: RecipeState, recipe: Recipe): RecipeState => {
    const newRecipes = [recipe, ...state.recipes];
    return {
      ...state,
      recipes: newRecipes,
      filteredRecipes: applyFiltersToRecipes(
        newRecipes,
        state.filters,
        state.searchQuery,
      ),
    };
  },

  updateRecipe: (
    state: RecipeState,
    id: string,
    updates: Partial<Recipe>,
  ): RecipeState => {
    const newRecipes = state.recipes.map((recipe) =>
      recipe.id === id ? { ...recipe, ...updates } : recipe,
    );
    return {
      ...state,
      recipes: newRecipes,
      filteredRecipes: applyFiltersToRecipes(
        newRecipes,
        state.filters,
        state.searchQuery,
      ),
    };
  },

  removeRecipe: (state: RecipeState, id: string): RecipeState => {
    const newRecipes = state.recipes.filter((recipe) => recipe.id !== id);
    return {
      ...state,
      recipes: newRecipes,
      filteredRecipes: applyFiltersToRecipes(
        newRecipes,
        state.filters,
        state.searchQuery,
      ),
    };
  },

  // Selection transformations
  selectRecipe: (state: RecipeState, recipe: Recipe | null): RecipeState => ({
    ...state,
    selectedRecipe: recipe,
  }),

  // Filter transformations
  setSearchQuery: (state: RecipeState, searchQuery: string): RecipeState => {
    const newState = { ...state, searchQuery };
    return {
      ...newState,
      filteredRecipes: applyFiltersToRecipes(
        newState.recipes,
        newState.filters,
        searchQuery,
      ),
    };
  },

  setFilters: (
    state: RecipeState,
    newFilters: Partial<RecipeFilters>,
  ): RecipeState => {
    const filters = { ...state.filters, ...newFilters };
    const newState = { ...state, filters };
    return {
      ...newState,
      filteredRecipes: applyFiltersToRecipes(
        newState.recipes,
        filters,
        newState.searchQuery,
      ),
    };
  },

  clearFilters: (state: RecipeState): RecipeState => {
    const clearedState = { ...state, filters: {}, searchQuery: "" };
    return {
      ...clearedState,
      filteredRecipes: applyFiltersToRecipes(clearedState.recipes, {}, ""),
    };
  },

  // Loading state transformations
  setLoading: (state: RecipeState, isLoading: boolean): RecipeState => ({
    ...state,
    isLoading,
  }),

  setGenerating: (state: RecipeState, isGenerating: boolean): RecipeState => ({
    ...state,
    isGenerating,
  }),

  // Favorites transformations
  toggleFavorite: (state: RecipeState, recipeId: string): RecipeState => {
    const isFavorite = state.favoriteRecipeIds.includes(recipeId);
    const newFavoriteIds = isFavorite
      ? state.favoriteRecipeIds.filter((id) => id !== recipeId) // Remove from favorites
      : [...state.favoriteRecipeIds, recipeId]; // Add to favorites

    return {
      ...state,
      favoriteRecipeIds: newFavoriteIds,
    };
  },

  setFavorites: (state: RecipeState, favoriteIds: string[]): RecipeState => ({
    ...state,
    favoriteRecipeIds: favoriteIds,
  }),

  clearFavorites: (state: RecipeState): RecipeState => ({
    ...state,
    favoriteRecipeIds: [],
  }),
} as const;

// Pure function to create initial state
export const createInitialRecipeState = (
  initialRecipes: Recipe[],
): RecipeState => ({
  recipes: initialRecipes,
  filteredRecipes: initialRecipes,
  selectedRecipe: null,
  filters: {},
  searchQuery: "",
  isLoading: false,
  isGenerating: false,
  favoriteRecipeIds: [], // Initialize empty favorites
});

// Functional composition helpers
export const pipe =
  <T>(...fns: Array<(arg: T) => T>) =>
  (value: T): T =>
    fns.reduce((acc, fn) => fn(acc), value);

export const curry =
  <T, U, V>(fn: (a: T, b: U) => V) =>
  (a: T) =>
  (b: U) =>
    fn(a, b);

// Curried versions of transformations for easier composition
export const curriedTransforms = {
  setRecipes: curry(recipeStateTransforms.setRecipes),
  addRecipe: curry(recipeStateTransforms.addRecipe),
  updateRecipe: (id: string) =>
    curry((state: RecipeState, updates: Partial<Recipe>) =>
      recipeStateTransforms.updateRecipe(state, id, updates),
    ),
  removeRecipe: curry(recipeStateTransforms.removeRecipe),
  selectRecipe: curry(recipeStateTransforms.selectRecipe),
  setSearchQuery: curry(recipeStateTransforms.setSearchQuery),
  setFilters: curry(recipeStateTransforms.setFilters),
  setLoading: curry(recipeStateTransforms.setLoading),
  setGenerating: curry(recipeStateTransforms.setGenerating),
} as const;

// Higher-order functions for complex operations
export const withAutoFilter =
  <T extends unknown[]>(
    transform: (state: RecipeState, ...args: T) => RecipeState,
  ) =>
  (state: RecipeState, ...args: T): RecipeState => {
    const newState = transform(state, ...args);
    return {
      ...newState,
      filteredRecipes: applyFiltersToRecipes(
        newState.recipes,
        newState.filters,
        newState.searchQuery,
      ),
    };
  };

// Functional selectors
export const selectors = {
  getRecipes: (state: RecipeState) => state.recipes,
  getFilteredRecipes: (state: RecipeState) => state.filteredRecipes,
  getSelectedRecipe: (state: RecipeState) => state.selectedRecipe,
  getFilters: (state: RecipeState) => state.filters,
  getSearchQuery: (state: RecipeState) => state.searchQuery,
  isLoading: (state: RecipeState) => state.isLoading,
  isGenerating: (state: RecipeState) => state.isGenerating,

  // Derived selectors
  getRecipeCount: (state: RecipeState) => state.recipes.length,
  getFilteredCount: (state: RecipeState) => state.filteredRecipes.length,
  getAIRecipes: (state: RecipeState) =>
    state.recipes.filter((r) => r.tags.includes("ai-generated")),
  getRegularRecipes: (state: RecipeState) =>
    state.recipes.filter((r) => !r.tags.includes("ai-generated")),
  hasActiveFilters: (state: RecipeState) =>
    Object.keys(state.filters).length > 0 || state.searchQuery.length > 0,

  // Favorite selectors
  getFavoriteRecipeIds: (state: RecipeState) => state.favoriteRecipeIds,
  getFavoriteRecipes: (state: RecipeState) =>
    state.recipes.filter((recipe) =>
      state.favoriteRecipeIds.includes(recipe.id),
    ),
  isFavoriteRecipe: (recipeId: string) => (state: RecipeState) =>
    state.favoriteRecipeIds.includes(recipeId),
  getFavoriteCount: (state: RecipeState) => state.favoriteRecipeIds.length,
} as const;
