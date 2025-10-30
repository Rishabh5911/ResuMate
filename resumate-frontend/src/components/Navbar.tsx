import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router-dom";

const navigation = [
  { name: "Home", path: "/" },
  { name: "Upload Resume", path: "/upload-resume" },
  { name: "About Us", path: "/about" },
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  let location = useLocation();

  return (
    <div>
      <header className="fixed inset-x-0 top-0 z-50 bg-transparent backdrop-blur-md">
        <nav
          aria-label="Global"
          className="flex items-center 
        justify-between  py-4 px-6 lg:px-8 border-b border-gray-700"
        >
          <div className="font-bold text-3xl">
            <Link to={"/"} className="-m-1.5 p-1.5 text-white">
              ResuMate
            </Link>
          </div>

          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-200 cursor-pointer"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="w-6 h-6" />
            </button>
          </div>

          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`text-base font-semibold cursor-pointer ${
                    isActive
                      ? "text-indigo-500  border-indigo-500"
                      : "text-white hover:text-indigo-400"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        </nav>

        <Dialog
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
          className="lg:hidden"
        >
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-900 p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-100/10">
            <div className="flex items-center justify-between">
              <Link to={"/"} className="-m-1.5 p-1.5">
                <span className="sr-only">ResuMate</span>
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-200 cursor-pointer"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="w-6 h-6" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-white/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                      <Link
                        to={item.path}
                        key={item.name}
                        className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold transition-colors duration-300 ${
                          isActive
                            ? "bg-transparent text-indigo-500"
                            : "text-white hover:bg-white/5"
                        }`}
                      >
                        {item.name}
                      </Link>
                    );
                  })}
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
