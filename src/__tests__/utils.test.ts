import { describe, expect, it } from "vitest";
import {
  getCategoryCounts,
  getDifficultyCounts,
} from "@/trivia/dataProcessing";
import { decodeHtmlEntities } from "@/trivia/text";
import type { TriviaQuestion } from "@/types/trivia";

describe("text utilities", () => {
  it("decodes common HTML entities and keeps unknown ones as-is", () => {
    expect(
      decodeHtmlEntities("Tom &amp; Jerry&#039;s &lt;tag&gt; &unknown;"),
    ).toBe("Tom & Jerry's <tag> &unknown;");
    expect(decodeHtmlEntities(null)).toBe("");
  });
});

describe("data processing helpers", () => {
  const sampleQuestions: Array<Partial<TriviaQuestion> | Record<string, unknown>> = [
    {
      category: "Science &amp; Nature",
      difficulty: "easy",
    },
    {
      category: "Science &amp; Nature",
      difficulty: "medium",
    },
    {
      category: "Video Games",
      difficulty: "hard",
    },
    {
      category: "History",
      difficulty: "medium",
    },
    {
      category: 42,
      difficulty: 0,
    },
  {
      category: "History",
      difficulty: null,
    },
  ];
  const typedQuestions = sampleQuestions as unknown as TriviaQuestion[];

  it("aggregates questions by category while decoding names", () => {
    expect(getCategoryCounts(typedQuestions)).toEqual([
      { name: "Science & Nature", count: 2 },
      { name: "Video Games", count: 1 },
      { name: "History", count: 2 },
    ]);
  });

  it("aggregates questions by difficulty while ignoring invalid values", () => {
    expect(getDifficultyCounts(typedQuestions)).toEqual([
      { name: "easy", count: 1 },
      { name: "medium", count: 2 },
      { name: "hard", count: 1 },
    ]);
  });
});
