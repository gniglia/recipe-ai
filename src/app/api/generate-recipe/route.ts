import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

interface GenerateRecipeRequest {
  ingredients: string[];
  dietaryRestrictions?: string[];
  cuisine?: string;
  difficulty?: "easy" | "medium" | "hard";
  servings?: number;
  maxCookTime?: number;
}

interface GeneratedRecipeResponse {
  title: string;
  description: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  difficulty: "easy" | "medium" | "hard";
  cuisine: string;
  ingredients: Array<{
    name: string;
    amount: number;
    unit: string;
  }>;
  steps: Array<{
    stepNumber: number;
    instruction: string;
    estimatedTime?: number;
  }>;
  tags: string[];
}

export async function POST(request: NextRequest) {
  console.log("🔥 API Route: Generate recipe endpoint called");

  let body: GenerateRecipeRequest;

  try {
    body = await request.json();
    console.log("📝 Request body:", body);
  } catch (error) {
    console.error("❌ Failed to parse JSON:", error);
    return NextResponse.json(
      { error: "Invalid JSON in request body" },
      { status: 400 },
    );
  }

  const {
    ingredients,
    dietaryRestrictions = [],
    cuisine = "any",
    difficulty = "medium",
    servings = 4,
    maxCookTime = 60,
  } = body;

  console.log("🥬 Parsed ingredients:", ingredients);
  console.log("⚙️ Other params:", {
    dietaryRestrictions,
    cuisine,
    difficulty,
    servings,
    maxCookTime,
  });

  if (!ingredients || ingredients.length === 0) {
    console.error("❌ No ingredients provided");
    return NextResponse.json(
      { error: "Ingredients are required" },
      { status: 400 },
    );
  }

  // Check if Gemini API key is available
  if (!process.env.GEMINI_API_KEY) {
    console.error("❌ Gemini API key not found in environment variables");
    return NextResponse.json(
      { error: "Gemini API key not configured" },
      { status: 500 },
    );
  }

  console.log("✅ Gemini API key found, proceeding with generation...");

  try {
    // Initialize Gemini client
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    console.log("🤖 Gemini AI client initialized successfully");

    // Create a detailed prompt for better recipe generation
    const prompt = `Create a detailed recipe using these ingredients: ${ingredients.join(
      ", ",
    )}.

Requirements:
- Difficulty: ${difficulty}
- Servings: ${servings}
- Maximum cooking time: ${maxCookTime} minutes
- Cuisine preference: ${cuisine}
${
  dietaryRestrictions.length > 0
    ? `- Dietary restrictions: ${dietaryRestrictions.join(", ")}`
    : ""
}

Please provide a complete recipe with:
1. An appetizing title
2. A brief description (1-2 sentences)
3. Prep time and cook time (realistic estimates)
4. Complete ingredient list with specific amounts and units
5. Step-by-step cooking instructions
6. Appropriate tags for categorization
7. Estimated time for each cooking step when helpful

Return the response as valid JSON in this exact format:
{
  "title": "Recipe Name",
  "description": "Brief description of the dish",
  "prepTime": 15,
  "cookTime": 25,
  "servings": 4,
  "difficulty": "medium",
  "cuisine": "Italian",
  "ingredients": [
    {"name": "ingredient name", "amount": 2.5, "unit": "cups", "notes": "optional"}
  ],
  "steps": [
    {"stepNumber": 1, "instruction": "Step instruction", "estimatedTime": 5}
  ],
  "tags": ["tag1", "tag2", "tag3"]
}

IMPORTANT:
- Use ONLY decimal numbers for amounts (0.25, 0.5, 1.5) - NEVER use fractions (1/4, 1/2)
- Return ONLY valid JSON without any markdown code blocks or extra text
- Do not include any comments or explanations outside the JSON`;

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `You are a professional chef and cookbook author. Create detailed, practical recipes that are easy to follow.

IMPORTANT: Respond with ONLY valid JSON. Do not wrap in markdown code blocks. Do not add any explanatory text before or after the JSON.

${prompt}

Remember: Return ONLY the JSON object, nothing else.`,
            },
          ],
        },
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 2000,
      },
    });

    const responseText = result.response.text();

    if (!responseText) {
      throw new Error("No response from Gemini");
    }

    console.log("🔍 Raw Gemini response:", responseText);

    // Clean the response - remove markdown code blocks and other artifacts
    let cleanedResponse = responseText.trim();

    // Remove markdown code blocks (```json ... ``` or ``` ... ```)
    if (cleanedResponse.startsWith("```")) {
      const firstNewline = cleanedResponse.indexOf("\n");
      const lastBackticks = cleanedResponse.lastIndexOf("```");
      if (firstNewline !== -1 && lastBackticks !== -1) {
        cleanedResponse = cleanedResponse
          .substring(firstNewline + 1, lastBackticks)
          .trim();
      }
    }

    // Remove any leading/trailing non-JSON content
    // Find the first { and last }
    const firstBrace = cleanedResponse.indexOf("{");
    const lastBrace = cleanedResponse.lastIndexOf("}");

    if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
      cleanedResponse = cleanedResponse.substring(firstBrace, lastBrace + 1);
    }

    // Remove any comments (// or /* */) that might be in the JSON
    cleanedResponse = cleanedResponse
      .replace(/\/\*[\s\S]*?\*\//g, "") // Remove /* */ comments
      .replace(/\/\/.*$/gm, ""); // Remove // comments

    // Convert fractions to decimals (e.g., 1/4 -> 0.25, 1/2 -> 0.5)
    cleanedResponse = cleanedResponse.replace(
      /(\d+)\/(\d+)/g,
      (match: string, numerator: string, denominator: string) => {
        const result = parseInt(numerator) / parseInt(denominator);
        return result.toString();
      },
    );

    console.log("🧹 Cleaned response:", cleanedResponse);

    // Parse the JSON response with error handling
    let generatedRecipe: GeneratedRecipeResponse;
    try {
      generatedRecipe = JSON.parse(cleanedResponse);
    } catch (parseError) {
      console.error("❌ JSON parsing failed:", parseError);
      console.error(
        "❌ Attempted to parse:",
        cleanedResponse.substring(0, 1000) + "...",
      );
      throw new Error(
        `Failed to parse AI response as JSON: ${
          parseError instanceof Error ? parseError.message : "Unknown error"
        }`,
      );
    }

    return NextResponse.json({
      success: true,
      recipe: generatedRecipe,
    });
  } catch (error) {
    console.error("❌ Error generating recipe with Gemini AI:", error);
    console.error("❌ Error details:", {
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
      type: typeof error,
    });

    console.log("🔄 Using fallback recipe generation...");

    // Return enhanced fallback recipe if AI fails
    const primaryIngredient = ingredients[0] || "ingredients";
    const secondaryIngredient = ingredients[1] || "seasonings";

    const fallbackRecipe: GeneratedRecipeResponse = {
      title: `Savory ${
        primaryIngredient.charAt(0).toUpperCase() + primaryIngredient.slice(1)
      } Delight`,
      description: `A delicious and easy recipe featuring ${primaryIngredient} and ${secondaryIngredient}. Perfect for a quick and satisfying meal that brings out the best flavors of your ingredients.`,
      prepTime: 15,
      cookTime: 25,
      servings: servings,
      difficulty: difficulty,
      cuisine: "Fusion",
      tags: ["quick-meal", "easy", "homestyle"],
      ingredients: ingredients.map((ing: string, index: number) => ({
        name: ing,
        amount: index === 0 ? 2 : 1, // Main ingredient gets more
        unit: index === 0 ? "cups" : "cup",
      })),
      steps: [
        {
          stepNumber: 1,
          instruction: `Clean and prep your ${primaryIngredient}. Wash and chop all vegetables into bite-sized pieces.`,
          estimatedTime: 8,
        },
        {
          stepNumber: 2,
          instruction: `Heat oil in a large pan over medium heat. Add ${primaryIngredient} and cook until golden.`,
          estimatedTime: 12,
        },
        {
          stepNumber: 3,
          instruction: `Add ${secondaryIngredient} and remaining ingredients. Season with salt, pepper, and your favorite spices.`,
          estimatedTime: 8,
        },
        {
          stepNumber: 4,
          instruction:
            "Cook until everything is tender and flavors are well combined. Taste and adjust seasoning.",
          estimatedTime: 5,
        },
        {
          stepNumber: 5,
          instruction: "Serve hot and enjoy your delicious homemade meal!",
          estimatedTime: 2,
        },
      ],
    };

    return NextResponse.json({
      success: true,
      recipe: fallbackRecipe,
      fallback: true,
    });
  }
}
