import { useId } from "react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import type { TriviaCount } from "@/types/trivia";

interface CategoryFilterProps {
  categories: TriviaCount[];
  selected: string;
  onChange: (value: string) => void;
  helperText?: string;
  className?: string;
}

const CategoryFilter = ({
  categories,
  selected,
  onChange,
  helperText,
  className,
}: CategoryFilterProps) => {
  const selectId = useId();
  const helperId = helperText ? `${selectId}-helper` : undefined;

  return (
    <div className={cn("w-full", className)}>
      <div className="flex w-full flex-col items-center gap-1">
        <label
          className="text-basic font-semibold uppercase tracking-[0.3em] text-muted-foreground"
          htmlFor={selectId}
        >
          Category
        </label>
        <Select value={selected} onValueChange={onChange}>
          <SelectTrigger
            id={selectId}
            aria-describedby={helperId}
            size="default"
            className="w-full rounded-full border border-border/50 bg-background/90 px-5 font-medium transition-colors focus:border-primary/60 focus-visible:ring-2 focus-visible:ring-primary/25"
          >
            <SelectValue placeholder="All categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.name} value={category.name}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {helperText && (
          <p id={helperId} className="text-sm text-muted-foreground">
            {helperText}
          </p>
        )}
      </div>
    </div>
  );
};

export default CategoryFilter;
