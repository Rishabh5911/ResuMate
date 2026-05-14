# ResuMate: AI-Powered Resume Analyzer

---

## Project Description
ResuMate is a web app built with the MERN stack and TypeScript that helps job seekers improve their resumes for ATS (Applicant Tracking Systems). It uses Google Gemini AI to analyze resumes and provide accurate scores and helpful tips.

---

## Features

**Analysis Dashboard:** Displays a Pie Chart for the total score and Progress Bars for ATS Compatibility, Content Quality, Format Design, and Keywords Match.

**Job Match:** Checks how well the resume matches a job description in percentage.

**Smart Feedback:** Lists Strengths, Areas for Improvement, and Missing Keywords.

**Email System:** Uses Nodemailer for secure OTP signup and password reset.

**Download Report:** Users can download their AI analysis as a report with one click.

---

## How It Works

**Upload:** User uploads a resume in PDF or DOCX format.

**Analysis:** The app extracts text from the resume and sends it to Google Gemini AI for a detailed analysis.

**Review:** User sees a visual dashboard with scores, strengths, and missing keywords.

**Download:** User can save the final report as a PDF.

---

## Tech Stack & Deployment

**MERN Stack:** MongoDB, Express.js, React.js, Node.js

**Core Technologies:** TypeScript, Tailwind CSS, Google Gemini API, Nodemailer

**Hosting:** Vercel (Frontend), Render (Backend)