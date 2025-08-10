import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Recipe } from "@/types/recipe";

interface DifficultyBadgeProps {
  difficulty: Recipe["difficulty"];
  className?: string;
}

const difficultyStyles: Record<Recipe["difficulty"], string> = {
  easy: "bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-emerald-200",
  medium: "bg-amber-100 text-amber-700 hover:bg-amber-200 border-amber-200",
  hard: "bg-rose-100 text-rose-700 hover:bg-rose-200 border-rose-200",
};

export function DifficultyBadge({
  difficulty,
  className,
}: DifficultyBadgeProps) {
  return (
    <Badge className={cn(difficultyStyles[difficulty], className)}>
      {difficulty}
    </Badge>
  );
}
