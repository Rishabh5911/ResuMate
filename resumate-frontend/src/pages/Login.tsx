import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Eye, EyeOff, MoveLeft } from "lucide-react";
import Loader from "../components/Loader";
import toast from "react-hot-toast";
import logo from "../assets/logo.png";
import { AuthContext } from "../context/AuthContext";
import baseUrl from "../utils/baseUrl";



interface AuthResponse {
  success: boolean;
  message: string;
}

interface LoginData {
  email: string;
  password: string;
}

const Login = () => {
  const [formData, setFormData] = useState<LoginData>({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const context = useContext(AuthContext);
  const { checkAuthStatus } = context!;

  const navigate = useNavigate();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = { email: "", password: "" };
    let hasError = false;

    if (!formData.email.trim()) {
      validationErrors.email = "Email is required";
      hasError = true;
    } else {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(formData.email)) {
        validationErrors.email = "Please enter a valid email address";
        hasError = true;
      }
    }

    if (!formData.password.trim()) {
      validationErrors.password = "Password is required";
      hasError = true;
    }

    setErrors(validationErrors);
    if (hasError) return;
    setLoading(true);
    try {
      const response = await axios.post<AuthResponse>(
        `${baseUrl}/api/auth/login`,
        formData,
        { withCredentials: true },
      );

      toast.success(response.data.message);

      await checkAuthStatus();
      navigate("/dashboard");
    } catch (err: any) {
      console.error("Login error:", err.message);
      if (err.response) {
        const statusCode = err.response.status;
        const errorMsg = err.response.data.message;

        if (statusCode === 400 || statusCode === 401) {
          setErrors({
            email: errorMsg,
            password: errorMsg,
          });
        } else if (statusCode === 500) {
          toast.error(
            err.response.data.message || "Failed to login. Please try again.",
          );
        }
      } else {
        toast.error("Server is not responding. Please check your connection");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9FAFB] text-[#1A1A1A]">
      <div className="max-w-[440px] w-full bg-white border border-gray-200/60 rounded-[24px] p-8 shadow-[0_1px_3px_rgba(0,0,0,0.02),0_20px_40px_rgba(0,0,0,0.03)]">
        <img
          src={logo}
          alt="Logo"
          className="w-32 h-auto object-contain mb-3 mx-auto block"
          draggable="false"
        />

        <p className="text-gray-500 text-center mb-4  text-sm sm:text-base ">
          Sign in to continue to your dashboard
        </p>

        <form
          className="space-y-6"
          onSubmit={handleLogin}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => e.preventDefault()}
        >
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
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && (
              <span className="absolute left-1 top-16 translate-y-2 text-red-500 text-sm">
                {errors.email}
              </span>
            )}
          </div>

          <div className="relative">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 ml-1">
              Password<span className="text-red-500 absolute top-0">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full bg-gray-100 border border-gray-100 rounded-xl px-4 py-3 text-black focus:outline-none focus:border-black transition-all placeholder:text-gray-400 pr-12"
                placeholder="••••••••"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && (
                <span className="absolute left-1 top-10 translate-y-2 text-red-500 text-sm">
                  {errors.password}
                </span>
              )}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors cursor-pointer"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="flex justify-end text-sm">
            <Link
              to="/forgot-password"
              className="font-semibold text-gray-400 hover:text-black transition-colors"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white font-bold rounded-xl px-4 py-3.5 transition-all hover:bg-gray-900 active:scale-[0.98] cursor-pointer"
          >
            {loading ? <Loader text="Signing in..." /> : "Sign In"}
          </button>
        </form>

        <div className="text-center mt-3">
          <p className="text-sm text-slate-500">
            Do not have an account?{" "}
            <Link
              to="/signup"
              className="text-black font-bold hover:underline underline-offset-4 transition-all"
            >
              Create an account
            </Link>
          </p>
        </div>
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
  );
};

export default Login;