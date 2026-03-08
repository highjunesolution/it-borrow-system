import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { listDepartments } from "../apis/departments";
import { client } from "../apis/api";
import { login } from "../apis/auth";
const misStore = (set) => ({
  user: null,
  token: null,
  departments: [],
  logout: () => {
    localStorage.removeItem("mis-store")
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
      user: res.data.user,
      token: res.data.token,
    });
    return res;
  },
  getDepartments: async () => {
    try {
      const res = await listDepartments();
      console.log(res.data.departments);
      set({
        departments: res.data.departments,
      });
    } catch (err) {
      console.log(err);
    }
  },
});
const usePersist = {
  name: "mis-store",
  storage: createJSONStorage(() => localStorage),
};

const useMisStore = create(persist(misStore, usePersist));
export default useMisStore;
