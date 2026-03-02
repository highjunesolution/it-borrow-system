import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import companyLogo from "../assets/react.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
const Layout = () => {
  const [collapse, setCollapse] = useState(false);
  console.log(collapse);

  return (
    <div className="bg-gray-200 h-screen">
      <div className="flex flex-col">
        <div className="bg-white">
          <div className="max-w-350 px-4 xl:px-0 mx-auto h-16 border-b-2 border-gray-200 z-50">
            <div className="flex justify-between items-center h-full">
              <div className="sm:hidden">
                <button
                  onClick={() => setCollapse(!collapse)}
                  className={
                    collapse
                      ? "bg-gray-100 text-md px-2 py-1 cursor-pointer hover:scale-110 duration-200 active:scale-90 active:opacity-70 rounded-full"
                      : "text-md px-2 py-1 cursor-pointer hover:scale-110 duration-200 active:scale-90 active:opacity-70"
                  }
                >
                  <FontAwesomeIcon icon={collapse ? faXmark : faBars} />
                </button>
              </div>
              <div>
                <img
                  className="h-9 w-9"
                  src={companyLogo}
                  alt="your company logo"
                />
              </div>
              <div className="hidden sm:block flex-1 mx-6 gap-x-3 items-center">
                <NavLink
                  to={"/"}
                  className={({ isActive }) =>
                    isActive
                      ? "rounded-xl px-4 py-2 text-md font-semibold bg-gray-200/20 hover:bg-gray-100 hover:border-gray-400 transition-all duration-200 ease-in-out"
                      : "rounded-xl px-4 py-2 text-md font-semibold hover:bg-gray-100 hover:border-gray-400 transition-all duration-200 ease-in-out"
                  }
                >
                  Home
                </NavLink>
                <NavLink
                  to={"contact"}
                  className={({ isActive }) =>
                    isActive
                      ? "rounded-xl px-4 py-2 text-md font-semibold bg-gray-200/20 hover:bg-gray-100 hover:border-gray-400 transition-all duration-200 ease-in-out"
                      : "rounded-xl px-4 py-2 text-md font-semibold hover:bg-gray-100 hover:border-gray-400 transition-all duration-200 ease-in-out"
                  }
                >
                  Contact
                </NavLink>
              </div>
              <div className="space-x-2 hidden sm:block">
                <NavLink
                  to={"register"}
                  className="rounded-md px-4 py-2 text-md font-semibold hover:ring hover:ring-gray-600 hover:shadow-md"
                >
                  Register
                </NavLink>
                <NavLink
                  to={"login"}
                  className="rounded-md px-4 py-2 text-md font-semibold bg-gray-600 text-white hover:shadow-md"
                >
                  Login
                </NavLink>
              </div>
              <div className="sm:hidden"></div>
            </div>
          </div>
          <div
            className={`bg-white fixed w-full duration-500 sm:-translate-y-100 ${collapse ? "translate-y-0" : "-translate-y-100"} z-10`}
          >
            <div className="max-w-350 px-4 py-3 xl:px-0 h-auto">
              <div className="flex flex-col gap-y-2">
                <NavLink
                  to={"/"}
                  className={({ isActive }) =>
                    isActive
                      ? "rounded-xl px-4 py-2 text-md font-semibold bg-gray-200/20 hover:bg-gray-100 hover:border-gray-400 transition-all duration-200 ease-in-out"
                      : "rounded-xl px-4 py-2 text-md font-semibold hover:bg-gray-100 hover:border-gray-400 transition-all duration-200 ease-in-out"
                  }
                >
                  Home
                </NavLink>
                <NavLink
                  to={"contact"}
                  className={({ isActive }) =>
                    isActive
                      ? "rounded-xl px-4 py-2 text-md font-semibold bg-gray-200/20 hover:bg-gray-100 hover:border-gray-400 transition-all duration-200 ease-in-out"
                      : "rounded-xl px-4 py-2 text-md font-semibold hover:bg-gray-100 hover:border-gray-400 transition-all duration-200 ease-in-out"
                  }
                >
                  Contact
                </NavLink>
                <div className="flex flex-col gap-y-2 border-t border-gray-200 pt-4">
                  <NavLink
                    to={"register"}
                    className="rounded-md px-4 py-2 text-md font-semibold hover:ring hover:ring-gray-600 hover:shadow-md"
                  >
                    Register
                  </NavLink>
                  <NavLink
                    to={"login"}
                    className="rounded-md px-4 py-2 text-md font-semibold bg-gray-600 text-white hover:shadow-md"
                  >
                    Login
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1">
          <div className="max-w-350 px-4 xl:px-0 mx-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
