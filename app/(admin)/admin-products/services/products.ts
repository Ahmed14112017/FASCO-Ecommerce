import { IdCard } from "lucide-react";
import api from "../../../../lib/axios";
import { ProductFormData } from "../schema/productschema";
import { Productprops } from "../types/products";

export const getProduct = async () => {
  const res = await api.get("/products");

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
