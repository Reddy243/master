const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    customerName: { 
        type: String, 
        required: true, 
        trim: true 
    },
    number: {
        type: String,
        required: true,
        trim: true,
        match: /^[6-9]\d{9}$/,
    },
    address: { 
        type: String, 
        required: true, 
        trim: true, 
    },
    amount : {
        type: Number,
        required: true,
        min: 1
    }
}, { timestamps: true });

const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;