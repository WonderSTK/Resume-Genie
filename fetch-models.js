require('dotenv').config({ path: '.env.local' });
if (!process.env.GEMINI_API_KEY) require('dotenv').config();

async function checkModels() {
  const key = process.env.GEMINI_API_KEY;
  if (!key) {
    console.error("No API key found");
    return;
  }
  const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${key}`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log("Status:", response.status);
    const fs = require('fs');
    fs.writeFileSync('models.json', JSON.stringify(data, null, 2));
    console.log("Written to models.json");
  } catch (err) {
    console.error("Error fetching models:", err);
  }
}

checkModels();
