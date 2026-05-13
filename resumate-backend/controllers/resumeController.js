const {
  extractTextFromDOCX,
  extractTextFromPDF,
} = require("../services/resumeService.js");
const { generateResponse } = require("../services/geminiService.js");
const ResumeAnalysis = require("../models/ResumeAnalysis.js");
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

You will receive:
1. The full text of a candidate's resume.
2. (Optional) A job description (JD) they want to apply for.

Your tasks:
1. Always analyze the resume for overall quality, ATS compatibility, content quality, format design, and keyword match.
2. If a job description (JD) is provided:
   - Extract important technical and soft skill keywords from the JD.
   - Compare them with the resume content to find which keywords are missing or weakly represented.
   - Generate a dynamic "missing_keywords" array that lists only the specific keywords from the JD that are not present in the resume.
   - Calculate a realistic "match_score" (0–100) based on keyword coverage, semantic similarity, and relevance to the job description (not just keyword frequency or repetition).
3. If no JD is provided:
   - Infer the candidate’s domain or tech stack from the resume (e.g., MERN, Java Backend, Data Science).
   - Generate a benchmark of expected industry skills for that domain.
   - Evaluate the resume against this benchmark.
   - Set "match_score" based on industry readiness.
   - Generate "missing_keywords" based on commonly expected but missing skills.

Return the final result strictly in this JSON format(Do not include markdown formatting or backticks):

{
  "overall_score": <number between 0-100>,
  "score_breakdown": {
    "ATS_Compatibility": <number between 0-100>,
    "Content_Quality": <number between 0-100>,
    "Format_Design": <number between 0-100>,
    "Keywords_Match": <number between 0-100>
  },
  "jd_match_analysis": {
    "match_score": <number between 0-100>,
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
- Ensure output is always valid JSON. No trailing commas, no comments, no markdown.
- Do not include any text or explanation outside the JSON.
- Be realistic and consistent in all scoring.
- Keep all bullet points concise and clear (8–15 words per point).
- Avoid long sentences or paragraph-style responses.
- Ensure each bullet point fits in a single line (mobile-friendly).
- Limit "top_strengths" and "top_improvements" to exactly 3 points each.
- Limit "actionable_suggestions" to exactly 3 concise points per sub-section(8–15 words per point).
- Each point must be specific, practical, and non-generic.
- jd_match_analysis must always be returned. If JD is not provided, missing_keywords and match_score should be based on inferred domain benchmark instead of JD comparison.
`;

    let resumeText = "";

    if (file.mimetype ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
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

    if (!jobDescription.trim()) {
        aiResponse.market_readiness_analysis = aiResponse.jd_match_analysis;
        delete aiResponse.jd_match_analysis;
    }

    const newAnalysis = await ResumeAnalysis.create({
      userId: req.user.id,
      fileName: req.file.originalname,
      analysisData: aiResponse,
    });

    res.status(200).json({
      success: true,
      message: "Resume analyzed successfully",
      data: newAnalysis
    });
  } catch (error) {
    console.error("Error in uploadResume:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to analyze resume. Please try again.",
    });
  } finally {
    fs.unlink(req.file.path, (err) => {
      if (err) {
        console.error("Error deleting file:", err.message);
      } else {
        console.log("Uploaded file deleted successfully");
      }
    });
  }
};

module.exports = {
  uploadResume,
};