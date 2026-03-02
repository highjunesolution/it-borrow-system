import React, { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    document.title = "Home | IT Assets System";
  }, []);
  console.log("Home");

  return <div className="w-full">Home</div>;
};

export default Home;
