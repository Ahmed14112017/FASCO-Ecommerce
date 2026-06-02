import api from "@/lib/axios";

export const syncCartWithBackend = async (
  items: { productId: string; quantity: number }[],
) => {
  for (const item of items) {
    await api.post("/cart", {
      productId: item.productId,
      quantity: item.quantity,
    });
  }
};

export const createOrder = async () => {
  const res = await api.post("/orders");
  return res.data;
};

export const getMyOrders = async () => {
  const res = await api.get("/orders/my");
  return res.data;
};
export const initiatePaymobCheckout = async (orderId: string) => {
  const res = await api.post(`/paymob/checkout/${orderId}`);
  return res.data;
};
export const clearBackendCart = async () => {
  const res = await api.delete("/cart/clear");
  return res.data;
};
