import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
// import companyLogo from "../assets/react.svg";
import Sidebar from "../components/admin/Sidebar";
import Header from "../components/admin/Header";

const LayoutAdmin = () => {
  const [collapse, setCollapse] = useState(false);
  return (
    <div className="bg-gray-100 min-h-screen flex">
      {/* sidebar */}
      <Sidebar collapse={collapse} setCollapse={setCollapse}/>

      {/* main content */}
      <main className={`flex-1 lg:ml-64`}>
        <Header collapse={collapse} setCollapse={setCollapse}/>
        <div className="max-w-350 mx-auto py-4 px-4 xl:px-0">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default LayoutAdmin;
