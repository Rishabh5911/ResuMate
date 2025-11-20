ResuMate – AI-Powered Resume Analyzer

<img width="1887" height="874" alt="ResuMate" src="https://github.com/user-attachments/assets/8cb18b0f-2c04-475e-85c8-d3258409791a" />

ResuMate is an AI-driven tool designed for analyzing resumes. Users can upload their resume in PDF or DOCX format and optionally include a Job Description (JD). The system extracts text from the uploaded file and analyzes it using OpenAI. It then generates a comprehensive report that includes scores, highlights strengths and weaknesses, and provides actionable recommendations for improvement.

Features
- 📤 Upload PDF or DOCX resumes  
- 🧠 AI analysis powered by OpenAI GPT-4o-mini  
- 🔍 Optional Job Description (JD) matching with missing keyword detection  
- 📊 Structured evaluation that includes:  
  - Overall Score  
  - ATS Compatibility  
  - Content Quality  
  - Formatting and Design  
  - Keyword Match  
- 🎯 Clear identification of strengths and weaknesses, along with suggestions for improvement  
- 📥 Downloadable analysis report  
- 🌙 Default dark theme  
- Frontend deployed on Vercel  
- Backend deployed on Render  

Tech Stack

Frontend
- React.js with TypeScript
- Tailwind CSS for styling and dark theme
- Deployment on Vercel

Backend
- Node.js with Express
- File upload handling with Multer
- Text extraction libraries:
  - pdfjs-lib for PDF parsing
  - Mammoth for DOCX parsing
- OpenAI API integration using GPT-4o-mini model
- Hosted on Render

How It Works
- Upload your resume in PDF or DOCX format.
- (Optional) Paste a Job Description to match against your resume.
- The backend extracts text using pdfjs-lib or Mammoth and sends it along with the JD to the OpenAI API for AI-powered analysis.
- Receive a detailed report with overall score, ATS compatibility, keyword match, formatting and content quality assessments.
- Review highlighted strengths, weaknesses, and actionable recommendations.
- Download the analysis report for your records.
