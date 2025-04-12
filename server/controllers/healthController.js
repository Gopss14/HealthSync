const HealthData = require('../models/HealthData');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.submitHealthData = async (req, res) => {
  try {
    const { weight, steps, calories, sleep } = req.body;

    // Validate input
    if (!weight || !steps || !calories || !sleep) {
      return res.status(400).json({ message: "Missing required health data" });
    }

    // Save health data to database
    const newData = new HealthData({ weight, steps, calories, sleep });
    await newData.save();

    // Prepare AI prompt
    const prompt = `Give a short, personalized health tip based on the following data:
    - Weight: ${weight}kg
    - Steps: ${steps}
    - Calories: ${calories}
    - Sleep: ${sleep} hours`;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    const result = await model.generateContent(prompt);

    // Safe AI Tip extraction
    let aiTip = "No tip generated.";
    try {
      const candidates = result?.response?.candidates;
      const parts = candidates?.[0]?.content?.parts;
      if (parts && parts.length > 0) {
        aiTip = parts[0]?.text?.trim() || aiTip;
      }
    } catch (parseErr) {
      console.warn("Error extracting AI tip:", parseErr.message);
    }

    // ✅ Only one response is ever sent from here
    return res.status(200).json({ message: "Data saved successfully", tip: aiTip });

  } catch (error) {
    console.error("Server error:", error.message);
    if (!res.headersSent) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }
};
