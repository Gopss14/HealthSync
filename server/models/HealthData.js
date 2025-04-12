const mongoose = require('mongoose');

const healthDataSchema = new mongoose.Schema({
  weight: Number,
  steps: Number,
  calories: Number,
  sleep: Number,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('HealthData', healthDataSchema);
