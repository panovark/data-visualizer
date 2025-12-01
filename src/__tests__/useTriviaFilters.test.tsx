import { renderHook, act } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import useTriviaFilters from "@/hooks/useTriviaFilters";
import type { TriviaQuestion } from "@/types/trivia";

const sampleQuestions: TriviaQuestion[] = [
  {
    category: "Science &amp; Nature",
    difficulty: "easy",
    question: "Q1",
    type: "multiple",
    correct_answer: "A",
    incorrect_answers: ["B", "C", "D"],
  },
  {
    category: "Science &amp; Nature",
    difficulty: "medium",
    question: "Q2",
    type: "multiple",
    correct_answer: "A",
    incorrect_answers: ["B", "C", "D"],
  },
  {
    category: "Video Games",
    difficulty: "hard",
    question: "Q3",
    type: "multiple",
    correct_answer: "A",
    incorrect_answers: ["B", "C", "D"],
  },
  {
    category: "History",
    difficulty: "medium",
    question: "Q4",
    type: "multiple",
    correct_answer: "A",
    incorrect_answers: ["B", "C", "D"],
  },
];

describe("useTriviaFilters", () => {
  it("returns the unfiltered aggregates by default", () => {
    const { result } = renderHook(() => useTriviaFilters(sampleQuestions));

    expect(result.current.selectedCategory).toBe("all");
    expect(result.current.totalQuestions).toBe(4);
    expect(result.current.categories).toEqual([
      { name: "Science & Nature", count: 2 },
      { name: "Video Games", count: 1 },
      { name: "History", count: 1 },
    ]);
    expect(result.current.filteredQuestions).toHaveLength(4);
    expect(result.current.filteredCategories).toEqual(result.current.categories);
    expect(result.current.filteredDifficulties).toEqual([
      { name: "easy", count: 1 },
      { name: "medium", count: 2 },
      { name: "hard", count: 1 },
    ]);
    expect(result.current.filterStatus).toBe(
      "Showing 4 questions across all categories",
    );
  });

  it("filters questions and aggregates when a category is selected", () => {
    const { result } = renderHook(() => useTriviaFilters(sampleQuestions));

    act(() => {
      result.current.setSelectedCategory("Science & Nature");
    });

    expect(result.current.filteredQuestions).toHaveLength(2);
    expect(result.current.filteredCategories).toEqual([
      { name: "Science & Nature", count: 2 },
    ]);
    expect(result.current.filteredDifficulties).toEqual([
      { name: "easy", count: 1 },
      { name: "medium", count: 1 },
    ]);
    expect(result.current.filterStatus).toBe(
      "Showing 2 questions in Science & Nature",
    );

    act(() => {
      result.current.setSelectedCategory("Geography");
    });

    expect(result.current.filteredQuestions).toHaveLength(0);
    expect(result.current.filteredCategories).toEqual([]);
    expect(result.current.filteredDifficulties).toEqual([]);
    expect(result.current.filterStatus).toBe("No questions in this category");
  });
});
