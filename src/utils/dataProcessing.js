import decodeHtmlEntities from "./text";

export const getCountsByField = (questions = [], field) => {
  const counts = questions.reduce((acc, question) => {
    if (!question || typeof question[field] !== "string") {
      return acc;
    }

    const value = decodeHtmlEntities(question[field]);
    acc[value] = (acc[value] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(counts).map(([name, count]) => ({
    name,
    count,
  }));
};

export const getCategoryCounts = (questions) =>
  getCountsByField(questions, "category");

export const getDifficultyCounts = (questions) =>
  getCountsByField(questions, "difficulty");
