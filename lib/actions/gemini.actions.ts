"use server";

import {
  GoogleGenerativeAI,
} from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const defaultGenerationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

async function askGemini(prompt: string, schema?: any, retries = 3, delay = 1000): Promise<string> {
  const config = {
    ...defaultGenerationConfig,
    responseSchema: schema,
  };

  for (let i = 0; i < retries; i++) {
    try {
      const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: config,
      });
      return result.response.text();
    } catch (error: any) {
      const isLastAttempt = i === retries - 1;
      console.error(`Attempt ${i + 1} failed:`, error);

      if (isLastAttempt) {
        throw new Error(`Failed to get response from Gemini API: ${error?.message || error}`);
      }

      if (error?.status === 429 || error?.status === 503 || error?.message?.includes("Too Many Requests")) {
        console.log(`Rate limit hit, retrying in ${delay}ms...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
        delay *= 2;
      } else {
        throw new Error(`Gemini API Error: ${error?.message || error}`);
      }
    }
  }
  
  throw new Error("Failed to get response from Gemini API after retries.");
}

export async function generateSummary(jobTitle: string): Promise<any> {
  const prompt =
    jobTitle && jobTitle !== ""
      ? `Given the job title '${jobTitle}', provide a summary for three experience levels: Senior, Mid Level, and Fresher. Each summary should be 3-4 lines long and include the experience level and the corresponding summary. Ensure the summaries are tailored to each experience level.`
      : `Create a 3-4 line summary about myself for my resume, emphasizing my personality, social skills, and interests outside of work. The output should be for three personality traits: Active, Average, and Lazy. Use example hobbies if needed but do not insert placeholders.`;

  const schema = {
    type: "ARRAY",
    items: {
      type: "OBJECT",
      properties: {
        experience_level: { type: "STRING" },
        summary: { type: "STRING" },
      },
      required: ["experience_level", "summary"],
    },
  };

  const rawResult = await askGemini(prompt, schema);
  try {
    return JSON.parse(rawResult);
  } catch (error) {
    console.error("Failed to parse JSON for generateSummary:", rawResult, error);
    throw new Error("Invalid JSON response from Gemini API for summary generation.");
  }
}

export async function generateEducationDescription(educationInfo: string): Promise<any> {
  const prompt = `Based on my education at ${educationInfo}, provide personal descriptions for three levels of curriculum activities: High Activity, Medium Activity, and Low Activity. Each description should be 3-4 lines long and written from my perspective. Please include a subtle hint about my good results.`;

  const schema = {
    type: "ARRAY",
    items: {
      type: "OBJECT",
      properties: {
        activity_level: { type: "STRING" },
        description: { type: "STRING" },
      },
      required: ["activity_level", "description"],
    },
  };

  const rawResult = await askGemini(prompt, schema);
  try {
    return JSON.parse(rawResult);
  } catch (error) {
    console.error("Failed to parse JSON for generateEducationDescription:", rawResult, error);
    throw new Error("Invalid JSON response from Gemini API for education description.");
  }
}

export async function generateExperienceDescription(experienceInfo: string): Promise<any> {
  const prompt = `Given that I have experience working as ${experienceInfo}, provide a summary of three levels of activities I performed in that position: High Activity, Medium Activity, and Low Activity. Each summary should be 3-4 lines long and written from my perspective. You can include HTML tags like <b>, <i>, etc.`;

  const schema = {
    type: "ARRAY",
    items: {
      type: "OBJECT",
      properties: {
        activity_level: { type: "STRING" },
        description: { type: "STRING" },
      },
      required: ["activity_level", "description"],
    },
  };

  const rawResult = await askGemini(prompt, schema);
  try {
    return JSON.parse(rawResult);
  } catch (error) {
    console.error("Failed to parse JSON for generateExperienceDescription:", rawResult, error);
    throw new Error("Invalid JSON response from Gemini API for experience description.");
  }
}