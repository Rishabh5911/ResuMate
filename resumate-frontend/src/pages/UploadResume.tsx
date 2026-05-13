import axios from "axios";
import Loader from "../components/Loader";
import { Upload, FileText, Check, CircleAlert} from "lucide-react";
import { useState} from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import baseUrl from "../utils/baseUrl";



const UploadResume = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [jobDescription, setJobDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  

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
    try{
      const response = await axios.post(`${baseUrl}/api/resume/analyze-resume`,formData,{
          withCredentials: true, 
        });
        
        navigate(`/dashboard/analysis/${response.data.data._id}`);  
    }catch(error:any){
      console.error("Failed to Upload Resume ",error.message);
      toast.error(error.response.data.message || "Upload failed");
    }finally{
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen py-14">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-black tracking-tight">
            Upload Your Resume
          </h1>
          <p className="text-gray-500 text-lg">
            Get instant AI-powered feedback to improve your resume
          </p>
        </div>

        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`relative bg-gray-50 rounded-2xl p-12 border-2 border-dashed transition-all duration-300 ${
            isDragging
              ? "border-black bg-gray-100 scale-[1.01]"
              : file
              ? "border-gray-200 bg-white"
              : "border-gray-200 hover:border-gray-400"
          }`}
        >
          {!file ? (
            <div className="text-center">
              <div className="mb-6 flex justify-center">
                <div className="p-4 bg-black rounded-full">
                  <Upload className="w-8 h-8 text-white" />
                </div>
              </div>

             

              <p className="text-gray-600 mb-6 font-medium">
                Drop your resume here or choose a file.
              </p>

              <label className="inline-block">
                <input
                  type="file"
                  className="hidden"
                  accept=".pdf,.docx"
                  onChange={handleFileSelect}
                />
                <span className="px-8 py-3 rounded-full bg-black text-white font-medium transition-colors cursor-pointer inline-block hover:bg-gray-800">
                  Upload Your Resume
                </span>
              </label>

              <p className="text-xs text-gray-400 mt-6 uppercase tracking-widest font-semibold">
                PDF & DOCX only • Max 3MB
              </p>
            </div>
          ) : (
            <div className="text-center">
              <div className="mb-6 flex justify-center">
                <div className="p-3 bg-green-50 rounded-full border border-green-100">
                  <Check className="w-6 h-6 text-green-600" />
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-4 mb-8 inline-flex items-center gap-4 shadow-sm">
                <FileText className="w-8 h-8 text-gray-400" />
                <div className="text-left">
                  <p className="text-black font-semibold text-sm">{file.name}</p>
                  <p className="text-gray-500 text-xs">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>

              <div className="mt-2 text-left max-w-2xl mx-auto">
                <label className="text-gray-700 font-medium mb-2 block text-sm">
                  Paste Job Description (Optional)
                </label>
                <textarea
                  placeholder="Paste the job description here..."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  style={{ height: "190px" }}
                  className="w-full h-40 rounded-xl p-4 bg-white text-black text-sm border border-gray-200 outline-none resize-none focus:border-black transition-colors"
                />
              </div>

              <div className="flex gap-4 justify-center mt-8">
                <button
                  onClick={() => setFile(null)}
                  className="px-6 py-2 text-gray-600 font-medium rounded-full border border-gray-200 hover:bg-gray-50 transition-colors flex items-center gap-2 cursor-pointer"
                >
                  Remove
                </button>

                <button
                  className="px-10 py-2 bg-black text-white font-medium rounded-full transition-colors hover:bg-gray-800 cursor-pointer"
                  onClick={handleAnalyzeClick}
                >
                  {loading ? <Loader text="Analyzing..." color="text-white"/> : "Start Analysis"}
                </button>
              </div>
            </div>
          )}
        </div>

<div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
        { 
          title: "System Check", 
          desc: "Check if your resume passes standard screening systems.", 
          icon: <Check className="w-5 h-5" /> 
        },
        { 
          title: "Detailed Review", 
          desc: "Get feedback on your resume structure and content.", 
          icon: <FileText className="w-5 h-5" /> 
        },
        { 
          title: "Direct Tips", 
          desc: "Simple steps you can take to make your resume better.", 
          icon: <CircleAlert className="w-5 h-5" /> 
        }
      ].map((item, i) => (
        <div key={i} className="flex flex-col items-start p-2">
          <div className="p-2 bg-gray-100 rounded-lg mb-4 text-black">
            {item.icon}
          </div>
          <h4 className="text-black font-bold mb-1">{item.title}</h4>
          <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
        </div>
      ))}
    </div>
      </div>
    </div>
  );
}

export default UploadResume;