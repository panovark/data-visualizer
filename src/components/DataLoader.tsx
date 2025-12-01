import { useQuery } from "@tanstack/react-query";
import getQuestions from "@/api/getQuestions";
import CategoryList from "@/components/CategoryList";
import CategoryChart from "@/components/CategoryChart";
import DifficultyChart from "@/components/DifficultyChart";
import CategoryFilter from "@/components/CategoryFilter";
import useTriviaFilters from "@/hooks/useTriviaFilters";
import type { TriviaQuestion } from "@/types/trivia";
import ThemeToggle from "@/components/ThemeToggle";
import ErrorBoundary from "@/components/ErrorBoundary";
import LoadingState from "@/components/LoadingState";

const DataLoader = () => {
  const {
    data: questions,
    isLoading,
    error,
  } = useQuery<TriviaQuestion[], Error>({
    queryKey: ["questions"],
    queryFn: ({ signal }) => getQuestions({ signal }),
    staleTime: 5 * 60 * 1000,
  });

  const filters = useTriviaFilters(questions);

  const {
    selectedCategory,
    setSelectedCategory,
    categories,
    filteredQuestions,
    filteredCategories,
    filteredDifficulties,
    filterStatus,
    totalQuestions,
  } = filters;

  if (isLoading) return <LoadingState />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container mx-auto px-6 py-8 lg:px-8">
      <div className="mb-12 flex flex-col gap-8">
        <div className="flex flex-col items-center gap-6 text-center md:flex-row md:items-start md:justify-between md:text-left">
          <div>
            <h1 className="text-4xl font-bold sm:text-6xl">
              Trivia Data Visualization Tool
            </h1>
            <p className="text-lg mt-2 text-muted-foreground sm:text-2xl">
              Loaded {totalQuestions} questions
            </p>
          </div>
          <ErrorBoundary>
            <ThemeToggle className="w-full max-w-lg sm:max-w-md md:self-start" />
          </ErrorBoundary>
        </div>
        <div className="flex justify-center">
          <ErrorBoundary>
            <CategoryFilter
              categories={categories}
              selected={selectedCategory}
              onChange={setSelectedCategory}
              helperText={filterStatus}
              className="w-full max-w-lg sm:max-w-md"
            />
          </ErrorBoundary>
        </div>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <ErrorBoundary>
            <CategoryChart categories={filteredCategories} />
          </ErrorBoundary>
          <ErrorBoundary>
            <DifficultyChart difficulties={filteredDifficulties} />
          </ErrorBoundary>
        </div>
        <ErrorBoundary>
          <CategoryList questions={filteredQuestions} />
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default DataLoader;
