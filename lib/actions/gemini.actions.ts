"use server";

import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json", // Keep this for JSON output
};

async function askGemini(prompt: string): Promise<string> {
  const chatSession = model.startChat({
    generationConfig,
    history: [],
  });

  try {
    const result = await chatSession.sendMessage(prompt);
    // Directly return the text, JSON.parse will be handled in the calling function
    return result.response.text();
  } catch (error) {
    console.error("Error communicating with Gemini API:", error);
    throw new Error("Failed to get response from Gemini API.");
  }
}

export async function generateSummary(jobTitle: string): Promise<any> {
  const prompt =
    jobTitle && jobTitle !== ""
      ? `Given the job title '${jobTitle}', provide a summary for three experience levels: Senior, Mid Level, and Fresher. Each summary should be 3-4 lines long and include the experience level and the corresponding summary in JSON format. The output should be an array of objects, each containing 'experience_level' and 'summary' fields. Ensure the summaries are tailored to each experience level.`
      : `Create a 3-4 line summary about myself for my resume, emphasizing my personality, social skills, and interests outside of work. The output should be an array of JSON objects, each containing 'experience_level' and 'summary' fields representing Active, Average, and Lazy personality traits. Use example hobbies if needed but do not insert placeholders for me to fill in.`;

  const rawResult = await askGemini(prompt);
  try {
    // Attempt to parse the result. If it fails, log and potentially return a default or re-throw.
    return JSON.parse(rawResult);
  } catch (error) {
    console.error("Failed to parse JSON for generateSummary:", rawResult, error);
    // You might want to handle this more gracefully, e.g., by returning an empty array or a specific error object.
    throw new Error("Invalid JSON response from Gemini API for summary generation.");
  }
}

export async function generateEducationDescription(educationInfo: string): Promise<any> {
  const prompt = `Based on my education at ${educationInfo}, provide personal descriptions for three levels of curriculum activities: High Activity, Medium Activity, and Low Activity. Each description should be 3-4 lines long and written from my perspective, reflecting on past experiences. The output should be an array of JSON objects, each containing 'activity_level' and 'description' fields. Please include a subtle hint about my good (but not the best) results.`;

  const rawResult = await askGemini(prompt);
  try {
    return JSON.parse(rawResult);
  } catch (error) {
    console.error("Failed to parse JSON for generateEducationDescription:", rawResult, error);
    throw new Error("Invalid JSON response from Gemini API for education description.");
  }
}

export async function generateExperienceDescription(experienceInfo: string): Promise<any> {
  const prompt = `Given that I have experience working as ${experienceInfo}, provide a summary of three levels of activities I performed in that position, preferably as a list: High Activity, Medium Activity, and Low Activity. Each summary should be 3-4 lines long and written from my perspective, reflecting on my past experiences in that workplace. The output should be an array of JSON objects, each containing 'activity_level' and 'description' fields. You can include <b>, <i>, <u>, <s>, <blockquote>, <ul>, <ol>, and <li> to further enhance the descriptions. Use example work samples if needed, but do not insert placeholders for me to fill in.`;

  const rawResult = await askGemini(prompt);
  try {
    return JSON.parse(rawResult);
  } catch (error) {
    console.error("Failed to parse JSON for generateExperienceDescription:", rawResult, error);
    throw new Error("Invalid JSON response from Gemini API for experience description.");
  }
}