import { client } from "./api";

export const register = async (form) => {
  return await client.post("/user", form);
};
