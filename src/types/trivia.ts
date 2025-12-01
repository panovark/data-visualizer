export type TriviaDifficulty = "easy" | "medium" | "hard";

export type TriviaQuestionType = "multiple" | "boolean";

export interface TriviaQuestion {
  category: string;
  type: TriviaQuestionType;
  difficulty: TriviaDifficulty;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface TriviaApiResponse {
  response_code: number;
  results: TriviaQuestion[];
}

export interface TriviaCount {
  name: string;
  count: number;
}
