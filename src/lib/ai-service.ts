import { Recipe } from "@/types/recipe";

interface GenerateRecipeParams {
  ingredients: string[];
  dietaryRestrictions?: string[];
  cuisine?: string;
  difficulty?: "easy" | "medium" | "hard";
  servings?: number;
  maxCookTime?: number;
}

interface GeneratedIngredient {
  name: string;
  amount: number;
  unit: string;
}

interface GeneratedStep {
  stepNumber: number;
  instruction: string;
  estimatedTime?: number;
}

interface GeneratedRecipe {
  title: string;
  description: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  difficulty: "easy" | "medium" | "hard";
  cuisine: string;
  ingredients: GeneratedIngredient[];
  steps: GeneratedStep[];
  tags: string[];
}

export async function generateRecipeWithAI(
  params: GenerateRecipeParams,
): Promise<Recipe> {
  try {
    // Call our API route (handles all Gemini AI logic server-side)
    const response = await fetch("/api/generate-recipe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();

    if (!data.success) {
      throw new Error("Recipe generation failed");
    }

    const generatedRecipe: GeneratedRecipe = data.recipe;

    // Convert API response to our Recipe format
    const recipe: Recipe = {
      id: `ai-${Date.now()}`,
      title: generatedRecipe.title,
      description: generatedRecipe.description,
      imageUrl: undefined, // Will use gradient placeholder
      prepTime: generatedRecipe.prepTime,
      cookTime: generatedRecipe.cookTime,
      servings: generatedRecipe.servings,
      difficulty: generatedRecipe.difficulty,
      cuisine: generatedRecipe.cuisine,
      tags: [...new Set([...generatedRecipe.tags, "ai-generated"])], // Remove duplicates
      ingredients: generatedRecipe.ingredients.map(
        (ing: GeneratedIngredient, index: number) => ({
          id: `ai-ing-${index}`,
          name: ing.name,
          amount: ing.amount,
          unit: ing.unit,
        }),
      ),
      steps: generatedRecipe.steps.map(
        (step: GeneratedStep, index: number) => ({
          id: `ai-step-${index}`,
          stepNumber: step.stepNumber,
          instruction: step.instruction,
          estimatedTime: step.estimatedTime,
        }),
      ),
      nutritionInfo: {
        calories: Math.floor(Math.random() * 200) + 300, // Placeholder
        protein: Math.floor(Math.random() * 20) + 15,
        carbs: Math.floor(Math.random() * 30) + 20,
        fat: Math.floor(Math.random() * 15) + 10,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return recipe;
  } catch (error) {
    console.error("Error generating recipe with AI:", error);
    throw error; // Let the calling component handle the error
  }
}

// Parse ingredients from a string input
export function parseIngredientsString(input: string): string[] {
  return input
    .split(/[,\n]+/)
    .map((ingredient) => ingredient.trim())
    .filter((ingredient) => ingredient.length > 0)
    .slice(0, 10); // Limit to 10 ingredients for better AI results
}
