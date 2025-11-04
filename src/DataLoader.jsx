import { useQuery } from "@tanstack/react-query";
import getQuestions from "./api/getQuestions";
import CategoryList from "./CategoryList";
import CategoryChart from "./CategoryChart";
import { getCategoryCounts } from "./utils/dataProcessing";

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

  if (isLoading) return <div>Loading questions...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const categories = getCategoryCounts(questions);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-2">
        Trivia Data Visualization Tool
      </h1>
      <p className="text-muted-foreground mb-8">
        Loaded {questions.length} questions
      </p>

      <CategoryChart categories={categories} />

      <CategoryList questions={questions} />
    </div>
  );
};

export default DataLoader;
