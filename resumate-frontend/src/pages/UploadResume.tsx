import Loader from "@/components/Loader";
import {
  ArrowUpOnSquareIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";

import { useState} from "react";
import toast from "react-hot-toast";

interface UploadResumeProps {
  onAnalyze: (formData: FormData) => Promise<void>;
}

export default function UploadResume({ onAnalyze }: UploadResumeProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [jobDescription, setJobDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];
    if (
      droppedFile &&
      (droppedFile.type === "application/pdf" ||
        droppedFile.type === "application/msword" ||
        droppedFile.type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document")
    ) {
      setFile(droppedFile);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(selectedFile.type)) {
      toast.error("Only PDF and DOCX files are allowed");
      e.target.value = "";
      setFile(null);
      return;
    }

    if (selectedFile.size > 3 * 1024 * 1024) {
      toast.error("File size must be 3MB or less");
      e.target.value = "";
      setFile(null);
      return;
    }

    setFile(selectedFile);
  };

  const handleAnalyzeClick = async () => {
    if (!file) {
      toast.error("Please upload a resume file before analyzing.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    if (jobDescription.trim()) {
      formData.append("jobDescription", jobDescription);
    }

    setLoading(true);
    await onAnalyze(formData);
  };

  return (
    <div className="min-h-screen bg-gray-900 py-28 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 text-white">
            Upload Your Resume
          </h1>
          <p className="text-gray-400 text-lg">
            Get instant AI-powered feedback to improve your resume
          </p>
        </div>

        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`relative bg-gray-800 rounded-2xl p-12 border-3 border-dashed shadow-xl  transition-all duration-300 ${
            isDragging
              ? "border-blue-500 bg-gray-800/80 scale-[1.02]"
              : file
              ? "border-gray-900"
              : "border-gray-700 hover:border-gray-600"
          } shadow-2xl shadow-black/40`}
        >
          {!file ? (
            <div className="text-center">
              <div className="mb-6 flex justify-center">
                <div className="p-4 bg-indigo-500 rounded-full">
                  <ArrowUpOnSquareIcon className="w-12 h-12 text-white" />
                </div>
              </div>

              <h3 className="text-2xl font-bold text-white mb-3">
                Drop your resume here
              </h3>

              <p className="text-gray-400 mb-6">
                or click to browse your files
              </p>

              <label className="inline-block">
                <input
                  type="file"
                  className="hidden"
                  accept=".pdf,.docx"
                  onChange={handleFileSelect}
                />
                <span className="px-8 py-3.5 rounded-md bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold   transition-all duration-300 shadow-lg  cursor-pointer inline-block hover:scale-105">
                  Choose File
                </span>
              </label>

              <p className="text-sm text-gray-500 mt-6">
                Supported formats: PDF or DOCX (Max size: 3 MB)
              </p>
            </div>
          ) : (
            <div className="text-center">
              <div className="mb-6 flex justify-center">
                <div className="p-4 bg-green-500/10 rounded-full">
                  <CheckCircleIcon className="w-8 h-8 text-green-400" />
                </div>
              </div>

              <div className="bg-gray-900/50 rounded-lg p-3 mb-5 inline-flex items-center gap-3">
                <DocumentTextIcon className="w-6 h-6 text-blue-400" />
                <div className="text-left">
                  <p className="text-white font-medium text-sm">{file.name}</p>
                  <p className="text-gray-400 text-xs">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>

              <div className="mt-6 text-left">
                <label className="text-gray-300 font-semibold mb-2 block">
                  Paste Job Description (Optional)
                </label>
                <textarea
                  placeholder="Paste the job description here..."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  style={{ height: "190px" }}
                  className="w-full rounded-xl p-3 bg-gray-900 text-white text-sm border border-gray-700 
                             outline-none resize-none overflow-y-auto"
                />
              </div>

              <div className="flex gap-4 justify-center mt-3">
                <button
                  onClick={() => setFile(null)}
                  className="px-6 py-2.5 text-white font-medium rounded-lg border border-gray-700  hover:bg-gray-800 transition-all duration-300 hover:scale-105 cursor-pointer"
                >
                  Remove
                </button>

                <button
                  className="px-8 py-2.5 bg-indigo-500 text-white font-semibold rounded-lg  transition-all duration-300 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105 cursor-pointer"
                  onClick={handleAnalyzeClick}
                >
                  {loading ? <Loader /> : "Analyze Resume"}
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800 rounded-xl p-6 border border-transparent hover:border-gray-950 transition-all duration-300 hover:shadow-indigo-900 shadow-xl cursor-pointer hover:scale-105">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-indigo-500 rounded-lg">
                <CheckCircleIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="text-white font-semibold mb-2">
                  ATS Compatible
                </h4>
                <p className="text-gray-400 text-sm">
                  Check if your resume passes applicant tracking systems
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border  border-transparent hover:border-gray-950 transition-all duration-300 cursor-pointer hover:shadow-indigo-900 shadow-xl hover:scale-105">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-indigo-500 rounded-lg">
                <DocumentTextIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="text-white font-semibold mb-2">
                  Detailed Insights
                </h4>
                <p className="text-gray-400 text-sm">
                  Get comprehensive analysis on structure and content
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-transparent hover:border-gray-950 transition-all duration-300 cursor-pointer hover:shadow-indigo-900 shadow-xl hover:scale-105">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-indigo-500 rounded-lg">
                <ExclamationCircleIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="text-white font-semibold mb-2">
                  Actionable Tips
                </h4>
                <p className="text-gray-400 text-sm">
                  Receive specific recommendations to improve your resume
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
