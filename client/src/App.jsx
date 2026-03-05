import React from "react";
import AppRoutes from "./routes/AppRoutes";
import { GooeyToaster } from "goey-toast";
import 'goey-toast/styles.css'

const App = () => {
  return (
    <>
      <GooeyToaster position="bottom-center" />
      <AppRoutes />
    </>
  );
};

export default App;
