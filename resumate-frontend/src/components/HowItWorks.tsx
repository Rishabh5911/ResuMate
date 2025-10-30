
import { ArrowUpOnSquareIcon, MagnifyingGlassIcon, CheckCircleIcon } from "@heroicons/react/24/outline";

const steps = [
  {
    icon: <ArrowUpOnSquareIcon className="w-6 h-6  transition-colors duration-300" />,
    title: "Upload Resume",
    desc: "Securely upload your resume in PDF or DOCX. Drag and drop or browse from your device.",
    features: ["PDF & DOCX support", "Secure upload", "Instant processing"]
  },
  {
    icon: <MagnifyingGlassIcon className="w-6 h-6 transition-colors duration-300" />,
    title: "AI Analysis",
    desc: "Our advanced AI engine scans your resume for skills, experience, keywords, and ATS compatibility.",
    features: ["Skill extraction", "Keyword optimization", "ATS scoring"]
  },
  {
    icon: <CheckCircleIcon className="w-6 h-6 transition-colors duration-300" />,
    title: "Get Insights",
    desc: "Receive detailed, actionable recommendations to enhance clarity, impact, and interview potential.",
    features: ["Personalized tips", "Industry insights", "Instant feedback"]
  },
];


const HowItWorks = () => {
  return (
    <section className="py-20  text-white relative overflow-hidden" id="how-it-works">
  <div className="absolute inset-0"></div>
  
  <div className="relative z-10 max-w-6xl mx-auto px-4">
    <div className="text-center mb-16">
      <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
        How It Works
      </h2>
      <p className="text-gray-400 text-lg mt-3 max-w-2xl mx-auto">
        Three simple steps to transform your resume and land more interviews
      </p>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
      <div className="hidden md:block absolute top-1/2 left-1/3 w-1/3 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 -translate-y-1/2 -translate-x-1/2"></div>
      <div className="hidden md:block absolute top-1/2 right-1/3 w-1/3 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 -translate-y-1/2 translate-x-1/2"></div>
      
      {steps.map((step, idx) => (
        <div key={idx} className="group relative cursor-pointer">
  <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition duration-500"></div>
  
  <div className="relative bg-gray-800 p-6 rounded-2xl flex flex-col items-center text-center hover:bg-gray-750 transition-all duration-300 border border-gray-700 group-hover:border-blue-500/50 h-full shadow-xl shadow-black/30 group-hover:shadow-2xl group-hover:shadow-blue-500/20">
    <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center font-bold text-white text-xl shadow-lg shadow-blue-500/40 group-hover:shadow-xl group-hover:shadow-blue-500/60 transition-shadow duration-300">
      {idx + 1}
    </div>
    
    <div className="mt-6 mb-6 p-4 bg-indigo-500  text-white rounded-xl">
      {step.icon}
    </div>
    
    <h3 className="text-xl font-bold mt-4 mb-3 group-hover:text-purple-500 transition-colors duration-300">
      {step.title}
    </h3>
    
    <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
      {step.desc}
    </p>
    
    <div className="mt-6 pt-4 border-t border-gray-700 w-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <span className="text-sm text-indigo-500 font-medium">Step {idx + 1}</span>
    </div>
  </div>
</div>

      ))}
    </div>
  </div>
</section>

  );
};

export default HowItWorks;
