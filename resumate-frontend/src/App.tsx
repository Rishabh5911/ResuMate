import { Routes, Route, useLocation} from "react-router-dom";
import Home from './pages/Home';
import UploadResume from "./pages/UploadResume";
import About from "./pages/About";
import Analysis from "./pages/Analysis";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"
import NotFoundPage from "./pages/NotFoundPage"
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import VerifyEmail from "./pages/VerifyEmail";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import ProtectedRoute from "./components/ProtectedRoute";



function App() {
  const location = useLocation();
  const currentPath = location.pathname;
  const authPaths = ["/login", "/signup", "/forgot-password", "/reset-password","/verify-otp"];
  const hideNavFooter = authPaths.includes(currentPath) || currentPath.startsWith("/dashboard");

  return (
   <div className="bg-slate-50">
  
      {!hideNavFooter && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/forgot-password" element={<ForgotPassword/>} />
        <Route path="/reset-password" element={<ResetPassword/>} />
        <Route path="/verify-otp" element={<VerifyEmail/>} />

         
        
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="history" element={<History />} />
            <Route path="upload-resume" element={<UploadResume />} />
            <Route path="analysis/:id" element={<Analysis/>} />
          </Route>
        </Route>

        <Route path="*" element={<NotFoundPage />} />
        
      </Routes>

      {!hideNavFooter && <Footer />}
      
       <Toaster position="top-right" reverseOrder={false} />
   </div>
  )
}

export default App