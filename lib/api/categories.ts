import { AddCatergoryProps, getCatergoryProps } from "@/types/catergory";
import api from "../axios";
import { useQuery } from "@tanstack/react-query";

export const CreateGategory = async (data: AddCatergoryProps) => {
  const res = await api.post("categories", data);
  return res.data;
};
export const GetGategory = async () => {
  const res = await api.get<getCatergoryProps[]>("categories");
  return res.data;
};

export const DeleteGategory = async (id: string) => {
  const res = await api.delete(`/categories/${id}`);
  return res.data;
};
