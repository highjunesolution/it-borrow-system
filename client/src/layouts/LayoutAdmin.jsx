import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
// import companyLogo from "../assets/react.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faBug,
  faClockRotateLeft,
  faFire,
  faGear,
  faLayerGroup,
  faLocationArrow,
  faRobot,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { faHome } from "@fortawesome/free-regular-svg-icons";
import { faAccessibleIcon } from "@fortawesome/free-brands-svg-icons";
import useMisStore from "../store/mis-store";

const LayoutAdmin = () => {
  const [collapse, setCollapse] = useState(false);
  const logout = useMisStore((state) => state.logout);
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Home-Admin | IT Asshole";
  }, []);

  const navItems = [
    // ##ADMIN
    // HOME
    // CATEGORIES
    // ASSETS
    // REQUEST
    // USERS
    // HISTORY
    // SETTINGS
    {
      name: "Home",
      icon: <FontAwesomeIcon icon={faHome} />,
      to: "/admin",
    },
    {
      name: "Categories",
      icon: <FontAwesomeIcon icon={faLayerGroup} />,
      to: "categories",
    },
    {
      name: "Assets",
      icon: <FontAwesomeIcon icon={faRobot} />,
      to: "assets",
    },
    {
      name: "Requests",
      icon: <FontAwesomeIcon icon={faLocationArrow} />,
      to: "requests",
    },
    {
      name: "Users",
      icon: <FontAwesomeIcon icon={faBug} />,
      to: "users",
    },
    {
      name: "History",
      icon: <FontAwesomeIcon icon={faClockRotateLeft} />,
      to: "history",
    },
    {
      name: "Settings",
      icon: <FontAwesomeIcon icon={faGear} />,
      to: "settings",
    },
  ];
  return (
    <div className="bg-gray-100 min-h-screen flex">
      {/* sidebar */}
      <div
        className={`fixed bg-white w-64 shadow ${collapse ? "translate-x-0 shadow-xl" : "-translate-x-full"} lg:translate-x-0 lg:static lg:shadow-none duration-300`}
      >
        <div className="flex flex-col h-screen overflow-y-auto overflow-x-hidden">
          <div className="px-4 py-6 h-18 flex justify-between items-center border-b border-gray-200 lg:justify-center">
            <div className="text-2xl font-bold">LOGO 🐶</div>
            <button
              onClick={() => setCollapse(!collapse)}
              className="cursor-pointer p-1 hover:bg-gray-200 rounded-full lg:hidden"
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>
          <nav className="p-4 space-y-6 flex-1 ">
            {navItems.map((item, index) => (
              <NavLink
                onClick={() => setCollapse(!collapse)}
                key={index}
                end={item.to === "/admin"}
                to={item.to}
                className={({ isActive }) =>
                  `flex gap-x-4 px-4 py-2 items-center hover:bg-gray-200 rounded-md active:scale-90 duration-300 relative ${isActive && "bg-gray-200"}`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="text-xl">{item.icon}</div>
                    <div className="text-md">{item.name}</div>

                    {isActive && (
                      <>
                        <div className="absolute w-5 h-5 bg-red-200 top-0 right-0 translate-x-2 -translate-y-2 rounded-full animate-ping"></div>
                        <div className="absolute w-3 h-3 bg-red-400 top-0 right-0 translate-x-1 -translate-y-1 rounded-full"></div>
                      </>
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>
          <div className="px-4 pb-24 pt-8 mx-auto w-3/4 border-t border-gray-300">
            <button
              onClick={() => {
                logout();
                navigate("/");
              }}
              className="px-2 w-full py-2 bg-red-100 rounded-md text-red-500 text-xl font-semibold cursor-pointer hover:drop-shadow-red-100 hover:drop-shadow-2xl "
            >
              <FontAwesomeIcon icon={faFire} />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* main content */}
      <main className="flex-1">
        <header className="bg-white p-4">
          <div className="flex justify-between items-center max-w-350 mx-auto">
            <button
              onClick={() => setCollapse(!collapse)}
              className="p-2 text-xl font-bold lg:hidden cursor-pointer"
            >
              <FontAwesomeIcon icon={faBars} />
            </button>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <div className="bg-green-100  rounded-full flex items-center justify-center p-2">
              <FontAwesomeIcon
                className="text-green-600 text-xl"
                icon={faAccessibleIcon}
              />
            </div>
          </div>
        </header>
        <div className="max-w-350 mx-auto py-4 px-4 xl:px-0">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default LayoutAdmin;
