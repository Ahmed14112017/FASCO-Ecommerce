import {
  AddCatergoryProps,
  getCatergoryProps,
} from "@/features/categories/types/catergory";
import api from "../../../lib/axios";

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
