import { FileUp, Cpu, LayoutDashboard } from "lucide-react";

const steps = [
  {
    icon: <FileUp className="w-6 h-6" />,
    title: "Upload Resume & Job Description",
    desc: "Provide your resume and the role you are targeting. We accept standard PDF and DOCX formats.",
  },
  {
    icon: <Cpu className="w-6 h-6" />,
    title: "AI-Powered Analysis",
    desc: "Our system checks your resume against ATS standards to find missing keywords and formatting gaps.",
  },
  {
    icon: <LayoutDashboard className="w-6 h-6" />,
    title: "Review Your Score",
    desc: "Get a detailed breakdown of your resume quality, job match score, and actionable steps to improve your resume.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-24 bg-white" id="how-it-works">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-black tracking-tight">
            How it works
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative">
          <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-[1px] bg-gray-100 z-0"></div>

          {steps.map((step, idx) => (
            <div
              key={idx}
              className="relative z-10 flex flex-col items-center text-center"
            >
              <div className="relative mb-8">
                <div className="w-24 h-24 rounded-full bg-white border border-gray-200 flex items-center justify-center  group-hover:border-black transition-colors duration-300">
                  <div className="text-gray-900">{step.icon}</div>
                </div>

                <span className="absolute -top-1 -right-1 w-8 h-8 bg-black text-white text-[10px] font-bold rounded-full flex items-center justify-center tracking-tighter">
                  0{idx + 1}
                </span>
              </div>

              <h3 className="text-lg font-bold text-black mb-3">
                {step.title}
              </h3>

              <p className="text-gray-500 leading-relaxed text-sm md:text-base max-w-[280px]">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;