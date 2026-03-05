import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import companyLogo from "../assets/react.svg";
import { NavLink } from "react-router-dom";

const menuItem = [
  {
    name: "Home",
    to: "/",
  },
  {
    name: "Contact",
    to: "contact",
  },
];

const authMenu = [
  {
    name: "Register",
    to: "register",
  },
  {
    name: "Login",
    to: "login",
  },
];
const NavMenu = ({ collapse, setCollapse }) =>
  menuItem.map((item, index) => (
    <NavLink
      onClick={() => setCollapse(!collapse)}
      key={index}
      to={item.to}
      className={({ isActive }) =>
        isActive
          ? "rounded-xl px-4 py-2 text-md font-semibold bg-gray-200/20 hover:bg-gray-100 hover:border-gray-400 transition-all duration-200 ease-in-out"
          : "rounded-xl px-4 py-2 text-md font-semibold hover:bg-gray-100 hover:border-gray-400 transition-all duration-200 ease-in-out"
      }
    >
      {item.name}
    </NavLink>
  ));

const AuthMenu = ({ collapse, setCollapse }) =>
  authMenu.map((item, index) => (
    <NavLink
      onClick={() => setCollapse(!collapse)}
      key={index}
      to={item.to}
      className={
        item.name === "Register"
          ? "rounded-md px-4 py-2 text-md font-semibold hover:ring hover:ring-gray-600 hover:shadow-md"
          : "rounded-md px-4 py-2 text-md font-semibold bg-gray-600 text-white hover:shadow-md"
      }
    >
      {item.name}
    </NavLink>
  ));

const Navbar = ({ collapse, setCollapse }) => {
  return (
    <>
      <div className="max-w-350 px-4 xl:px-0 mx-auto h-16">
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
            <NavMenu />
          </div>
          <div className="space-x-2 hidden sm:block">
            <AuthMenu />
          </div>
          <div className="sm:hidden"></div>
        </div>
      </div>
      <div
        className={`bg-white fixed top-16 left-0 z-40 w-full duration-500 sm:-translate-y-100 ${collapse ? "translate-y-0" : "-translate-y-100"}`}
      >
        <div className="max-w-350 px-4 py-3 xl:px-0 h-auto">
          <div className="flex flex-col gap-y-2">
            <NavMenu />
            <div className="flex flex-col gap-y-2 border-t border-gray-200 pt-4">
              <AuthMenu />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
