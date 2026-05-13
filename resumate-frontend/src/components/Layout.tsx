import { Link, Outlet, useLocation } from "react-router-dom";
import { LayoutDashboard, History, FileUp } from "lucide-react";
import Navbar from "./Navbar";

export default function Layout() {
  const location = useLocation();
  const path = location.pathname;

  return (
    <div>
      <Navbar />

      <div className="flex pt-16 h-screen bg-slate-50/50">
        <aside className="w-64 border-r border-slate-200 bg-white hidden lg:flex flex-col p-6 gap-y-8">
          <div className="space-y-2">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-2">
              Menu
            </p>
            <nav className="flex flex-col gap-1">
              <Link
                to=""
                className={`flex items-center gap-3 px-3 py-2 text-sm font-medium  rounded-lg 
                  ${
                    path === "/dashboard" || path === "/dashboard/"
                      ? "bg-slate-100 text-slate-900"
                      : "text-slate-600 hover:bg-slate-50"
                  }
                  `}
              >
                <LayoutDashboard size={18} /> Dashboard
              </Link>

              <Link
                to="history"
                className={`flex items-center gap-3 px-3 py-2 text-sm font-medium  rounded-lg   ${
                  path === "/dashboard/history"
                    ? "bg-slate-100 text-slate-900"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <History size={18} /> History
              </Link>

              <Link
                to="upload-resume"
                className={`flex items-center gap-3 px-3 py-2 text-sm font-medium  rounded-lg ${
                  path === "/dashboard/upload-resume"
                    ? "bg-slate-100 text-slate-900"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <FileUp size={18} /> New Analysis
              </Link>
            </nav>
          </div>
        </aside>

        <main className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}