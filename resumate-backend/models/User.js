const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/\S+@\S+\.\S+/, "Invalid email format"]
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  resetPasswordToken:{
    type:String,
    default:null
  },
  tokenExpiry:{
    type:Date,
    default:null
  },
  isVerified:{
    type:Boolean,
    default:false
  }
},{timestamps:true});

module.exports = mongoose.model("User", userSchema);