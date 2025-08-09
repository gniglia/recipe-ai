import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Recipe } from "@/types/recipe";
import { sampleRecipes } from "@/constants/sample-recipes";

// Query keys for consistent cache management
export const recipeKeys = {
  all: ["recipes"] as const,
  lists: () => [...recipeKeys.all, "list"] as const,
  list: (filters: string) => [...recipeKeys.lists(), filters] as const,
  details: () => [...recipeKeys.all, "detail"] as const,
  detail: (id: string) => [...recipeKeys.details(), id] as const,
} as const;

// Simulate API calls for now (replace with real API later)
const recipeAPI = {
  // Get all recipes
  getRecipes: async (): Promise<Recipe[]> => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    return sampleRecipes;
  },

  // Get single recipe by ID
  getRecipe: async (id: string): Promise<Recipe> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const recipe = sampleRecipes.find((r) => r.id === id);
    if (!recipe) {
      throw new Error(`Recipe with id ${id} not found`);
    }
    return recipe;
  },

  // Create new recipe
  createRecipe: async (
    recipe: Omit<Recipe, "id" | "createdAt" | "updatedAt">,
  ): Promise<Recipe> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return {
      ...recipe,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  },

  // Update existing recipe
  updateRecipe: async (
    id: string,
    updates: Partial<Recipe>,
  ): Promise<Recipe> => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    const recipe = sampleRecipes.find((r) => r.id === id);
    if (!recipe) {
      throw new Error(`Recipe with id ${id} not found`);
    }
    return {
      ...recipe,
      ...updates,
      updatedAt: new Date(),
    };
  },

  // Delete recipe
  deleteRecipe: async (id: string): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    // Simulate deletion
  },

  // Generate recipe with AI using Google Gemini
  generateRecipe: async (ingredients: string[]): Promise<Recipe> => {
    const { generateRecipeWithAI } = await import("@/lib/ai-service");

    return generateRecipeWithAI({
      ingredients,
      difficulty: "medium",
      servings: 4,
      maxCookTime: 45,
    });
  },
};

// Custom hooks using React Query

// Get all recipes
export function useRecipes() {
  return useQuery({
    queryKey: recipeKeys.lists(),
    queryFn: recipeAPI.getRecipes,
  });
}

// Get single recipe
export function useRecipe(id: string) {
  return useQuery({
    queryKey: recipeKeys.detail(id),
    queryFn: () => recipeAPI.getRecipe(id),
    enabled: !!id, // Only run query if id exists
  });
}

// Create recipe mutation
export function useCreateRecipe() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: recipeAPI.createRecipe,
    onSuccess: (newRecipe) => {
      // Invalidate recipes list to refetch
      queryClient.invalidateQueries({ queryKey: recipeKeys.lists() });

      // Optimistically add to cache
      queryClient.setQueryData(recipeKeys.detail(newRecipe.id), newRecipe);
    },
  });
}

// Update recipe mutation
export function useUpdateRecipe() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Recipe> }) =>
      recipeAPI.updateRecipe(id, updates),
    onSuccess: (updatedRecipe) => {
      // Update the specific recipe in cache
      queryClient.setQueryData(
        recipeKeys.detail(updatedRecipe.id),
        updatedRecipe,
      );

      // Invalidate recipes list to refetch
      queryClient.invalidateQueries({ queryKey: recipeKeys.lists() });
    },
  });
}

// Delete recipe mutation
export function useDeleteRecipe() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: recipeAPI.deleteRecipe,
    onSuccess: (_, deletedId) => {
      // Remove from cache
      queryClient.removeQueries({ queryKey: recipeKeys.detail(deletedId) });

      // Invalidate recipes list to refetch
      queryClient.invalidateQueries({ queryKey: recipeKeys.lists() });
    },
  });
}

// Generate recipe with AI mutation
export function useGenerateRecipe() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: recipeAPI.generateRecipe,
    onSuccess: (newRecipe) => {
      // Add generated recipe to cache
      queryClient.setQueryData(recipeKeys.detail(newRecipe.id), newRecipe);

      // Invalidate recipes list to refetch
      queryClient.invalidateQueries({ queryKey: recipeKeys.lists() });
    },
  });
}
