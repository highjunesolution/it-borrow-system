import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../layouts/Layout";
import Home from "../pages/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Contact from "../pages/Contact";
import HomeUser from "../pages/user/HomeUser";
import ProtectUser from "./ProtectUser";
import ProtectAdmin from "./ProtectAdmin";
import HomeAdmin from "../pages/admin/HomeAdmin";
import LayoutAdmin from "../layouts/LayoutAdmin";
import Assets from "../pages/admin/Assets";
import Categories from "../pages/admin/Categories";
import Requests from "../pages/admin/Requests";
import Users from "../pages/admin/Users";
import History from "../pages/admin/History";
import Settings from "../pages/admin/Settings";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "contact", element: <Contact /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
  {
    path: "/user",
    element: <ProtectUser element={<HomeUser />} />,
  },
  {
    path: "/admin",
    element: <ProtectAdmin element={<LayoutAdmin />} />,
    children: [
      { index: true, element: <HomeAdmin/> },
      { path: "categories", element: <Categories/>},
      { path: "assets", element: <Assets/>},
      { path: "requests", element: <Requests/>},
      { path: "users", element: <Users/>},
      { path: "history", element: <History/>},
      { path: "settings", element: <Settings/>},
    ]
  },
]);

const AppRoutes = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default AppRoutes;
