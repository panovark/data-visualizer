import { useQuery } from "@tanstack/react-query";
import getQuestions from "./api/getQuestions";
import CategoryList from "./CategoryList";

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

  return (
    <div>
      <h1>Trivia Data Visualization Tool</h1>
      <p>Loaded {questions.length} questions</p>
      <CategoryList questions={questions} />
    </div>
  );
};

export default DataLoader;
