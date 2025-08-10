// Image service for recipe photos

// Food-related search terms for Unsplash
const FOOD_KEYWORDS = [
  "pasta",
  "chicken",
  "salad",
  "soup",
  "dessert",
  "pizza",
  "burger",
  "sushi",
  "steak",
  "bread",
  "cake",
  "cookies",
  "fish",
  "vegetables",
  "curry",
  "noodles",
  "sandwich",
  "pancakes",
  "tacos",
  "seafood",
];

// Get a food photo from Unsplash (requires API key)
export async function getUnsplashFoodPhoto(
  query?: string,
): Promise<string | null> {
  // Only work if we have an API key
  if (!process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY) {
    return null;
  }

  try {
    const searchTerm =
      query || FOOD_KEYWORDS[Math.floor(Math.random() * FOOD_KEYWORDS.length)];
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
        searchTerm + " food",
      )}&per_page=20&orientation=landscape`,
      {
        headers: {
          Authorization: `Client-ID ${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`,
        },
      },
    );

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    if (data.results && data.results.length > 0) {
      const randomPhoto =
        data.results[Math.floor(Math.random() * data.results.length)];
      return randomPhoto.urls.regular;
    }
  } catch (error) {
    console.warn("Failed to fetch Unsplash photo:", error);
  }

  return null;
}

// Generate a beautiful gradient based on recipe name/type
export function getRecipeGradient(recipeName: string): string {
  const gradients = [
    "from-orange-200 via-rose-200 to-pink-200",
    "from-yellow-200 via-orange-200 to-red-200",
    "from-green-200 via-emerald-200 to-teal-200",
    "from-blue-200 via-indigo-200 to-purple-200",
    "from-pink-200 via-rose-200 to-red-200",
    "from-amber-200 via-yellow-200 to-lime-200",
    "from-teal-200 via-cyan-200 to-blue-200",
    "from-purple-200 via-pink-200 to-rose-200",
  ];

  // Use recipe name to consistently pick the same gradient
  const hash = recipeName.split("").reduce((a, b) => {
    a = (a << 5) - a + b.charCodeAt(0);
    return a & a;
  }, 0);

  return gradients[Math.abs(hash) % gradients.length];
}

// Enhanced placeholder with recipe-themed icons
export function getRecipeIcon(recipeName: string): string {
  const name = recipeName.toLowerCase();

  if (
    name.includes("pasta") ||
    name.includes("spaghetti") ||
    name.includes("noodle")
  )
    return "🍝";
  if (name.includes("pizza")) return "🍕";
  if (name.includes("burger") || name.includes("sandwich")) return "🍔";
  if (name.includes("chicken") || name.includes("poultry")) return "🍗";
  if (
    name.includes("fish") ||
    name.includes("salmon") ||
    name.includes("seafood")
  )
    return "🐟";
  if (name.includes("soup") || name.includes("broth")) return "🍲";
  if (name.includes("salad") || name.includes("vegetable")) return "🥗";
  if (
    name.includes("dessert") ||
    name.includes("cake") ||
    name.includes("cookie")
  )
    return "🍰";
  if (name.includes("bread") || name.includes("baking")) return "🍞";
  if (name.includes("curry") || name.includes("spicy")) return "🍛";
  if (name.includes("taco") || name.includes("mexican")) return "🌮";
  if (name.includes("sushi") || name.includes("japanese")) return "🍣";

  return "🍽️"; // Default plate icon
}
