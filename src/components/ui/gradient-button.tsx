import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface GradientVariants {
  "emerald-purple": "emerald-purple"; // from-emerald-500 to-purple-500
  "emerald-blue": "emerald-blue"; // from-emerald-500 to-blue-500
  "emerald-green": "emerald-green"; // from-emerald-500 to-green-500
  "blue-cyan": "blue-cyan"; // from-blue-500 to-cyan-500
  "purple-pink": "purple-pink"; // from-purple-500 to-pink-500
  "glass": "glass"; // glassmorphism style
}

type GradientVariant = keyof GradientVariants;

interface GradientButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: GradientVariant;
  isActive?: boolean;
  withMotion?: boolean;
  size?: "default" | "sm" | "lg" | "icon";
  children: React.ReactNode;
}

const gradientClasses: Record<
  GradientVariant,
  { active: string; inactive: string }
> = {
  "emerald-purple": {
    active:
      "bg-gradient-to-r from-emerald-500 to-purple-500 text-white shadow-lg border-0",
    inactive:
      "bg-white/20 text-white border border-white/30 hover:bg-white/30 backdrop-blur-sm",
  },
  "emerald-blue": {
    active:
      "bg-gradient-to-r from-emerald-500 to-blue-500 text-white shadow-lg border-0",
    inactive:
      "bg-white/20 text-white border border-white/30 hover:bg-white/30 backdrop-blur-sm",
  },
  "emerald-green": {
    active:
      "bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-lg border-0",
    inactive:
      "bg-white/20 text-white border border-white/30 hover:bg-white/30 backdrop-blur-sm",
  },
  "blue-cyan": {
    active:
      "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg border-0",
    inactive:
      "bg-white/20 text-white border border-white/30 hover:bg-white/30 backdrop-blur-sm",
  },
  "purple-pink": {
    active:
      "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg border-0",
    inactive:
      "bg-white/20 text-white border border-white/30 hover:bg-white/30 backdrop-blur-sm",
  },
  glass: {
    active:
      "bg-white/30 text-white border border-white/50 backdrop-blur-sm shadow-lg",
    inactive:
      "bg-white/20 text-white border border-white/30 hover:bg-white/30 backdrop-blur-sm",
  },
};

export const GradientButton = forwardRef<
  HTMLButtonElement,
  GradientButtonProps
>(
  (
    {
      variant = "emerald-purple",
      isActive = false,
      withMotion = true,
      size = "default",
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const buttonClasses = cn(
      "transition-all duration-200",
      isActive
        ? gradientClasses[variant].active
        : gradientClasses[variant].inactive,
      className,
    );

    const buttonContent = (
      <Button
        ref={ref}
        variant="ghost"
        size={size}
        className={buttonClasses}
        aria-pressed={isActive}
        role="button"
        {...props}
      >
        {children}
      </Button>
    );

    if (withMotion) {
      return (
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          {buttonContent}
        </motion.div>
      );
    }

    return buttonContent;
  },
);

GradientButton.displayName = "GradientButton";
