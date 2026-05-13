import { AlertCircle } from "lucide-react";


interface ErrorViewProps {
  onRetry: () => void;
  message?: string;
  title?: string;
}

const ErrorView = ({ 
  onRetry, 
  title = "Connection Issue", 
  message = "We are having trouble reaching the server. Please check your internet or try again later." 
}: ErrorViewProps) => {
  return (
     <div className="flex flex-col items-center justify-center min-h-[400px] p-10 text-center">
    <div className="bg-red-50 text-red-600 p-4 rounded-full mb-4">
       <AlertCircle size={40} /> 
    </div>
    <h2 className="text-xl font-bold text-slate-900">{title}</h2>
    <p className="text-slate-500 mb-6">{message}</p>
    <button 
      onClick={onRetry}
      className="px-6 py-2 bg-black text-white rounded-lg font-bold hover:bg-slate-800 transition-all cursor-pointer"
    >
      Try Again
    </button>
  </div>
  )
}

export default ErrorView