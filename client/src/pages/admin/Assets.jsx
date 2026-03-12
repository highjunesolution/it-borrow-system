import React, { useEffect, useState } from "react";
import useMisStore from "../../store/mis-store";
import AssetFormModal from "../../components/admin/AssetFormModal";

const Assets = () => {
  const setHeaderName = useMisStore((state) => state.setHeaderName);
  const token = useMisStore((state) => state.token);
  const getCategories = useMisStore((state) => state.getCategories);
  const categories = useMisStore((state) => state.categories);

  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    document.title = "Assets | IT Asshole";
    setHeaderName("Assets");
    getCategories(token);
  }, []);

  return (
    <div className="grid grid-cols-12 gap-4">
      {/* Page title */}
      <div className="col-span-full bg-white py-4 px-6 rounded-xl border border-slate-100 shadow-sm flex items-center justify-between">
        <div>
          <h1 className="text-base font-semibold text-slate-800 tracking-tight">Assets Management</h1>
          <p className="text-xs text-slate-400 mt-0.5">Create and manage IT assets</p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="text-sm px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium transition-all shadow-sm"
        >
          + Create Asset
        </button>
      </div>

      {/* Asset table จะอยู่ตรงนี้ */}

      <AssetFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        token={token}
        categories={categories}
        onSuccess={() => {/* refresh asset table */}}
      />
    </div>
  );
};

export default Assets;