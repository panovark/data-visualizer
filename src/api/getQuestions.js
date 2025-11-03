export default async function getQuestions() {
  const url = "https://opentdb.com/api.php?amount=50";

  try {
    const response = await fetch(url);

    if (!response.ok) {
      if (response.status === 429) {
        throw new Error("Too many requests! Please wait 5-10 seconds.");
      }
      throw new Error(`Response status: ${response.status}`);
    }

    const data = await response.json();

    if (data.response_code !== 0) {
      if (data.response_code === 5) {
        throw new Error("Rate limit exceeded. Please wait 5 seconds.");
      }
      throw new Error(`API Error: response code ${data.response_code}`);
    }

    return data.results;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
}
