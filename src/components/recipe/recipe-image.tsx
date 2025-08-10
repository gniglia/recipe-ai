import Image from "next/image";

import { getRecipeGradient, getRecipeIcon } from "@/lib/image-service";

interface RecipeImageProps {
  recipe: {
    id: string;
    title: string;
    imageUrl?: string;
  };
  className?: string;
  showOverlay?: boolean;
  variant?: "card" | "modal";
  children?: React.ReactNode;
}

export function RecipeImage({
  recipe,
  className = "",
  showOverlay = true,
  variant = "card",
  children,
}: RecipeImageProps) {
  const gradient = getRecipeGradient(recipe.title);
  const icon = getRecipeIcon(recipe.title);

  const isCard = variant === "card";

  return (
    <div
      className={`relative bg-gradient-to-br ${gradient} overflow-hidden ${className}`}
    >
      {recipe.imageUrl ? (
        <>
          <Image
            src={recipe.imageUrl}
            alt={recipe.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
          />
          {showOverlay && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          )}
        </>
      ) : (
        <>
          {/* Beautiful gradient placeholder with recipe icon */}
          {showOverlay && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
          )}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className={`opacity-20 transition-transform duration-300 ${
                isCard
                  ? "text-6xl sm:text-7xl group-hover:scale-110"
                  : "text-8xl sm:text-9xl"
              }`}
            >
              {icon}
            </div>
          </div>
        </>
      )}

      {/* Render children on top of image */}
      {children}
    </div>
  );
}
