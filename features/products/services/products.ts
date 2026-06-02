import api from "../../../lib/axios";
import { ProductFormData } from "../schema/productschema";

export const getProduct = async (page = 1) => {
  const res = await api.get(`/products`, {
    params: {
      page,
      limit: 5,
    },
  });
  return res.data;
};
export const getNewArrivals = async (category?: string) => {
  const res = await api.get("/products", {
    params: {
      limit: 6,
      ...(category ? { category } : {}),
    },
  });
  return res.data;
};
export const getProductByid = async (id: string) => {
  const res = await api.get(`/products/${id}`);
  return res.data;
};

export const Addproducts = async (data: ProductFormData) => {
  const formdata = new FormData();
  formdata.append("name", data.name);
  formdata.append("price", String(data.price));
  formdata.append("stock", String(data.stock));
  formdata.append("category", data.category);
  if (data.rating !== undefined) formdata.append("rating", String(data.rating));
  const file = data.image;
  if (file instanceof File) {
    formdata.append("image", file);
  }
  const res = await api.post("products", formdata);
  return res.data;
};
export const updateproduct = async (
  id: string,
  dataupdata: ProductFormData,
) => {
  const formdata = new FormData();
  formdata.append("name", dataupdata.name);
  formdata.append("price", String(dataupdata.price));

  formdata.append("stock", String(dataupdata.stock));
  formdata.append("category", dataupdata.category);
  if (dataupdata.rating !== undefined) {
    formdata.append("rating", String(dataupdata.rating));
  }
  const file = dataupdata.image;
  if (file instanceof File) {
    formdata.append("image", file);
  }
  const res = await api.put(`/products/${id}`, formdata);
  return res.data;
};

export const deleteproduct = async (id: string) => {
  const res = await api.delete(`/products/${id}`);
  return res;
};

export const getFilteredProducts = async (filters: {
  category?: string;
  colors?: string[];
  sizes?: string[];
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  limit?: number;
  search?: string;
}) => {
  const res = await api.get("/products", {
    params: {
      ...(filters.category && filters.category !== "All"
        ? { category: filters.category }
        : {}),
      ...(filters.colors && filters.colors.length > 0
        ? { colors: filters.colors.join(",") }
        : {}),
      ...(filters.sizes && filters.sizes.length > 0
        ? { sizes: filters.sizes.join(",") }
        : {}),
      ...(filters.minPrice !== undefined && filters.minPrice > 0
        ? { min: filters.minPrice }
        : {}),
      ...(filters.maxPrice !== undefined && filters.maxPrice < 1000
        ? { max: filters.maxPrice }
        : {}),
      ...(filters.search ? { search: filters.search } : {}),
      page: filters.page || 1,
      limit: filters.limit || 12,
    },
  });
  return res.data;
};
