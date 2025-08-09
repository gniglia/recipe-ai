export interface Ingredient {
  id: string;
  name: string;
  amount: number;
  unit: string;
}

export interface RecipeStep {
  id: string;
  stepNumber: number;
  instruction: string;
  estimatedTime?: number; // in minutes
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  prepTime: number; // in minutes
  cookTime: number; // in minutes
  servings: number;
  difficulty: 'easy' | 'medium' | 'hard';
  cuisine?: string;
  tags: string[];
  ingredients: Ingredient[];
  steps: RecipeStep[];
  nutritionInfo?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface RecipeFilters {
  cuisine?: string;
  difficulty?: Recipe['difficulty'];
  maxPrepTime?: number;
  tags?: string[];
  searchQuery?: string;
}
