import api from "@/lib/axios";

export const getAllOrders = async () => {
  const res = await api.get("/orders");
  return res.data;
};

export const updateOrderStatus = async (id: string, status: string) => {
  const res = await api.put(`/orders/${id}`, { status });
  return res.data;
};
