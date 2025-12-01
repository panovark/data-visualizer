import decodeHtmlEntities from "./text";
import { TriviaCount, TriviaQuestion } from "@/types/trivia";

type CountableField = "category" | "difficulty";

export const getCountsByField = (
  questions: TriviaQuestion[] = [],
  field: CountableField,
): TriviaCount[] => {
  const counts = questions.reduce<Record<string, number>>((acc, question) => {
    const value = question?.[field];

    if (typeof value !== "string") {
      return acc;
    }

    const decoded = decodeHtmlEntities(value);
    acc[decoded] = (acc[decoded] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(counts).map(([name, count]) => ({
    name,
    count,
  }));
};

export const getCategoryCounts = (questions?: TriviaQuestion[]) =>
  getCountsByField(questions, "category");

export const getDifficultyCounts = (questions?: TriviaQuestion[]) =>
  getCountsByField(questions, "difficulty");
