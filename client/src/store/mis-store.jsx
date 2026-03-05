import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { listDepartments } from "../apis/departments";
import { client } from "../apis/api";
const misStore = (set) => ({
  user: null,
  token: null,
  departments: [],
  actionRegister: async (form) => {
    try {
      const res = await client.post('/user', form);
      return res;
    } catch (err) {
      console.log(err);
    }
  },
  getDepartments: async () => {
    try {
        const res = await listDepartments();
        console.log(res.data.departments);
        set({
            departments: res.data.departments
        })
    } catch (err) {
        console.log(err)
    }
  }
});
const usePersist = {
  name: "mis-store",
  storage: createJSONStorage(() => localStorage),
};

const useMisStore = create(persist(misStore, usePersist));
export default useMisStore;
