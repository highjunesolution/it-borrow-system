import React from "react";
import useMisStore from "../../store/mis-store";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBug,
  faClockRotateLeft,
  faFire,
  faGear,
  faHome,
  faLayerGroup,
  faLocationArrow,
  faRobot,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { gooeyToast } from "goey-toast";

const Sidebar = ({collapse, setCollapse}) => {

  const logout = useMisStore((state) => state.logout);
  const navigate = useNavigate();
  const navItems = [
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
    <div
      className={`fixed bg-white w-64 shadow ${collapse ? "translate-x-0 shadow-xl" : "-translate-x-full"} lg:translate-x-0 lg:shadow-none duration-300 z-50`}
    >
      <div className="flex flex-col h-screen overflow-y-auto overflow-x-hidden">
        <div className="bg-indigo-600 px-4 py-6 h-18 flex justify-between items-center border-b border-gray-200 lg:justify-center sticky top-0 left-0 z-50">
          <div className="text-2xl font-bold text-indigo-100">LOGO 🐶</div>
          <button
            onClick={() => setCollapse(!collapse)}
            className="cursor-pointer p-1 hover:bg-gray-200 rounded-full lg:hidden"
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
        <nav className="p-4 space-y-6 flex-1">
          {navItems.map((item, index) => (
            <NavLink
              onClick={() => {
                setCollapse(!collapse)
              }}
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
              gooeyToast.info("👋", {
                description: "Goods bye!"
              })
            }}
            className="px-2 w-full py-2 bg-red-100 rounded-md text-red-500 text-xl font-semibold cursor-pointer hover:drop-shadow-red-100 hover:drop-shadow-2xl "
          >
            <FontAwesomeIcon icon={faFire} />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
