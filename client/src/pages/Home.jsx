import React, { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    document.title = "Home | IT Assets System";
  }, []);
  console.log("Home");

  return (
    <div className="w-full">
      <div className="space-y-96">
        <div>Home</div>
        <div>Home</div>
        <div>Home</div>
        <div>Home</div>
        <div>Home</div>
        <div>Home</div>
        <div>Home</div>
        <div>Home</div>
        <div>Home</div>
      </div>
    </div>
  );
};

export default Home;
