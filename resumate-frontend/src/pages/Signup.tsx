import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
import Loader from "../components/Loader";
import logo from "../assets/logo.png";
import resumeIllustration from "../assets/resume-illustration.png";
import baseUrl from "../utils/baseUrl";



interface AuthResponse {
  success: boolean;
  message: string;
}

interface SignupData {
  fullName: string;
  email: string;
  password: string;
}

const Signup = () => {
  const [formData, setFormData] = useState<SignupData>({
    fullName: "",
    email: "",
    password: "",
  });

  const [fieldErrors, setFieldErrors] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFieldErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors = { fullName: "", email: "", password: "" };
    let hasError = false;

    if (!formData.fullName.trim()) {
      errors.fullName = "Full name is required";
      hasError = true;
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
      hasError = true;
    } else {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(formData.email)) {
        errors.email = "Please enter a valid email address";
        hasError = true;
      }
    }

    if (!formData.password.trim()) {
      errors.password = "Password is required";
      hasError = true;
    } else if (formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
      hasError = true;
    }

    setFieldErrors(errors);
    if (hasError) return;
    setLoading(true);
    try {
      await axios.post<AuthResponse>(`${baseUrl}/api/auth/signup`, formData);
      setFormData({ fullName: "", email: "", password: "" });
      toast.success("OTP sent to your email");

      localStorage.setItem("email", formData.email);
      navigate("/verify-otp", { state: { email: formData.email } });
    } catch (err: any) {
      console.error("Signup error:", err.message);
      toast.error(err.response.data.message || "Failed to signup. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-white text-black">
      <div className="w-full lg:w-[45%] xl:w-[40%] flex items-center justify-center p-8 border-r-1 border-zinc-200">
        <div className="max-w-md w-full">
          <Link to="/">
            <img
              src={logo}
              alt="Logo"
              className="w-32 h-auto object-contain mb-4"
              draggable="false"
            />
          </Link>

          <h2 className="text-[28px] font-semibold tracking-[-0.03em] mb-1.5 leading-tight">
            Create an account
          </h2>
          <p className="text-sm text-slate-400 sm:text-base mb-4">
            Start analyzing your resume and land your dream job.
          </p>

          <form
            className="space-y-5"
            onSubmit={handleSignup}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => e.preventDefault()}
          >
            <div className="relative">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">
                Full Name<span className="text-red-500 absolute top-0">*</span>
              </label>

              <input
                type="text"
                name="fullName"
                className="w-full bg-gray-100 border border-gray-100 rounded-xl px-4 py-3 text-black focus:outline-none focus:border-black transition-all placeholder:text-gray-400"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
              />
              {fieldErrors.fullName && (
                <span className="absolute left-1 top-16 translate-y-2 text-red-500 text-sm">
                  {fieldErrors.fullName}
                </span>
              )}
            </div>

            <div className="relative">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">
                Email Address{" "}
                <span className="absolute top-0 text-red-500">*</span>
              </label>

              <input
                type="email"
                name="email"
                className="w-full bg-gray-100 border border-gray-100 rounded-xl px-4 py-3 text-black focus:outline-none focus:border-black transition-all placeholder:text-gray-400"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
              {fieldErrors.email && (
                <span className="absolute left-1 top-16 translate-y-2  text-red-500 text-sm">
                  {fieldErrors.email}
                </span>
              )}
            </div>

            <div className="relative">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">
                Password<span className="absolute top-0 text-red-500">*</span>
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="w-full bg-gray-100 border border-gray-100 rounded-xl px-4 py-3 text-black focus:outline-none focus:border-black transition-all placeholder:text-gray-300 pr-12"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                />
                {fieldErrors.password && (
                  <span className="absolute left-1 top-12  text-red-500 text-sm">
                    {fieldErrors.password}
                  </span>
                )}

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-gray-400 transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white text-[15px] font-semibold rounded-xl px-4 py-3.5 mt-7 transition-all hover:bg-gray-900 active:scale-[0.98] cursor-pointer shadow-sm flex justify-center items-center"
            >
              {loading ? <Loader text="Sending OTP..." /> : "Sign Up"}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-3">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-black font-semibold hover:underline underline-offset-4 decoration-1 transition-all cursor-pointer"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>

      <div className="hidden lg:block lg:flex-1 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <img
            src={resumeIllustration}
            alt="AI Resume Analysis Visualization"
            className="max-w-full max-h-[80%] w-auto h-auto object-contain drop-shadow-2xl"
            draggable="false"
          />
        </div>
        <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-zinc-200 rounded-full blur-3xl opacity-50" />
    <div className="absolute bottom-[-10%] left-[-10%] w-64 h-64 bg-zinc-200 rounded-full blur-3xl opacity-50" />
        
      </div>
    </div>
  );
};

export default Signup;
