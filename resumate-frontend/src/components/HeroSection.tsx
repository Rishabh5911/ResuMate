import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const HeroSection = () => {
  const context = useContext(AuthContext);
  const { user } = context!;
  return (
    <div className="bg-white border-b border-slate-100">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:py-32">
        <div className="max-w-3xl">
          <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 sm:text-6xl">
            Analyze your resume with <br />
            <span className="text-indigo-600">the power of AI.</span>
          </h1>

          <p className="mt-6 text-lg leading-8 text-slate-600 max-w-2xl">
            Get instant feedback on ATS compatibility and content quality.
            ResuMate benchmarks your skills against industry standards or
            specific job descriptions to help you stand out.
          </p>

          <div className="mt-10 flex items-center gap-x-6">
            <Link
              to={user ? "/dashboard" : "/signup"}
              className="rounded-md bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 transition-all"
            >
              Start Analysis
            </Link>

            <a
              href="#features"
              className="text-sm font-semibold leading-6 text-slate-600 hover:text-slate-900 flex items-center group"
            >
              View Capabilities
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;