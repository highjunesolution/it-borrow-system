import { client } from "./api";

export const addCategory = async (token, form) => {
  return await client.post("/category", form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getListCategories = async (token) => {
  return await client.get("/categories", {
    headers: {
      Authorization: `Bearer ${token}`
    },
  });
};

export const updateCategory = async (token, id, form) => {
  return await client.put(`/category/${id}`, form, {
    headers: {
      Authorization : `Bearer ${token}`
    }
  })
}

export const deleteCategory = async (token, id) => {
  return await client.delete(`/category/dis/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}