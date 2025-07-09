require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('../Database/Database.js'); // MongoDB connection function
const User = require('../models/user.js');
const Order = require('../models/order.js');
const Feedback = require('../models/feedback.js');
const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Test route
app.get('/', (req, res) => {
  res.send('✅ MongoDB connection working and server is running!');
});

app.post('/api/Orders', async (req, res) => {
  const { customerName, number, address, amount } = req.body;
  if (!customerName || !number || !address || !amount) {
    return res.status(400).send({ success: false, message: 'All fields are required' });
  }
  try {
    await Order.create({ customerName, number, address, amount });
    return res.status(201).send({ success: true, message: 'Order placed successfully!' });
  }catch (error) {
    console.error("Signup error:", error);
    return res.status(403).send({ success: false, message: error.message });
  }
});

app.post('/api/Signup', async (req, res) => {
  const { mobile, name, password } = req.body;
  if (!mobile || !name || !password) {
    return res.status(400).send({ success: false, message: 'All fields are required' });
  }
  try {
    await User.create({ mobile, name, password });
    return res.status(201).send({ success: true, message: 'User created' });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(403).send({ success: false, message: error.message });
  }
});

app.post('/api/Login', async (req, res) => {
  const { name, password } = req.body;
  if (!name || !password) {
    return res.status(400).send({ success: false, message: 'All fields are required' });
  }
  try {
    const user = await User.findOne({ name, password });
    if (!user) {
      return res.status(401).send({ success: false, message: 'Invalid credentials' });
    }
    return res.status(200).send({ success: true, message: 'Login successful', user });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).send({ success: false, message: 'Server error', error: error.message });
  }
});

app.post('/api/feedback', async(req, res) => {
  const { name, feedback } = req.body;
  if(!name && !feedback){
    return res.status(400).send({ success: false, message: 'Name and feedback are required' });
  }
  try {
    await Feedback.create({ name, feedback });
    return res.status(201).send({ success: true, message: 'Feedback submitted' });
  } catch (error) {
    return res.status(500).send({ success: false, message: 'Server error', error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
