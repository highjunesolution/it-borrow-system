import React from "react";
import AppRoutes from "./routes/AppRoutes";
import { GooeyToaster } from "goey-toast";
import 'goey-toast/styles.css'
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <>
      <AppRoutes />
      <GooeyToaster position="bottom-center" />
      <ToastContainer position="bottom-right" limit={4}/>
    </>
  );
};

export default App;
