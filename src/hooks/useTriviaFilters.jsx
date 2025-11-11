import { useMemo, useState } from "react";
import {
  getCategoryCounts,
  getDifficultyCounts,
} from "@/trivia/dataProcessing";
import { decodeHtmlEntities } from "@/trivia/text";

const useTriviaFilters = (questions = []) => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = useMemo(() => {
    if (questions.length === 0) {
      return [];
    }
    return getCategoryCounts(questions);
  }, [questions]);

  const filteredQuestions = useMemo(() => {
    if (selectedCategory === "all") {
      return questions;
    }
    return questions.filter((question) => {
      const category = question?.category;
      return (
        typeof category === "string" &&
        decodeHtmlEntities(category) === selectedCategory
      );
    });
  }, [questions, selectedCategory]);

  const filteredCategories = useMemo(() => {
    if (selectedCategory === "all") {
      return categories;
    }
    if (filteredQuestions.length === 0) {
      return [];
    }
    return getCategoryCounts(filteredQuestions);
  }, [categories, filteredQuestions, selectedCategory]);

  const filteredDifficulties = useMemo(() => {
    if (filteredQuestions.length === 0) {
      return [];
    }
    return getDifficultyCounts(filteredQuestions);
  }, [filteredQuestions]);

  const totalQuestions = questions.length;
  const filteredCount = filteredQuestions.length;

  const filterStatus = useMemo(() => {
    if (selectedCategory === "all") {
      const ending = totalQuestions === 1 ? "" : "s";
      return `Showing ${totalQuestions} question${ending} across all categories`;
    }

    if (filteredCount === 0) {
      return "No questions in this category";
    }

    const ending = filteredCount === 1 ? "" : "s";
    return `Showing ${filteredCount} question${ending} in ${selectedCategory}`;
  }, [filteredCount, selectedCategory, totalQuestions]);

  return {
    selectedCategory,
    setSelectedCategory,
    categories,
    filteredQuestions,
    filteredCategories,
    filteredDifficulties,
    filterStatus,
    totalQuestions,
  };
};

export default useTriviaFilters;
