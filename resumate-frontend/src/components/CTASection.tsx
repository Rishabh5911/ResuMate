import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";


const CTASection = () => {
  const context = useContext(AuthContext);
  const { user } = context!;
  return (
    <section className="bg-white py-24 border-t border-gray-100 text-center">
      <div className="mx-auto max-w-2xl px-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-black tracking-tight">
          Ready to improve your resume?
        </h2>
        <p className="mt-4 text-gray-500 text-lg">
          Upload your resume and get a detailed analysis of how you compare to
          industry standards.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link
            to={user ? "/dashboard" : "/signup"}
            className="w-full sm:w-auto px-8 py-3 bg-black text-white font-medium rounded-full hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
          >
            {user ? "Go to Dashboard" : "Get Started"} <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="#how-it-works"
            className="w-full sm:w-auto px-8 py-3 text-black font-medium hover:bg-gray-50 rounded-full transition-colors border border-transparent hover:border-gray-200"
          >
            Learn more
          </a>
        </div>
      </div>
    </section>
  );
};

export default CTASection;