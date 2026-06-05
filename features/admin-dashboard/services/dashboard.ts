import api from "@/lib/axios";

export const getDashboardStats = async () => {
  const [ordersRes, usersRes, productsRes] = await Promise.all([
    api.get("/orders"),
    api.get("/users"),
    api.get("/products"),
  ]);

  const orders = ordersRes.data;
  const users = usersRes.data;
  const products = productsRes.data.products;

  const totalRevenue = orders.reduce(
    (acc: number, order: any) => acc + (order.totalPrice || 0),
    0,
  );

  const recentOrders = orders.slice(0, 5);

  // Revenue by month
  const revenueByMonth: Record<string, number> = {};
  orders.forEach((order: any) => {
    const month = new Date(order.createdAt).toLocaleString("default", {
      month: "short",
    });
    revenueByMonth[month] = (revenueByMonth[month] || 0) + order.totalPrice;
  });

  return {
    totalRevenue,
    totalOrders: orders.length,
    totalUsers: users.length,
    totalProducts: products.length,
    recentOrders,
    revenueByMonth,
  };
};
