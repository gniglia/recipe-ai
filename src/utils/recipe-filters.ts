import { Recipe, RecipeFilters } from "@/types/recipe";

export type RecipeFilterFn = (recipes: Recipe[]) => Recipe[];
export type RecipeSortFn = (a: Recipe, b: Recipe) => number;
export type RecipePredicate = (recipe: Recipe) => boolean;

// Functional composition utilities
export const compose =
  <T>(...fns: Array<(arg: T) => T>) =>
  (value: T): T =>
    fns.reduceRight((acc, fn) => fn(acc), value);

export const pipe =
  <T>(...fns: Array<(arg: T) => T>) =>
  (value: T): T =>
    fns.reduce((acc, fn) => fn(acc), value);

export const curry =
  <A, B, C>(fn: (a: A, b: B) => C) =>
  (a: A) =>
  (b: B) =>
    fn(a, b);

// Helper functions for safe operations
export const safeGet = <T>(value: T | null | undefined, defaultValue: T): T =>
  value ?? defaultValue;

export const safeTrim = (str: string | undefined): string => str?.trim() || "";

export const safeIncludes = <T>(array: T[] | undefined, item: T): boolean =>
  array?.includes(item) || false;

// Pure predicate functions
export const predicates = {
  hasSearchTerm:
    (searchQuery: string) =>
    (recipe: Recipe): boolean => {
      if (!searchQuery.trim()) return true;

      const query = searchQuery.toLowerCase();
      const searchableFields = [
        recipe.title,
        recipe.description,
        recipe.cuisine || "",
        ...recipe.tags,
        ...recipe.ingredients.map((ing) => ing.name),
      ];

      return searchableFields.some((field) =>
        field.toLowerCase().includes(query),
      );
    },

  isAIGenerated: (recipe: Recipe): boolean =>
    recipe.tags.includes("ai-generated"),

  isRegular: (recipe: Recipe): boolean => !recipe.tags.includes("ai-generated"),

  hasCuisine:
    (cuisines: string[]) =>
    (recipe: Recipe): boolean =>
      cuisines.length === 0 ||
      (!!recipe.cuisine && cuisines.includes(recipe.cuisine)),

  hasDifficulty:
    (difficulty: Recipe["difficulty"]) =>
    (recipe: Recipe): boolean =>
      recipe.difficulty === difficulty,

  hasMaxPrepTime:
    (maxTime: number) =>
    (recipe: Recipe): boolean =>
      recipe.prepTime <= maxTime,

  hasAnyTag:
    (tags: string[]) =>
    (recipe: Recipe): boolean =>
      tags.some((tag) => recipe.tags.includes(tag)),

  hasDietaryRestriction:
    (dietaryType: string) =>
    (recipe: Recipe): boolean =>
      recipe.tags.includes(dietaryType),

  hasAnyDietaryRestriction:
    (dietaryTypes: string[]) =>
    (recipe: Recipe): boolean =>
      dietaryTypes.every((dietaryType) => recipe.tags.includes(dietaryType)),
} as const;

// Higher-order filter functions
export const createFilter =
  (predicate: RecipePredicate): RecipeFilterFn =>
  (recipes: Recipe[]) =>
    recipes.filter(predicate);

export const createConditionalFilter =
  <T>(
    condition: T | null | undefined,
    predicateFactory: (condition: T) => RecipePredicate,
  ): RecipeFilterFn =>
  (recipes: Recipe[]) => {
    if (condition == null) return recipes;
    const predicate = predicateFactory(condition);
    return recipes.filter(predicate);
  };

// Functional filter factories
export const createSearchFilter = (searchQuery: string): RecipeFilterFn =>
  createFilter(predicates.hasSearchTerm(searchQuery));

export const createSourceFilter = (
  source?: RecipeFilters["source"],
): RecipeFilterFn =>
  createConditionalFilter(
    source && source !== "all" ? source : null,
    (sourceType) =>
      sourceType === "ai-generated"
        ? predicates.isAIGenerated
        : predicates.isRegular,
  );

