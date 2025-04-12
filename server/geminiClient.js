// geminiClient.js
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function generateTips(userHealthData) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `
    A user has the following health data:
    - Age: ${userHealthData.age}
    - Gender: ${userHealthData.gender}
    - Height: ${userHealthData.height} cm
    - Weight: ${userHealthData.weight} kg
    - Blood Pressure: ${userHealthData.bloodPressure}
    - Heart Rate: ${userHealthData.heartRate}
    - Sugar Level: ${userHealthData.sugarLevel}
    - Activity Level: ${userHealthData.activityLevel}

    Based on this, suggest personalized health tips.
  `;

  const result = await model.generateContent(prompt);
  const response = result.response;
  return response.text();
}

module.exports = generateTips;
