import api from "@/lib/axios";

export const getProductReviews = async (productId: string) => {
  const res = await api.get(`/reviews/${productId}`);
  return res.data;
};

export const addReview = async (data: {
  productId: string;
  rating: number;
  comment: string;
}) => {
  const res = await api.post("/reviews", data);
  return res.data;
};

export const deleteReview = async (id: string) => {
  const res = await api.delete(`/reviews/${id}`);
  return res.data;
};
