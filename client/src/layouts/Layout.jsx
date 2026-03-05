import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";
const Layout = () => {
  const [collapse, setCollapse] = useState(false);
  return (
    <div className="bg-gray-200 min-h-screen">
      <div className="flex flex-col gap-y-4">
        <div className="bg-white border-b border-gray-100 sticky top-0 w-full">
          <Navbar collapse={collapse} setCollapse={setCollapse} />
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
