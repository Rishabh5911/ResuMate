import axios from "axios";
import { useRef,useState } from "react";
import {toast} from "react-hot-toast";
import { useNavigate,useLocation } from "react-router-dom";
import Loader from "../components/Loader";
import baseUrl from "../utils/baseUrl";



interface VerifyEmailResponse {
    success: boolean;
    message: string;
}

const VerifyEmail = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const email =
  location.state?.email || localStorage.getItem("email");

  if(!email){
    navigate("/signup");
  }

    type InputList = (HTMLInputElement | null)[];
    const inputRefs = useRef<InputList>([]);
    
    

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>,index: number) => {
        const allowedKeys = ['Backspace', 'Tab', 'Enter', 'ArrowLeft', 'ArrowRight'];
    
        if (!allowedKeys.includes(e.key) && !/^[0-9]$/.test(e.key)) {
            e.preventDefault();
        }

        if (e.key === "Backspace" && !inputRefs.current[index]?.value && index > 0) {
    inputRefs.current[index - 1]?.focus();
  }
};

const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
  const value = e.target.value;

  if (value && index < 6) {
    inputRefs.current[index + 1]?.focus();
  }
};


const handleVerifyEmail = async (e:React.FormEvent) => {
    e.preventDefault();
    const otpValue = inputRefs.current.map((input) => input?.value).join("");
    
  
  if (otpValue.length < 6) {
    toast.error("Please enter a 6-digit OTP");
    return;
  }

  try {
    setLoading(true);
    const res = await axios.post<VerifyEmailResponse>(`${baseUrl}/api/auth/verify-otp`,{email,otp:otpValue});

    if(res.data.success){
        localStorage.removeItem("email");
        toast.success("Account created successfully");
        setTimeout(()=> {
          navigate("/login");
        },1500);
    }

  } catch (error:any) {
    console.error("OTP verification error:",error.message);
    toast.error("OTP verification failed. Please try again.");
  }
  finally{
    setLoading(false);
  }
};
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9FAFB]">
        <div className="text-black bg-white border border-gray-200/60  flex flex-col gap-5 items-center justify-center  rounded-[24px] p-8 shadow-[0_1px_3px_rgba(0,0,0,0.02),0_20px_40px_rgba(0,0,0,0.03)]">
        <h1 className="text-[24px] font-bold tracking-[-0.02em]">Verify Your Email</h1>
        <p className="text-gray-500 text-center text-sm sm:text-base leading-relaxed">Please enter the verification code sent to your email</p>
        <form onSubmit={handleVerifyEmail}>
            <div className="flex gap-3">
               {
                [0,1,2,3,4,5].map((index) => (
                     <input
                        key={index}
                        ref={(el) => { inputRefs.current[index] = el }}
                        type="text"
                        maxLength={1}
                        onChange={(e) => handleChange(e, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        className="w-12 h-12 text-center border border-gray-300 rounded-lg focus:outline-none  text-lg"
                />
                ))
               }

                    
                 
            </div>
            <button type="submit" className="w-full bg-black text-white rounded-xl px-5 py-4 mt-4 cursor-pointer hover:bg-gray-900 font-bold">
              {loading ? <Loader text="Verifying..." /> : "Verify Email"}
            </button>
        </form>
    </div>
    </div>
  )
}

export default VerifyEmail