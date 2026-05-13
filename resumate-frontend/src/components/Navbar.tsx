import { useContext, useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Menu, X } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";
import baseUrl from "../utils/baseUrl";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const context = useContext(AuthContext);
  const { user, setUser } = context!;

  const guestNavItems = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
  ];

  const userNavItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "History", path: "/dashboard/history" },
  ];

  const navItems = user ? userNavItems : guestNavItems;

  const handleLogout = async () => {
    try {
      await axios.post(
        `${baseUrl}/api/auth/logout`,
        {},
        {
          withCredentials: true,
        },
      );

      setUser(null);
      toast.success("Logged Out successfully", {
        position: "top-right",
        duration: 3000,
      });
      navigate("/login");
    } catch (error: any) {
      console.error("Logout error:", error.message);
      toast.error("Failed to logout. Please try again");
    }
  };

  return (
    <div>
      <header className="fixed inset-x-0 top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/80">
        <nav
          aria-label="Global"
          className="flex items-center 
        justify-between  py-4 px-6 lg:px-8 max-w-7xl mx-auto"
        >
          <div className="flex lg:flex-1">
            <Link to={"/"}>
              <img src={logo} alt="logo" width={120} height="auto" />
            </Link>
          </div>

          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="inline-flex items-center justify-center rounded-md p-2 text-slate-600 hover:bg-slate-50 cursor-pointer"
            >
              <span className="sr-only">Open main menu</span>
              <Menu aria-hidden="true" className="w-6 h-6" />
            </button>
          </div>

          <div className="hidden lg:flex lg:gap-x-10">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? "text-indigo-600"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-x-6">
            {!user ? (
              <>
                <Link
                  to="/login"
                  className="text-sm font-medium text-slate-600 hover:text-slate-900"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-700"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                <span className="text-sm font-medium text-slate-700">
                  {user.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-700 cursor-pointer"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </nav>

        <Dialog
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
          className="lg:hidden"
        >
          <div className="fixed inset-0 z-50 bg-slate-900/10 backdrop-blur-sm" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 max-w-xs sm:max-w-sm ring-1 ring-slate-200 shadow-2xl">
            <div className="flex items-center justify-between">
              <Link to={"/"} className="text-lg font-bold text-slate-900">
                <span className="sr-only">ResuMate</span>
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-md p-2 text-slate-500 hover:bg-slate-50"
              >
                <X aria-hidden="true" className="w-6 h-6" />
              </button>
            </div>
            <div className="mt-8 flow-root">
              <div className="-my-6 divide-y divide-slate-100">
                <div className="space-y-1 py-6">
                  {navItems.map((item) => {
                    return (
                      <Link
                        onClick={() => setMobileMenuOpen(false)}
                        to={item.path}
                        key={item.name}
                        className={`block rounded-lg px-3 py-2.5 text-base font-medium text-slate-700 hover:bg-slate-50 ${
                          location.pathname === item.path
                            ? "bg-indigo-50 text-indigo-700"
                            : "text-slate-700 hover:bg-slate-50"
                        } `}
                      >
                        {item.name}
                      </Link>
                    );
                  })}
                </div>
                <div className="py-6 space-y-4">
                  {!user ? (
                    <>
                      <Link
                        to="/login"
                        className="block text-base font-medium text-slate-700 px-3"
                      >
                        Login
                      </Link>
                      <Link
                        to="/signup"
                        className="block rounded-lg bg-slate-900 px-4 py-3 text-center text-base font-semibold text-white"
                      >
                        Sign Up
                      </Link>
                    </>
                  ) : (
                    <>
                      <div className="px-3 text-base font-medium text-slate-700">
                        {user.name}
                      </div>
                      <button
                        onClick={handleLogout}
                        className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-700 cursor-pointer"
                      >
                        Logout
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>
    </div>
  );
};

export default Navbar;
