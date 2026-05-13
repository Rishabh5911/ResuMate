import { MoveLeft } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import logo from "../assets/logo.png";
import { useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import { toast } from "react-hot-toast";
import baseUrl from "../utils/baseUrl";



const ResetPassword = () => {
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    let validationErrors = { newPassword: "", confirmPassword: "" };
    let hasError = false;

    if (!formData.newPassword.trim()) {
      validationErrors.newPassword = "New password is required";
      hasError = true;
    }

    if (!formData.confirmPassword.trim()) {
      validationErrors.confirmPassword = "Confirm password is required";
      hasError = true;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      hasError = true;
      validationErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(validationErrors);
    if (hasError) return;
    setLoading(true);

    try {
      await axios.post(`${baseUrl}/api/auth/reset-password`, {
        newPassword: formData.newPassword,
        token,
      });

      toast.success("Password reset successfully");
      navigate("/login");
    } catch (err: any) {
      console.error("Reset password error : ", err.message);
      if (err.response?.data?.message) {
        const errorMsg = err.response.data.message;
        setErrors({
          newPassword: errorMsg,
          confirmPassword: errorMsg,
        });
      } else {
        toast.error("Password reset failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
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

        <h2 className="text-[24px] font-bold text-center tracking-[-0.02em] mb-4">
          Reset Your Password
        </h2>

        <form className="space-y-6" onSubmit={handleResetPassword}>
          <div className="relative">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">
              New Password
              <span className="text-red-500 absolute top-0">*</span>
            </label>
            <input
              type="password"
              className="w-full bg-gray-100 border border-gray-100 rounded-xl px-4 py-3 text-black focus:outline-none focus:border-black transition-all placeholder:text-gray-400"
              placeholder="••••••••"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              required
            />
            {errors.newPassword && (
              <span className="absolute left-1 top-16 translate-y-2 text-red-500 text-sm">
                {errors.newPassword}
              </span>
            )}
          </div>

          <div className="relative">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">
              Confirm Password
              <span className="text-red-500 absolute top-0">*</span>
            </label>
            <input
              type="password"
              className="w-full bg-gray-100 border border-gray-100 rounded-xl px-4 py-3 text-black focus:outline-none focus:border-black transition-all placeholder:text-gray-400"
              placeholder="••••••••"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            {errors.confirmPassword && (
              <span className="absolute left-1 top-16 translate-y-2 text-red-500 text-sm">
                {errors.confirmPassword}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white font-bold rounded-xl px-4 py-3.5 transition-all hover:bg-gray-900 active:scale-[0.98] cursor-pointer shadow-sm"
          >
            {loading ? <Loader text="Resetting..." /> : "Reset Password"}
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

export default ResetPassword;
