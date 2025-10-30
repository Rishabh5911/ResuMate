const {extractTextFromDOCX,extractTextFromPDF} = require("../services/resumeService.js");
const { generateResponse } = require("../services/openAIService.js");
const fs = require("fs");

const uploadResume = async (req, res) => {
  try {
    let file = req.file;
    const jobDescription = req.body.jobDescription || "";


    if (!file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    
   let prompt = `
You are an expert AI Resume Analyzer designed to evaluate resumes based on industry best practices, ATS (Applicant Tracking System) standards, and relevance to modern recruitment processes.

You may be provided with two inputs:
1. The full text of a candidate's resume.
2. (Optional) A job description (JD) they want to apply for.

Your tasks:
1. Always analyze the resume for overall quality, ATS compatibility, content quality, format design, and keyword match.
2. If a job description (JD) is provided:
   - Extract important technical and soft skill keywords from the JD.
   - Compare them with the resume content to find which keywords are missing or weakly represented.
   - Generate a dynamic "missing_keywords" array that lists only the specific keywords from the JD that are not present in the resume.
   - Calculate a realistic "match_score" (0–100) based on the proportion of JD keywords found in the resume, allowing for partial and semantic matches where appropriate.
3. If no JD is provided, set "match_score" to null and "missing_keywords" to an empty array.

Return the final result strictly in this JSON format:

{
  "overall_score": <number between 0-100>,
  "score_breakdown": {
    "ATS_Compatibility": <number between 0-100>,
    "Content_Quality": <number between 0-100>,
    "Format_Design": <number between 0-100>,
    "Keywords_Match": <number between 0-100>
  },
  "jd_match_analysis": {
    "match_score": <number between 0-100 or null>,
    "missing_keywords": ["keyword1", "keyword2", "keyword3", "..."]
  },
  "top_strengths": [
    "Strength point 1",
    "Strength point 2",
    "Strength point 3"
  ],
  "top_improvements": [
    "Improvement area 1",
    "Improvement area 2",
    "Improvement area 3"
  ],
  "actionable_suggestions": {
    "Keyword_Optimization": "Practical, specific advice on adding missing keywords or improving alignment with the job description.",
    "Achievements": "Specific guidance to make achievements quantifiable and role-relevant.",
    "Section_Order": "Advice on optimizing resume structure for clarity and recruiter impact."
  },
  "resume_guidance": "Write a short, friendly, 1–2 line overall summary of the resume's quality and JD alignment."
}

Rules:
- Do not include any text or explanation outside the JSON.
- Be realistic and consistent in all scoring.
- If no JD is provided, skip job match comparison.
`;


    let resumeText = "";

    if (
      file.mimetype ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      resumeText = await extractTextFromDOCX(file.path);
    } else if (file.mimetype === "application/pdf") {
      resumeText = await extractTextFromPDF(file.path);
    } else {
      return res.status(400).json({
        success: false,
        message: "Unsupported file format. Please upload a DOCX or PDF file.",
      });
    }

    
    let fullPrompt = `${prompt}\n\nResume Text:\n${resumeText}\n\nJob Description (JD):\n${jobDescription || "No JD provided"}`;

    let aiResponse = await generateResponse(fullPrompt);

   

    res.status(200).json({
      success: true,
      message: "Resume analyzed successfully",
      data: aiResponse,
    });
  } catch (error) {
    console.error("Error uploading resume:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  } finally {
    fs.unlink(req.file.path, (err) => {
      if (err) {
        console.error("Error deleting file:", err);
      } else {
        console.log("Uploaded file deleted successfully");
      }
    });
  }
};

module.exports = {
  uploadResume,
};
