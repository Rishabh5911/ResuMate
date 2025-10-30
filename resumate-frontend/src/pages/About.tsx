import {
  SparklesIcon,
  LightBulbIcon,
  CodeBracketIcon,
} from "@heroicons/react/24/outline";

const About = () => {
  return (
    <div
      className="bg-gray-900 text-white min-h-screen px-6 lg:px-16 py-20"
      id="about"
    >
     
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent mt-14">
          About ResuMate
        </h1>
        <p className="mt-8 text-lg sm:text-xl text-gray-400">
          ResuMate is an{" "}  
          <span className="font-bold text-indigo-400">AI-powered</span> resume analyzer that
          helps job seekers{" "}
          <span className="font-bold text-white">optimize their resumes</span>{" "}
          quickly and efficiently. By analyzing resumes within minutes, ResuMate
          provides{" "}
          <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
            actionable insights
          </span>{" "}
          and suggestions to help you{" "}
          <span className="font-bold text-white">stand out to recruiters</span>.
        </p>
      </div>

      <div className="mt-20 grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        



        <div className="group relative cursor-pointer">
 
  <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition duration-500"></div>


  <div className="relative z-10 p-8 rounded-2xl bg-gray-800 shadow-xl shadow-black/30 
    hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 
    border border-gray-700 group-hover:border-blue-500/50 overflow-hidden">

  
    <div className="absolute inset-0 from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

    <div className="relative z-10">
      <div className="flex items-center mb-6">
        <div className="p-3 rounded-xl bg-indigo-500 transition-colors duration-300">
          <SparklesIcon className="h-8 w-8 text-white transition-colors duration-300" />
        </div>
        <h2 className="text-2xl font-bold text-white ml-4 group-hover:text-purple-500 transition-colors duration-300">
          Why ResuMate?
        </h2>
      </div>

      <ul className="space-y-4">
        <li className="flex items-start group/item">
          <div className="flex-shrink-0 w-2 h-2 bg-indigo-500 rounded-full mt-2 mr-4 group-hover/item:scale-125 transition-transform duration-300"></div>
          <p className="text-gray-300 group-hover/item:text-white transition-colors duration-300 leading-relaxed">
             Instantly highlights your key achievements with AI precision
          </p>
        </li>

        <li className="flex items-start group/item">
          <div className="flex-shrink-0 w-2 h-2 bg-indigo-500 rounded-full mt-2 mr-4 group-hover/item:scale-125 transition-transform duration-300"></div>
          <p className="text-gray-300 group-hover/item:text-white transition-colors duration-300 leading-relaxed">
            Spots gaps and inconsistencies in your resume structure
          </p>
        </li>

        <li className="flex items-start group/item">
          <div className="flex-shrink-0 w-2 h-2 bg-indigo-500 rounded-full mt-2 mr-4 group-hover/item:scale-125 transition-transform duration-300"></div>
          <p className="text-gray-300 group-hover/item:text-white transition-colors duration-300 leading-relaxed">
           Delivers targeted suggestions to boost clarity and impact
          </p>
        </li>
      </ul>
    </div>
  </div>
</div>



        <div className="group relative cursor-pointer">

  <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition duration-500"></div>

 
  <div className="relative z-10 p-8 rounded-2xl bg-gray-800 shadow-xl shadow-black/30 
    hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 
    border border-gray-700 group-hover:border-blue-500/50 overflow-hidden">

    <div className="absolute inset-0 from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

    <div className="relative z-10">
      <div className="flex items-center mb-6">
        <div className="p-3 rounded-xl bg-indigo-500 transition-colors duration-300">
          <LightBulbIcon className="h-8 w-8 text-white transition-colors duration-300" />
        </div>
        <h2 className="text-2xl font-bold text-white ml-4 group-hover:text-purple-500 transition-colors duration-300">
         How It Works
        </h2>
      </div>

      <ul className="space-y-4">
        <li className="flex items-start group/item">
          <div className="flex-shrink-0 w-2 h-2 bg-indigo-500 rounded-full mt-2 mr-4 group-hover/item:scale-125 transition-transform duration-300"></div>
          <p className="text-gray-300 group-hover/item:text-white transition-colors duration-300 leading-relaxed">
           Upload your resume through an intuitive interface
          </p>
        </li>

        <li className="flex items-start group/item">
          <div className="flex-shrink-0 w-2 h-2 bg-indigo-500 rounded-full mt-2 mr-4 group-hover/item:scale-125 transition-transform duration-300"></div>
          <p className="text-gray-300 group-hover/item:text-white transition-colors duration-300 leading-relaxed">
            Get a rapid, in-depth analysis with actionable feedback
          </p>
        </li>

        <li className="flex items-start group/item">
          <div className="flex-shrink-0 w-2 h-2 bg-indigo-500 rounded-full mt-2 mr-4 group-hover/item:scale-125 transition-transform duration-300"></div>
          <p className="text-gray-300 group-hover/item:text-white transition-colors duration-300 leading-relaxed">
            Save time and increase your chances of landing interviews
          </p>
        </li>
      </ul>
    </div>
  </div>
</div>

<div className="group relative cursor-pointer">
  
  <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition duration-500"></div>

  
  <div className="relative z-10 p-8 rounded-2xl bg-gray-800 shadow-xl shadow-black/30 
    hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 
    border border-gray-700 group-hover:border-blue-500/50 overflow-hidden">

    
    <div className="absolute inset-0 from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

    <div className="relative z-10">
      <div className="flex items-center mb-6">
        <div className="p-3 rounded-xl bg-indigo-500 transition-colors duration-300">
          <CodeBracketIcon className="h-8 w-8 text-white transition-colors duration-300" />
        </div>
        <h2 className="text-2xl font-bold text-white ml-4 group-hover:text-purple-500 transition-colors duration-300">
          Built With
        </h2>
      </div>

      <ul className="space-y-4">
        <li className="flex items-start group/item">
          <div className="flex-shrink-0 w-2 h-2 bg-indigo-500 rounded-full mt-2 mr-4 group-hover/item:scale-125 transition-transform duration-300"></div>
          <p className="text-gray-300 group-hover/item:text-white transition-colors duration-300 leading-relaxed">
            <span className="font-semibold">Frontend :</span> TypeScript, React, Tailwind CSS
          </p>
        </li>

        <li className="flex items-start group/item">
          <div className="flex-shrink-0 w-2 h-2 bg-indigo-500 rounded-full mt-2 mr-4 group-hover/item:scale-125 transition-transform duration-300"></div>
          <p className="text-gray-300 group-hover/item:text-white transition-colors duration-300 leading-relaxed">
            <span className="font-semibold">Backend :</span> Node.js, Express.js
          </p>
        </li>

        <li className="flex items-start group/item">
          <div className="flex-shrink-0 w-2 h-2 bg-indigo-500 rounded-full mt-2 mr-4 group-hover/item:scale-125 transition-transform duration-300"></div>
          <p className="text-gray-300 group-hover/item:text-white transition-colors duration-300 leading-relaxed">
            <span className="font-semibold">UI/UX :</span> Responsive design, interactive components, smooth animations
          </p>
        </li>
      </ul>
    </div>
  </div>
</div>

      </div>

    
      <p className="mt-16 text-lg sm:text-xl text-gray-400 text-center">
        ResuMate is an{" "}
        <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
          AI-powered tool
        </span>{" "}
        built with <span className="font-bold text-white">TypeScript</span>,{" "}
        <span className="font-bold text-white">React</span>,{" "}
        <span className="font-bold text-white">Node.js</span>,{" "}
        <span className="font-bold text-white">Express</span>, and{" "}
        <span className="font-bold text-white">Tailwind CSS</span>. It{" "}
        <span className="font-bold text-white">parses</span> and{" "}
        <span className="font-bold text-white">analyzes resumes</span> using
        natural language processing powered by{" "}
        <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
          OpenAI’s
        </span>{" "}
        <span className="font-bold text-white">Large Language Models</span>. The
        tool provides{" "}
        <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
          actionable and personalized insights
        </span>{" "}
        to help users{" "}
        <span className="font-bold text-white">
          optimize their resumes effectively
        </span>
        . This project showcases my{" "}
        <span className="font-bold text-white">
          full-stack development skills
        </span>{" "}
        and ability to leverage advanced AI technology to create practical,
        user-friendly web applications.
      </p>
    </div>
  );
};

export default About;
