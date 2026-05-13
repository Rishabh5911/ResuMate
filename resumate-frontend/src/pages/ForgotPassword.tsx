import { MoveLeft } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import { toast } from "react-hot-toast";
import baseUrl from "../utils/baseUrl";



const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({ email: "" });
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    let validationErrors = { email: "" };
    let hasError = false;

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      validationErrors.email = "Please enter a valid email address";
      hasError = true;
    }

    setErrors(validationErrors);
    if (hasError) return;
    setLoading(true);

    try {
      await axios.post(`${baseUrl}/api/auth/forgot-password`, {
        email,
      });

      toast.success("Reset link sent to your email");

      setEmail("");
    } catch (err: any) {
      console.error("Forgot Password error:", err.message);
      if (err.response?.data?.message) {
        const errorMsg = err.response.data.message;
        setErrors({
          email: errorMsg,
        });
      } else {
        toast.error("Failed to forgot password. Please try again");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9FAFB] text-[#1A1A1A]">
      <div className="max-w-[440px] w-full bg-white border border-gray-200/60 rounded-[24px] p-8 shadow-[0_1px_3px_rgba(0,0,0,0.02),0_20px_40px_rgba(0,0,0,0.03)]">
        <img
          src={logo}
          alt="ResuMate Logo"
          className="w-32 h-auto object-contain mx-auto block mb-4"
          draggable="false"
        />

        <h2 className="text-[24px] font-bold text-center tracking-[-0.02em] mb-2">
          Forgot Password?
        </h2>
        <p className="text-gray-500 text-center mb-8 text-sm sm:text-base leading-relaxed">
          Enter your email address and we'll send you instructions to reset your
          password.
        </p>

        <form className="space-y-6" onSubmit={handleForgotPassword}>
          <div className="relative">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">
              Email address
              <span className="text-red-500 absolute top-0">*</span>
            </label>
            <input
              type="email"
              className="w-full bg-gray-100 border border-gray-100 rounded-xl px-4 py-3 text-black focus:outline-none focus:border-black transition-all placeholder:text-gray-400"
              placeholder="Enter your email"
              name="email"
              value={email}
              onChange={handleChange}
              required
            />
            {errors.email && (
              <span className="absolute left-1 top-16 translate-y-2 text-red-500 text-sm">
                {errors.email}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white font-bold rounded-xl px-4 py-3.5 transition-all hover:bg-gray-900  cursor-pointer shadow-sm"
          >
            {loading ? <Loader text="Sending..." /> : "Send Reset Link"}
          </button>
        </form>

        <div className="text-center mt-6">
          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-400 hover:text-black transition-all group"
          >
            <MoveLeft
              size={16}
              className="transition-transform group-hover:-translate-x-1"
            />
            Back to Login
          </Link>
        </div>

        <Link
          to="/"
          className="absolute top-4 right-4  inline-flex items-center gap-2 text-sm font-semibold text-gray-400 hover:text-black transition-all group"
        >
          <MoveLeft
            className="transition-transform group-hover:-translate-x-1"
            size={16}
          />
          <span className="hidden sm:inline">Back to Home</span>
          <span className="sm:hidden font-medium">Home</span>
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;