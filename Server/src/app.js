require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('../Database/Database.js'); // MongoDB connection function
console.log('🔍 Loaded ENV Variables:');
console.log('PORT:', process.env.PORT);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Test route
app.get('/', (req, res) => {
  res.send('✅ MongoDB connection working and server is running!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
