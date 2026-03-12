import { faPenAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useMemo, useState } from "react";
import useMisStore from "../../store/mis-store";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { deleteCategory } from "../../apis/categories";

const CategoryTable = ({ setEdit }) => {
  const getCategories = useMisStore((state) => state.getCategories);
  const categories = useMisStore((state) => state.categories);
  const token = useMisStore((state) => state.token);

  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const columns = useMemo(
    () => [
      {
        id: "index",
        header: "#",
        size: 56,
        cell: ({ row }) => (
          <span className="text-sm font-mono text-slate-400">
            {String(row.index + 1).padStart(2, "0")}
          </span>
        ),
      },
      {
        accessorKey: "name",
        header: "Category Name",
        cell: ({ getValue }) => (
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-sm shadow-emerald-200" />
            <span className="font-medium text-slate-700">{getValue()}</span>
          </div>
        ),
      },
      {
        accessorKey: "updatedAt",
        header: "Last Update",
        cell: ({ getValue }) => {
          const date = new Date(getValue());
          return (
            <span className="text-sm text-slate-400">
              {date.toLocaleDateString("en-US", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          );
        },
      },
      {
        id: "action",
        header: "",
        size: 120,
        cell: ({ row }) => (
          <div className="flex gap-2 justify-end">
            <button
              onClick={() => setEdit(row.original)}
              className="group flex items-center gap-1.5 bg-slate-50 hover:bg-sky-50 border border-slate-200 hover:border-sky-200 py-1.5 px-3 rounded-lg text-slate-400 hover:text-sky-500 transition-all duration-150 text-xs font-medium cursor-pointer"
            >
              <FontAwesomeIcon icon={faPenAlt} className="text-xs" />
              <span className="hidden sm:inline">Edit</span>
            </button>
            <button
              onClick={() => handleDelete(row.original)}
              className="group flex items-center gap-1.5 bg-slate-50 hover:bg-red-50 border border-slate-200 hover:border-red-200 py-1.5 px-3 rounded-lg text-slate-400 hover:text-red-500 transition-all duration-150 text-xs font-medium cursor-pointer"
            >
              <FontAwesomeIcon icon={faTrashAlt} className="text-xs" />
              <span className="hidden sm:inline">Delete</span>
            </button>
          </div>
        ),
      },
    ],
    [],
  );

  const table = useReactTable({
    data: categories,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const handleDelete = async (item) => {
    const result = await Swal.fire({
      title: `Remove "${item.name}" ?`,
      text: "Category will not return",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#94a3b8",
    });

    if (result.isConfirmed) {
      await toast.promise(deleteCategory(token, item.id).then(()=>getCategories(token)), {
        pending: "Deleting...",
        success: `"${item.name}" Removed`,
        error: {
          render({ data }) {
            return data?.response?.data?.msg || "Server Error";
          },
        },
      });
    }
  };

  return (
    <div className="col-span-full h-160 bg-white rounded-2xl flex flex-col overflow-hidden shadow-sm border border-slate-100">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
        <div>
          <h2 className="text-base font-semibold text-slate-800 tracking-tight">
            Categories
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            {table.getFilteredRowModel().rows.length} items total
          </p>
        </div>

        {/* Search */}
        <div className="relative">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search..."
            className="pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl w-52 outline-none focus:ring-2 focus:ring-slate-200 focus:bg-white transition-all placeholder-slate-400 text-slate-700"
          />
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-y-auto">
        <table className="table-fixed w-full text-left">
          <thead className="bg-slate-50/80 sticky top-0 z-10 backdrop-blur-sm">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    style={{ width: header.getSize() }}
                    onClick={header.column.getToggleSortingHandler()}
                    className="px-6 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider cursor-pointer select-none border-b border-slate-100"
                  >
                    <div className="flex items-center gap-1">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                      {header.column.getCanSort() && (
                        <span className="text-slate-300">
                          {{ asc: "↑", desc: "↓" }[
                            header.column.getIsSorted()
                          ] ?? "↕"}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody className="divide-y divide-slate-50">
            {table.getRowModel().rows.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-20">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-2xl">
                      🗂️
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-500">
                        No categories found
                      </p>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Try adjusting your search
                      </p>
                    </div>
                  </div>
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-slate-50/60 transition-colors duration-100 group"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-6 py-3.5 border-b border-slate-50"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="px-6 py-3 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
        <span className="text-xs text-slate-400">
          Showing{" "}
          <span className="font-semibold text-slate-600">
            {table.getFilteredRowModel().rows.length}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-slate-600">
            {categories.length}
          </span>{" "}
          categories
        </span>
        <div className="flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span className="text-xs text-slate-400">Live</span>
        </div>
      </div>
    </div>
  );
};

export default CategoryTable;
