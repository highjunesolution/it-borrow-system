import { client } from "./api";

export const login = async (form) => {
  return await client.post("/login", form);
};

export const currentUser = async (token) => {
  return await client.get("/current-user",{
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export const currentAdmin = async (token) => {
  return await client.get("/current-admin", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}