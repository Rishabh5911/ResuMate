import { Sparkles, Lightbulb, CodeXml } from "lucide-react";

const About = () => {
  return (
    <div
      className="bg-white text-black min-h-screen px-6 lg:px-16 py-24"
      id="about"
    >
      <div className="text-center max-w-3xl mx-auto mb-20">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-black mt-10">
          About ResuMate
        </h1>
        <p className="mt-6 text-lg text-gray-600 leading-relaxed">
          ResuMate was built to help you see your resume the way a recruiter
          does. Many resumes never reach a human because of formatting errors or
          missing keywords. I created this project to give you a clear look at
          where your experience stands out and exactly where it needs more
          detail.
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-3 max-w-6xl mx-auto">
        <div className="p-8 rounded-2xl bg-gray-50 border border-gray-100 flex flex-col hover:border-black transition-colors duration-300 cursor-pointer">
          <div className="flex items-center mb-6">
            <div className="p-2 rounded-lg bg-black text-white">
              <Sparkles className="h-6 w-6" />
            </div>
            <h2 className="text-xl font-bold ml-4">Why ResuMate?</h2>
          </div>
          <ul className="space-y-4 text-gray-600 text-sm md:text-base">
            <li className="flex items-start">
              <span className="w-1.5 h-1.5 bg-black rounded-full mt-2 mr-3 flex-shrink-0"></span>
              It finds your most important achievements and highlights them.
            </li>
            <li className="flex items-start">
              <span className="w-1.5 h-1.5 bg-black rounded-full mt-2 mr-3 flex-shrink-0"></span>
              It points out exactly which parts of your resume are hard to read.
            </li>
            <li className="flex items-start">
              <span className="w-1.5 h-1.5 bg-black rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Direct suggestions to help you get shortlisted
            </li>
          </ul>
        </div>

        <div className="p-8 rounded-2xl bg-gray-50 border border-gray-100 flex flex-col hover:border-black transition-colors duration-300 cursor-pointer">
          <div className="flex items-center mb-6">
            <div className="p-2 rounded-lg bg-black text-white">
              <Lightbulb className="h-6 w-6" />
            </div>
            <h2 className="text-xl font-bold ml-4">How It Works</h2>
          </div>
          <ul className="space-y-4 text-gray-600 text-sm md:text-base">
            <li className="flex items-start">
              <span className="w-1.5 h-1.5 bg-black rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Upload your resume and the job description you want.
            </li>
            <li className="flex items-start">
              <span className="w-1.5 h-1.5 bg-black rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Get a score based on how well your skills match the role.
            </li>
            <li className="flex items-start">
              <span className="w-1.5 h-1.5 bg-black rounded-full mt-2 mr-3 flex-shrink-0"></span>
              See missing keywords to add before you apply.
            </li>
          </ul>
        </div>

        <div className="p-8 rounded-2xl bg-gray-50 border border-gray-100 flex flex-col hover:border-black transition-colors duration-300 cursor-pointer">
          <div className="flex items-center mb-6">
            <div className="p-2 rounded-lg bg-black text-white">
              <CodeXml className="h-6 w-6" />
            </div>
            <h2 className="text-xl font-bold ml-4">The Tech</h2>
          </div>
          <ul className="space-y-4 text-gray-600 text-sm md:text-base">
            <li className="flex items-start">
              <span className="w-1.5 h-1.5 bg-black rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Built with TypeScript, React, and Tailwind CSS.
            </li>
            <li className="flex items-start">
              <span className="w-1.5 h-1.5 bg-black rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Powered by Node.js and Express.js backend.
            </li>
            <li className="flex items-start">
              <span className="w-1.5 h-1.5 bg-black rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Leverages advanced language models for analysis.
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-20 max-w-4xl mx-auto border-t border-gray-100 pt-16">
        <p className="text-gray-600 leading-relaxed text-center">
          I built this project to show how{" "}
          <span className="text-black font-semibold">
            modern web development
          </span>{" "}
          and
          <span className="text-black font-semibold"> AI</span> can work
          together to solve real-world problems. By using the{" "}
          <span className="text-black font-semibold">MERN stack</span> and
          <span className="text-black font-semibold"> Gemini</span>, ResuMate
          provides a simple and clean way for candidates to optimize their
          resumes before they apply.
        </p>
      </div>
    </div>
  );
};

export default About;