import React from "react";

const HomeAdmin = () => {
  const arrMockup = Array.from({ length: 12 });

  return (
    <div className="grid grid-cols-1 grid-rows-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 overflow-auto">
      {arrMockup.map((_, index) => (
        <div key={index} className="bg-white px-3 py-4 rounded-xl shadow-md space-y-3">
          <h1 className="font-semibold text-2xl">Card</h1>
          <p className="text-md font-normal">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit fuga
            eaque magni repellat, accusantium nulla possimus cupiditate officia
            similique culpa?
          </p>
        </div>
      ))}
    </div>
  );
};

export default HomeAdmin;
