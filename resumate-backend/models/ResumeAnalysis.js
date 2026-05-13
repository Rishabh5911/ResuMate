const mongoose =  require("mongoose");

const resumeAnalysisSchema = new mongoose.Schema({
   userId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User",
      required:true
   },
   fileName:{
      type:String,
      required:true
   },
   analysisData:{
      type:Object,
   }
},{timestamps:true});

module.exports = mongoose.model("ResumeAnalysis", resumeAnalysisSchema);