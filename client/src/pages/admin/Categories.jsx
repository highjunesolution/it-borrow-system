import React, { useEffect, useState } from "react";
import useMisStore from "../../store/mis-store";
import FormCategory from "../../components/admin/FormCategory";
import CategoryTable from "../../components/admin/CategoryTable";

const Categories = () => {
  const setHeaderName = useMisStore((state) => state.setHeaderName);
  const token = useMisStore((state) => state.token);
  const getCategories = useMisStore((state) => state.getCategories);
  const [edit, setEdit] = useState(null);

  useEffect(() => {
    setHeaderName("Category");
    getCategories(token);
    document.title = "Category | IT Asshole";
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="col-span-full bg-white py-4 px-4 rounded-xl">
        <h1 className="text-md font-semibold">Category Management</h1>
      </div>
      <FormCategory edit={edit} setEdit={setEdit}/>
      <CategoryTable edit={edit} setEdit={setEdit}/>
    </div>
  );
};

export default Categories;
