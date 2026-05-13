import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-white text-gray-600 border-t border-gray-100 py-3 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center space-x-2 text-black text-2xl font-bold cursor-pointer">
          <Link to={"/"}>
            <img src={logo} alt="logo" width={120} height="auto" />
          </Link>
        </div>

        <p className="text-xs text-gray-400 uppercase tracking-[0.2em] md:mt-0">
          &copy; {new Date().getFullYear()} ResuMate. All rights reserved.
        </p>

      </div>
    </footer>
  );
};

export default Footer;