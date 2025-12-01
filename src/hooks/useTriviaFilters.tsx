import {
  useMemo,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import {
  getCategoryCounts,
  getDifficultyCounts,
} from "@/trivia/dataProcessing";
import { decodeHtmlEntities } from "@/trivia/text";
import type { TriviaCount, TriviaQuestion } from "@/types/trivia";

type SelectedCategory = string;

interface TriviaFiltersResult {
  selectedCategory: SelectedCategory;
  setSelectedCategory: Dispatch<SetStateAction<SelectedCategory>>;
  categories: TriviaCount[];
  filteredQuestions: TriviaQuestion[];
  filteredCategories: TriviaCount[];
  filteredDifficulties: TriviaCount[];
  filterStatus: string;
  totalQuestions: number;
}

const useTriviaFilters = (
  questions: TriviaQuestion[] = [],
): TriviaFiltersResult => {
  const [selectedCategory, setSelectedCategory] =
    useState<SelectedCategory>("all");

  const categories = useMemo<TriviaCount[]>(() => {
    if (questions.length === 0) {
      return [];
    }
    return getCategoryCounts(questions);
  }, [questions]);

  const filteredQuestions = useMemo<TriviaQuestion[]>(() => {
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

  const filteredDifficulties = useMemo<TriviaCount[]>(() => {
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
