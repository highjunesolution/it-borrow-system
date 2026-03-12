import React, { useRef, useState } from "react";
import { createAsset } from "../../apis/assets";
import { toast } from "react-toastify";

const initialState = {
  assetCode: "",
  name: "",
  description: "",
  status: "AVAILABLE",
  categoryId: "",
  assetImages: [],
  inventories: [],
};

const STATUS_OPTIONS = [
  {
    value: "AVAILABLE",
    label: "Available",
    color: "bg-emerald-100 text-emerald-600",
  },
  {
    value: "MAINTENANCE",
    label: "Maintenance",
    color: "bg-amber-100 text-amber-600",
  },
  { value: "RETIRED", label: "Retired", color: "bg-slate-100 text-slate-500" },
  { value: "IT_OWNER", label: "IT Owner", color: "bg-sky-100 text-sky-600" },
  {
    value: "BORROWED",
    label: "Borrowed",
    color: "bg-violet-100 text-violet-600",
  },
];

// ── Modal Form Component ───────────────────────────────
const AssetFormModal = ({ open, onClose, token, categories, onSuccess }) => {
  const [form, setForm] = useState(initialState);
  const [previews, setPreviews] = useState([]);
  const fileInputRef = useRef(null);

  const selectedStatus = STATUS_OPTIONS.find((s) => s.value === form.status);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
  const MAX_SIZE_MB = 5;
  const handleFileChange = (e) => {
    const files = [...e.target.files];

    const invalidType = files.find((f) => !ALLOWED_TYPES.includes(f.type));
    if (invalidType) {
      toast.error(`"${invalidType.name}" is not a valid image file`);
      e.target.value = "";
      return;
    }

    const oversized = files.find((f) => f.size > MAX_SIZE_MB * 1024 * 1024);
    if (oversized) {
      toast.error(`"${oversized.name}" exceeds ${MAX_SIZE_MB}MB limit`);
      e.target.value = "";
      return;
    }

    setForm({ ...form, assetImages: files });
    setPreviews(files.map((f) => URL.createObjectURL(f)));
  };

  const removeImage = (index) => {
    setForm({
      ...form,
      assetImages: form.assetImages.filter((_, i) => i !== index),
    });
    setPreviews(previews.filter((_, i) => i !== index));
  };

  const addInventory = () => {
    setForm({
      ...form,
      inventories: [
        ...form.inventories,
        { serialNumber: "", location: "", isAvailable: true },
      ],
    });
  };

  const updateInventory = (index, field, value) => {
    const updated = [...form.inventories];
    updated[index][field] = value;
    setForm({ ...form, inventories: updated });
  };

  const removeInventory = (index) => {
    setForm({
      ...form,
      inventories: form.inventories.filter((_, i) => i !== index),
    });
  };

  const handleReset = () => {
    setForm(initialState);
    setPreviews([]);
  };

  const handleClose = () => {
    handleReset();
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("assetCode", form.assetCode);
    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("status", form.status);
    formData.append("categoryId", form.categoryId);
    formData.append("inventories",JSON.stringify(form.inventories));
    form.assetImages.forEach((file) => formData.append("assetImages", file));

    await toast.promise(createAsset(token, formData), {
      pending: "Saving asset...",
      success: "Asset created!",
      error: {
        render({ data }) {
          return data?.response?.data?.msg || "Server Error";
        },
      },
    });

    handleReset();
    onSuccess?.();
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/30 transition-opacity duration-200" onClick={handleClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl mx-4 max-h-[90vh] flex flex-col overflow-hidden transition-all duration-200 ease-out">
        {/* Modal header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50 shrink-0">
          <div>
            <h2 className="text-sm font-semibold text-slate-700">
              Create Asset
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Fill in the details below
            </p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all"
          >
            ✕
          </button>
        </div>

        {/* Modal body — scrollable */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col flex-1 overflow-hidden"
        >
          <div className="flex-1 overflow-y-auto p-6 grid grid-cols-12 gap-6">
            {/* LEFT — main info */}
            <div className="col-span-12 lg:col-span-8 flex flex-col gap-5">
              {/* Asset Code + Name */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Asset Code
                  </label>
                  <input
                    type="text"
                    name="assetCode"
                    value={form.assetCode}
                    onChange={handleChange}
                    placeholder="e.g. NB-001"
                    className="border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 bg-slate-50 outline-none focus:ring-2 focus:ring-slate-200 focus:bg-white transition-all placeholder-slate-300"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="e.g. Lenovo ThinkPad"
                    className="border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 bg-slate-50 outline-none focus:ring-2 focus:ring-slate-200 focus:bg-white transition-all placeholder-slate-300"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Description
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Describe the asset..."
                  className="border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 bg-slate-50 outline-none focus:ring-2 focus:ring-slate-200 focus:bg-white transition-all placeholder-slate-300 resize-none"
                />
              </div>

              {/* Status + Category */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Status
                  </label>
                  <div className="relative">
                    <select
                      name="status"
                      value={form.status}
                      onChange={handleChange}
                      className="w-full appearance-none border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 bg-slate-50 outline-none focus:ring-2 focus:ring-slate-200 focus:bg-white transition-all cursor-pointer"
                    >
                      {STATUS_OPTIONS.map((s) => (
                        <option key={s.value} value={s.value}>
                          {s.label}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
                      <svg
                        className="w-4 h-4 text-slate-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                  {selectedStatus && (
                    <span
                      className={`text-xs px-2.5 py-1 rounded-lg font-medium w-fit ${selectedStatus.color}`}
                    >
                      {selectedStatus.label}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Category
                  </label>
                  <div className="relative">
                    <select
                      name="categoryId"
                      value={form.categoryId}
                      onChange={handleChange}
                      className="w-full appearance-none border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 bg-slate-50 outline-none focus:ring-2 focus:ring-slate-200 focus:bg-white transition-all cursor-pointer"
                    >
                      <option value="">Select Category</option>
                      {categories.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
                      <svg
                        className="w-4 h-4 text-slate-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Inventories */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Inventories
                  </label>
                  <span className="text-xs text-slate-400">
                    {form.inventories.length} items
                  </span>
                </div>

                {form.inventories.map((inv, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Serial Number"
                      value={inv.serialNumber}
                      onChange={(e) =>
                        updateInventory(index, "serialNumber", e.target.value)
                      }
                      className="border border-slate-200 rounded-xl px-4 py-2 text-sm flex-1 bg-slate-50 outline-none focus:ring-2 focus:ring-slate-200 focus:bg-white transition-all placeholder-slate-300"
                    />
                    <input
                      type="text"
                      placeholder="Location"
                      value={inv.location}
                      onChange={(e) =>
                        updateInventory(index, "location", e.target.value)
                      }
                      className="border border-slate-200 rounded-xl px-4 py-2 text-sm flex-1 bg-slate-50 outline-none focus:ring-2 focus:ring-slate-200 focus:bg-white transition-all placeholder-slate-300"
                    />
                    <div className="relative">
                      <select
                        value={inv.isAvailable}
                        onChange={(e) =>
                          updateInventory(
                            index,
                            "isAvailable",
                            e.target.value === "true",
                          )
                        }
                        className="appearance-none border border-slate-200 rounded-xl px-3 py-2 text-sm bg-slate-50 outline-none focus:ring-2 focus:ring-slate-200 focus:bg-white transition-all cursor-pointer pr-7"
                      >
                        <option value={true}>Available</option>
                        <option value={false}>Not Available</option>
                      </select>
                      <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2">
                        <svg
                          className="w-3 h-3 text-slate-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeInventory(index)}
                      className="text-slate-300 hover:text-red-400 transition-colors w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-50 shrink-0"
                    >
                      ✕
                    </button>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={addInventory}
                  className="text-xs border border-dashed border-slate-200 hover:border-sky-300 hover:text-sky-500 text-slate-400 px-4 py-2.5 rounded-xl w-full transition-all"
                >
                  + Add Inventory
                </button>
              </div>
            </div>

            {/* RIGHT — images */}
            <div className="col-span-12 lg:col-span-4 flex flex-col gap-3">
              <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                Images
              </label>
              <div
                onClick={() => fileInputRef.current.click()}
                className="border-2 border-dashed border-slate-200 hover:border-sky-300 rounded-2xl p-6 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all hover:bg-sky-50/30 min-h-36"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-xl">
                  🖼️
                </div>
                <p className="text-xs text-slate-400 text-center">
                  Click to upload images
                </p>
                <p className="text-xs text-slate-300">PNG, JPG up to 10MB</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>

              {previews.length > 0 && (
                <div className="grid grid-cols-3 gap-2">
                  {previews.map((src, index) => (
                    <div key={index} className="relative group aspect-square">
                      <img
                        src={src}
                        alt={`preview-${index}`}
                        className="w-full h-full object-cover rounded-xl border border-slate-100"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Modal footer */}
          <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-end gap-3 shrink-0">
            <button
              type="button"
              onClick={handleReset}
              className="text-sm px-5 py-2 rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-100 transition-all"
            >
              Reset
            </button>
            <button
              type="submit"
              className="text-sm px-6 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium transition-all shadow-sm"
            >
              Create Asset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AssetFormModal;
