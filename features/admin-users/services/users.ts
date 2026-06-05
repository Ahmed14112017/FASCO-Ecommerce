import api from "@/lib/axios";

export const getAllUsers = async () => {
  const res = await api.get("/users");
  return res.data;
};
