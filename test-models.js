const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config({ path: '.env.local' }); // Try .env.local first
require('dotenv').config(); // Fallback to .env

async function listModels() {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  // For listing models we might need to access the API directly or use a different method if not exposed strictly on genAI instance easily in all versions.
  // Actually, currently listModels isn't a direct top-level helper on GoogleGenerativeAI in all versions, 
  // but let's try to just check if we can run a simple generation with 'gemini-pro' to see if key works at all,
  // or use the model manager if available in this sdk version.

  // NOTE: In 0.14.x, we might not have listModels easily exposed via the main class without ModelManager.
  // Let's try a different approach: just try to generate with gemini-1.5-flash-001 and gemini-1.5-flash-latest and gemini-pro to see which one doesn't throw.
  
  const models = [
    "gemini-2.0-flash-lite-preview-02-05",
    "gemini-2.0-flash-lite",
    "gemini-2.0-flash",
    "gemini-2.0-flash-001"
  ];

  console.log("Testing models with API Key:", process.env.GEMINI_API_KEY ? "Found" : "Missing");

  for (const modelName of models) {
    try {
      console.log(`Testing ${modelName}...`);
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent("Hello");
      console.log(`SUCCESS: ${modelName} works.`);
      console.log(result.response.text());
      break; 
    } catch (error) {
      console.log(`FAILED: ${modelName}`);
      const fs = require('fs');
      fs.appendFileSync('error.log', `Error for ${modelName}:\n${JSON.stringify(error, null, 2)}\nMessage: ${error.message}\n-------------------\n`);
    }
  }
}

listModels();
