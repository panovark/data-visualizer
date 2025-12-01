import { TriviaApiResponse, TriviaQuestion } from "@/types/trivia";

interface GetQuestionsOptions {
  signal?: AbortSignal;
}

const API_URL = "https://opentdb.com/api.php?amount=50";

export default async function getQuestions(
  { signal }: GetQuestionsOptions = {},
): Promise<TriviaQuestion[]> {
  try {
    const response = await fetch(API_URL, { signal });

    if (!response.ok) {
      if (response.status === 429) {
        throw new Error("Too many requests! Please wait 5-10 seconds.");
      }
      throw new Error(`Response status: ${response.status}`);
    }

    const data: unknown = await response.json();
    const parsed = data as TriviaApiResponse;

    if (parsed.response_code !== 0) {
      if (parsed.response_code === 5) {
        throw new Error("Rate limit exceeded. Please wait 5 seconds.");
      }
      throw new Error(`API Error: response code ${parsed.response_code}`);
    }

    return parsed.results;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(message);
    throw error;
  }
}
