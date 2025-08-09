import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { forwardRef } from "react";

interface SearchInputProps extends React.ComponentProps<typeof Input> {
  variant?: "glass" | "solid";
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ variant = "glass", className, ...props }, ref) => {
    const glassStyles =
      "bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:border-emerald-300 focus:ring-emerald-200/50";
    const solidStyles =
      "bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-emerald-300 focus:ring-emerald-200/50";

    return (
      <div className="relative w-full">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 h-4 w-4" />
        <Input
          ref={ref}
          className={`pl-10 transition-all duration-200 ${
            variant === "glass" ? glassStyles : solidStyles
          } ${className}`}
          {...props}
        />
      </div>
    );
  },
);

SearchInput.displayName = "SearchInput";
