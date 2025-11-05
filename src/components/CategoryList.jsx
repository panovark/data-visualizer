import { useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getCategoryCounts } from "@/utils/dataProcessing";

const CategoryList = ({ questions }) => {
  const categories = useMemo(() => {
    if (!questions || questions.length === 0) {
      return [];
    }
    return [...getCategoryCounts(questions)].sort((a, b) => b.count - a.count);
  }, [questions]);

  const hasCategories = categories.length > 0;
  const description = hasCategories
    ? `Grouped into ${categories.length} categor${
        categories.length === 1 ? "y" : "ies"
      }`
    : "No categories to display";

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl sm:text-2xl">
          Category Breakdown
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {hasCategories ? (
          <ul className="space-y-3">
            {categories.map((category) => {
              const suffix = category.count === 1 ? "question" : "questions";

              return (
                <li
                  key={category.name}
                  className="flex items-center justify-between rounded-lg border border-border bg-muted/40 p-3 transition hover:border-primary/50 hover:bg-muted/60"
                >
                  <div className="flex-1">
                    <p className="font-medium text-foreground">
                      {category.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {suffix.charAt(0).toUpperCase() + suffix.slice(1)}
                    </p>
                  </div>
                  <span className="ml-4 text-lg font-semibold text-primary">
                    {category.count}
                  </span>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground">
            No questions match the current filter.
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default CategoryList;
