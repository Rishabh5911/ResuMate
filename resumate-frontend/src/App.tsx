import {Routes, Route } from "react-router-dom";
import Home from '@/pages/Home'
import UploadResume from "@/pages/UploadResume";
import About from "@/pages/About";
import Analysis from "@/pages/Analysis";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer"
import NotFoundPage from "@/pages/NotFoundPage"
import { useState,useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
const baseUrl = import.meta.env.VITE_BACKEND_URL;

interface ApiResponse {
  success: boolean;
  message: string;
  data: string; 
}


export interface ResumeAnalysis {
  overall_score: number;
  score_breakdown: {
    ATS_Compatibility: number;
    Content_Quality: number;
    Format_Design: number;
    Keywords_Match: number;
  };
  jd_match_analysis?: {
    match_score: number | null;
    missing_keywords: string[];
  };
  top_strengths: string[];
  top_improvements: string[];
  actionable_suggestions: {
    Keyword_Optimization: string;
    Achievements: string;
    Section_Order: string;
  };
  resume_guidance: string;
}


function App() {
  const [analysisData, setAnalysisData] = useState<ResumeAnalysis | null>(null);
   const navigate = useNavigate();

 const handleAnalyzeResume = async (formData: FormData) => {
    try {
      const res = await axios.post<ApiResponse>(`${baseUrl}/api/resume/analyze-resume`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      

      if (res.data.success) {
        const parsedData: ResumeAnalysis = JSON.parse(res.data.data);
        setAnalysisData(parsedData);
        localStorage.setItem("analysisData", JSON.stringify(parsedData));
        toast.success("Resume analyzed successfully!");
        navigate("/analysis");
      } else {
        toast.error("Failed to analyze resume. Please try again");
      }
    } catch (error) {
      toast.error("Too many requests. Please try again later");
      console.error("Error analyzing resume:", error);
    }
  };

  useEffect(() => {
  if (!analysisData) {
    const stored = localStorage.getItem("analysisData");
    if (stored) {
      setAnalysisData(JSON.parse(stored));
    }
  }
}, []);


  
  return (
   <div className="bg-gray-900">
     
      
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload-resume" element={<UploadResume onAnalyze={handleAnalyzeResume} />} />
        <Route path="/analysis" element={<Analysis analysisData={analysisData} />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <Footer/>
      
       <Toaster position="top-center" reverseOrder={false} />
   </div>
  )
}

export default App
