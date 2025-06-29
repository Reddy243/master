require('dotenv').config();
const mongoose = require('mongoose');

const encodedPassword = encodeURIComponent(process.env.DB_PASSWORD);
const uri = `mongodb+srv://mern_user:${encodedPassword}@cluster0.wibi6yq.mongodb.net/shopdb?retryWrites=true&w=majority&appName=Cluster0`;

async function connectDB() {
  try {
    await mongoose.connect(uri);
    console.log('✅ Mongoose connected to MongoDB');
  } catch (err) {
    console.error('❌ Mongoose connection error:', err);
    throw err;
  }
}

module.exports = connectDB;
