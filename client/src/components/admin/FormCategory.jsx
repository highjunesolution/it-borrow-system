import React, { useEffect, useState } from "react";
import useMisStore from "../../store/mis-store";
import { toast } from "react-toastify";
import { updateCategory } from "../../apis/categories";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";

// FormCategory.jsx
const FormCategory = ({ edit, setEdit }) => {
  const token = useMisStore((state) => state.token);
  const createCategory = useMisStore((state) => state.createCategory);
  const getCategories = useMisStore((state) => state.getCategories);

  const [name, setName] = useState("");

  // เมื่อ edit เปลี่ยน ให้ pre-fill ค่าลงฟอร์ม
  useEffect(() => {
    setName(edit ? edit.name : "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [edit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (edit) {
        // mode แก้ไข
        const res = await updateCategory(token, edit.id, { name });
        if (res.data.ok) {
          toast.success(`${name} Updated!`);
          setEdit(null);
        }
      } else {
        // mode เพิ่มใหม่
        const res = await createCategory(token, { name });
        if (res.data.ok) toast.success(`${name} is added!`);
      }
      getCategories(token);
      setName("");
    } catch (err) {
      toast.error(err.response?.data?.msg || "Server Error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="col-span-full bg-white p-4 rounded-xl flex items-center gap-4"
    >
      {/* badge บอก mode */}
      {edit && (
        <span className="text-sm bg-sky-50 text-sky-400 border border-sky-200 px-3 py-1.5 rounded-lg whitespace-nowrap">
          Editing: {edit.name}{" "}
          <FontAwesomeIcon
            className="animate-bounce rotate-270 ml-2"
            icon={faArrowDown}
          />
        </span>
      )}

      <input
        type="text"
        placeholder={edit ? "Edit category name..." : "Add category name..."}
        className={`border border-gray-200 rounded-md flex-1 py-1 px-4 bg-gray-50 outline-0 placeholder:text-slate-400 ${edit && "ring ring-sky-400 bg-sky-50 drop-shadow-xl drop-shadow-sky-50"}`}
        autoFocus
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button
        type="submit"
        className="text-sm font-bold bg-indigo-100 text-indigo-400 py-2 px-4 rounded-2xl cursor-pointer"
      >
        {edit ? "Update" : "Add"}
      </button>
      <button
        onClick={() => {
          setName("");
          setEdit(null);
        }}
        type="button"
        className="text-sm font-bold bg-gray-100 text-gray-400 py-2 px-4 rounded-2xl cursor-pointer"
      >
        Cancel
      </button>
    </form>
  );
};
export default FormCategory;
