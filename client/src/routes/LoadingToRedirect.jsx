import { faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const LoadingToRedirect = () => {
  const [count, setCount] = useState(3);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCont) => {
        if (currentCont === 1) {
          clearInterval(interval);
          setRedirect(true);
        }
        return currentCont - 1;
      });
    }, 1000);

    document.title = "Error | IT Assets System";
    return () => clearInterval(interval);
  }, []);
  if (redirect) {
    return <Navigate to={"/"} />;
  }
  return (
    <div className="flex bg-gray-600 flex-col justify-center items-center h-screen gap-5">
      <div className="text-9xl text-red-300 animate-bounce">
        <FontAwesomeIcon icon={faThumbsDown}/>
      </div>
      <h1 className="text-5xl text-red-500 font-bold">Permission Denied</h1>
      <h1 className="text-xl text-red-400 font-semibold bg-red-100 py-4 px-4 rounded-xl">Redirect in {count}</h1>
    </div>
  );
};

export default LoadingToRedirect;
