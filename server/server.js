const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express(); // ✅ app should be declared BEFORE using it
const PORT = 5000;


// Middleware
app.use(cors());
app.use(express.json());

// Routes
const healthRoute = require('./routes/health');
const geminiRoute = require('./routes/aiGemini');
const chatRoute = require('./routes/chatbot');
app.use('/api', chatRoute);


app.use('/api/health', healthRoute);
app.use('/api', geminiRoute);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => console.log(err));
