import { useId } from "react";
import { Monitor, Moon, Sun } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTheme } from "@/components/ThemeProvider";
import { cn } from "@/lib/utils";

const ThemeToggle = ({ className }) => {
  const { theme, setTheme } = useTheme();
  const selectId = useId();

  return (
    <div className={cn("flex justify-center md:justify-end", className)}>
      <div className="flex items-center flex-col gap-1">
        <label
          className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground"
          htmlFor={selectId}
        >
          Theme
        </label>
        <Select value={theme} onValueChange={setTheme}>
          <SelectTrigger
            id={selectId}
            className="h-10 rounded-full border border-border/50 bg-background/90 px-3 text-sm font-medium transition-colors focus:border-primary/60 focus-visible:ring-2 focus-visible:ring-primary/25"
            aria-label="Choose theme"
          >
            <SelectValue placeholder="Select theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">
              <span className="flex items-center gap-2">
                <Sun className="size-4" />
                Light
              </span>
            </SelectItem>
            <SelectItem value="dark">
              <span className="flex items-center gap-2">
                <Moon className="size-4" />
                Dark
              </span>
            </SelectItem>
            <SelectItem value="system">
              <span className="flex items-center gap-2">
                <Monitor className="size-4" />
                System
              </span>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default ThemeToggle;
