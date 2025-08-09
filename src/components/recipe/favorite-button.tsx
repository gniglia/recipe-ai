import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";

interface FavoriteButtonProps {
  isFavorite: boolean;
  onClick: (e: React.MouseEvent) => void;
  variant?: "card" | "modal";
  className?: string;
}

export function FavoriteButton({
  isFavorite,
  onClick,
  variant = "card",
  className = "",
}: FavoriteButtonProps) {
  const isCard = variant === "card";

  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={className}
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={onClick}
        className={
          isCard
            ? "p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white hover:shadow-lg transition-all duration-200"
            : "p-2 rounded-full hover:bg-gray-100 transition-all duration-200"
        }
      >
        <motion.div
          animate={{
            scale: isFavorite ? [1, 1.3, 1] : 1,
            rotate: isFavorite ? [0, 10, -10, 0] : 0,
          }}
          transition={{ duration: 0.4 }}
        >
          <Heart
            className={`h-4 w-4 transition-all duration-200 ${
              isFavorite
                ? "text-rose-500 fill-rose-500"
                : "text-gray-600 hover:text-rose-500"
            }`}
          />
        </motion.div>
      </Button>
    </motion.div>
  );
}
