const express = require('express');
const router = express.Router();
const HealthData = require('../models/HealthData');
const generateTips = require('../geminiClient');

router.get('/gemini-tips/:userId', async (req, res) => {
  try {
    const userHealthData = await HealthData.findById(req.params.userId);
    if (!userHealthData) return res.status(404).json({ error: 'User health data not found' });

    const tips = await generateTips(userHealthData);
    res.json({ tips });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch Gemini AI tips" });
  }
});

module.exports = router;
