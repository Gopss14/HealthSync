require('dotenv').config(); // ADD THIS

const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post('/chatbot', async (req, res) => {
  const { message } = req.body;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    const result = await model.generateContent(`User: ${message}\nHealthBot:`);

    const reply = result?.response?.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I didn't get that.";
    return res.status(200).json({ reply: reply.trim() });
  } catch (err) {
    console.error('Chatbot error:', err.message);
    res.status(500).json({ reply: "Oops! Something went wrong." });
  }
});

module.exports = router;
