const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim:true
  },
  fullName: {
    type: String,
    required: true, 
  },
  password: {
    type: String,
    required: true, 
  },
  otp: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 300 
  },
  isVerified:{
    type:Boolean,
    default:false
  }
});


module.exports = mongoose.model("OTP", otpSchema);