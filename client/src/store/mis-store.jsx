import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { listDepartments } from "../apis/departments";
import { client } from "../apis/api";
import { login } from "../apis/auth";
import { addCategory, getListCategories } from "../apis/categories";
const misStore = (set) => ({
  user: null,
  token: null,
  departments: [],
  categories: [],
  headerName: "",
  setHeaderName: (name) => set({ headerName: name }),
  logout: () => {
    localStorage.removeItem("mis-store");
    set({
      user: null,
      token: null,
      departments: null,
    });
  },
  actionRegister: async (form) => {
    try {
      const res = await client.post("/user", form);
      return res;
    } catch (err) {
      console.log(err);
    }
  },
  actionLogin: async (form) => {
    const res = await login(form);
    set({
      user: res.data?.user || null,
      token: res.data?.token || null,
    });
    return res;
  },
  getDepartments: async () => {
    try {
      const res = await listDepartments();
      console.log(res.data.departments);
      set({
        departments: res.data.departments || [],
      });
    } catch (err) {
      console.log(err);
    }
  },
  createCategory: async (token, form) => {
    const res = await addCategory(token, form);
    return res;
  },
  getCategories: async (token) => {
    const res = await getListCategories(token);
    set({
      categories: res.data.categories || [],
    });
    return res;
  },
});
const usePersist = {
  name: "mis-store",
  storage: createJSONStorage(() => localStorage),
};

const useMisStore = create(persist(misStore, usePersist));
export default useMisStore;
