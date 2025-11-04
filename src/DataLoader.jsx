import { useQuery } from "@tanstack/react-query";
import getQuestions from "./api/getQuestions";
import CategoryList from "./CategoryList";
import CategoryChart from "./CategoryChart";
import DifficultyChart from "./DifficultyChart";
import CategoryFilter from "./CategoryFilter";
import useTriviaFilters from "./hooks/useTriviaFilters.jsx";

const DataLoader = () => {
  const {
    data: questions,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["questions"],
    queryFn: getQuestions,
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

  if (isLoading) return <div>Loading questions...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-2">
        Trivia Data Visualization Tool
      </h1>
      <p className="text-muted-foreground mb-8">
        Loaded {totalQuestions} questions
      </p>

      <div className="space-y-6">
        <CategoryFilter
          categories={categories}
          selected={selectedCategory}
          onChange={setSelectedCategory}
          helperText={filterStatus}
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <CategoryChart categories={filteredCategories} />
          <DifficultyChart difficulties={filteredDifficulties} />
        </div>

        <CategoryList questions={filteredQuestions} />
      </div>
    </div>
  );
};

export default DataLoader;