export const createCuisineFilter = (cuisine?: string[]): RecipeFilterFn =>
  createConditionalFilter(
    cuisine?.length ? cuisine : null,
    predicates.hasCuisine,
  );

export const createDifficultyFilter = (
  difficulty?: Recipe["difficulty"],
): RecipeFilterFn =>
  createConditionalFilter(difficulty, predicates.hasDifficulty);

export const createPrepTimeFilter = (maxPrepTime?: number): RecipeFilterFn =>
  createConditionalFilter(maxPrepTime, predicates.hasMaxPrepTime);

export const createTagsFilter = (tags?: string[]): RecipeFilterFn =>
  createConditionalFilter(tags?.length ? tags : null, predicates.hasAnyTag);

export const createDietaryFilter = (dietary?: string[]): RecipeFilterFn =>
  createConditionalFilter(
    dietary?.length ? dietary : null,
    predicates.hasAnyDietaryRestriction,
  );

// Sorting strategies
export const sortingStrategies = {
  newest: (a: Recipe, b: Recipe) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),

  cookTime: (a: Recipe, b: Recipe) =>
    a.prepTime + a.cookTime - (b.prepTime + b.cookTime),

  difficulty: (a: Recipe, b: Recipe) => {
    const difficultyOrder = { easy: 1, medium: 2, hard: 3 };
    return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
  },

  title: (a: Recipe, b: Recipe) => a.title.localeCompare(b.title),

  default: (a: Recipe, b: Recipe) => {
    const aIsAI = a.tags.includes("ai-generated");
    const bIsAI = b.tags.includes("ai-generated");

    if (aIsAI !== bIsAI) {
      return bIsAI ? 1 : -1; // AI recipes first
    }

    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  },
} as const;

export type SortKey = keyof typeof sortingStrategies;

export function applySorting(recipes: Recipe[], sortBy?: SortKey): Recipe[] {
  const strategy = sortingStrategies[sortBy || "default"];
  return [...recipes].sort(strategy);
}

// Pure functional filter chain builder
export const buildFilterChain = (
  filters: RecipeFilters,
  searchQuery: string,
): RecipeFilterFn[] => [
  createSearchFilter(searchQuery),
  createSourceFilter(filters.source),
  createCuisineFilter(filters.cuisine),
  createDifficultyFilter(filters.difficulty),
  createPrepTimeFilter(filters.maxPrepTime),
  createTagsFilter(filters.tags),
  createDietaryFilter(filters.dietary),
];

// Main filter composition function using functional composition
export const applyFiltersToRecipes = (
  recipes: Recipe[],
  filters: RecipeFilters,
  searchQuery: string,
): Recipe[] =>
  pipe(
    // Create immutable copy
    (recipes: Recipe[]) => [...recipes],
    // Apply filter chain using composition
    ...buildFilterChain(filters, searchQuery),
    // Apply sorting
    (filtered: Recipe[]) => applySorting(filtered, filters.sortBy),
  )(recipes);

// Alternative using functional composition pattern
export const applyFiltersComposed = curry((filters: RecipeFilters) =>
  curry((searchQuery: string) =>
    compose(
      (filtered: Recipe[]) => applySorting(filtered, filters.sortBy),
      ...buildFilterChain(filters, searchQuery).reverse(), // reverse for compose
      (recipes: Recipe[]) => [...recipes],
    ),
  ),
);

// Point-free style filter application
export const filterRecipes = (filters: RecipeFilters, searchQuery: string) =>
  pipe(...buildFilterChain(filters, searchQuery));

// Safe filtering with error handling
export const safeApplyFilters = (
  recipes: Recipe[],
  filters: RecipeFilters,
  searchQuery: string,
): Recipe[] => {
  if (!recipes.length) return [];
  return applyFiltersToRecipes(recipes, filters, searchQuery);
};
