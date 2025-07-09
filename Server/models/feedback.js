const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true, 
        trim: true 
    },
    feedback: { 
        type: String, 
        required: true, 
        trim: true, 
    }
}, { timestamps: true });

const Feedback = mongoose.model("Feedback", FeedbackSchema);
module.exports = Feedback;