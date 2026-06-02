import api from "../../../lib/axios";

export const getProfile = async () => {
  const res = await api.get("/users/profile");
  return res.data;
};

export const updateProfile = async (data: FormData) => {
  const res = await api.put("/users/profile", data);
  return res.data;
};

export const changePassword = async (data: {
  currentPassword: string;
  newPassword: string;
}) => {
  const res = await api.put("/users/change-password", data);
  return res.data;
};

export const addAddress = async (data: {
  label: string;
  street: string;
  city: string;
  country: string;
  phone: string;
}) => {
  const res = await api.post("/users/addresses", data);
  return res.data;
};

export const deleteAddress = async (addressId: string) => {
  const res = await api.delete(`/users/addresses/${addressId}`);
  return res.data;
};
