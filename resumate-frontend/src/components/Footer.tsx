import {
  Cog6ToothIcon,
  BuildingStorefrontIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 border-t border-gray-700 py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center space-x-2 text-white text-2xl font-bold cursor-pointer">
          <Link to={'/'}>ResuMate</Link>
        </div>

        <nav className="flex flex-wrap justify-center gap-6 text-sm md:text-base">
          <a href="#about" className="hover:text-white transition-colors flex items-center gap-1">
            <BuildingStorefrontIcon className="h-5 w-5" /> About
          </a>
          <a href="#features" className="hover:text-white transition-colors flex items-center gap-1">
            <Cog6ToothIcon className="h-5 w-5" /> Features
          </a>
        </nav>

        <div className="flex items-center space-x-6 text-gray-400">
          <div aria-label="Twitter" className="hover:text-gray-100 transition-colors cursor-pointer">
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.954 4.569a10.016 10.016 0 01-2.825.775 4.931 4.931 0 002.163-2.724 10.15 10.15 0 01-3.127 1.195 4.916 4.916 0 00-8.379 4.482A13.98 13.98 0 011.671 3.15a4.828 4.828 0 001.523 6.574 4.902 4.902 0 01-2.224-.616c-.054 2.281 1.581 4.415 3.946 4.89a4.902 4.902 0 01-2.212.084 4.936 4.936 0 004.604 3.419 9.867 9.867 0 01-6.102 2.104c-.395 0-.788-.023-1.176-.067a13.978 13.978 0 007.557 2.209c9.054 0 14.002-7.496 14.002-13.985 0-.21-.005-.423-.015-.633a9.936 9.936 0 002.457-2.548l-.047-.02z" />
            </svg>
          </div>
          <div  aria-label="LinkedIn" className="hover:text-gray-100 transition-colors cursor-pointer">
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M4.98 3.5C4.98 4.88 3.9 6 2.5 6S.02 4.88.02 3.5 1.1 1 2.5 1 4.98 2.13 4.98 3.5zM.15 7h4.68v13.5H.15V7zM8.62 7v2h.06c.66-1 2.27-2 4.68-2 5 0 6 3.2 6 7.3V20.5h-4.76v-7c0-1.7-.03-3.9-2.38-3.9-2.38 0-2.75 1.83-2.75 3.7V20.5H8.62V7z"/>
            </svg>
          </div>
          <div aria-label="GitHub" className="hover:text-gray-100 transition-colors cursor-pointer">
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 .5C5.65.5.5 5.64.5 12a11.5 11.5 0 008 10.97c.6.113.82-.26.82-.577v-2.14c-3.26.714-3.95-1.573-3.95-1.573a3.1 3.1 0 00-1.3-1.713c-1.06-.723.08-.71.08-.71a2.46 2.46 0 011.79 1.205 2.5 2.5 0 003.42.98 2.46 2.46 0 01.73-1.54c-2.6-.3-5.35-1.3-5.35-5.77a4.53 4.53 0 011.2-3.16 4.13 4.13 0 01.1-3.12s1-.32 3.3 1.2a11.39 11.39 0 016 0c2.3-1.52 3.3-1.2 3.3-1.2a4.13 4.13 0 01.11 3.12 4.53 4.53 0 011.2 3.16c0 4.5-2.75 5.46-5.37 5.76a2.74 2.74 0 01.78 2.12v3.15c0 .32.22.7.83.57a11.5 11.5 0 008-10.96c0-6.36-5.14-11.5-11.5-11.5z"/>
            </svg>
          </div>
        </div>
      </div>
      <p className="text-center text-sm text-gray-500 mt-6">
        &copy; 2025 ResuMate. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;