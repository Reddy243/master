const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  mobile: {
    type: String,
    required: true,
    unique: true,
    match: [/^[6-9]\d{9}$/, 'Enter a valid 10-digit Indian mobile number'],
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  role:{
    type: String,
    default: 'user'
  }
}, {
  timestamps: true
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
