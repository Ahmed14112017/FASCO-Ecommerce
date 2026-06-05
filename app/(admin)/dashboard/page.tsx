"use client";
import { useEffect, useState } from "react";
import { getDashboardStats } from "@/features/admin-dashboard/services/dashboard";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Stats {
  totalRevenue: number;
  totalOrders: number;
  totalUsers: number;
  totalProducts: number;
  recentOrders: any[];
  revenueByMonth: Record<string, number>;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const data = await getDashboardStats();
        setStats(data);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center h-60 text-gray-400">
        Loading...
      </div>
    );

  const chartData = Object.entries(stats?.revenueByMonth || {}).map(
    ([month, revenue]) => ({
      month,
      revenue,
    }),
  );

  return (
    <div className="p-6 flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            label: "Total Revenue",
            value: `$${stats?.totalRevenue.toFixed(2)}`,
            color: "bg-green-50 text-green-600",
          },
          {
            label: "Total Orders",
            value: stats?.totalOrders,
            color: "bg-blue-50 text-blue-600",
          },
          {
            label: "Total Users",
            value: stats?.totalUsers,
            color: "bg-purple-50 text-purple-600",
          },
          {
            label: "Total Products",
            value: stats?.totalProducts,
            color: "bg-yellow-50 text-yellow-600",
          },
        ].map((stat) => (
          <div key={stat.label} className={`rounded-xl p-5 ${stat.color}`}>
            <p className="text-sm font-medium opacity-70">{stat.label}</p>
            <p className="text-2xl font-bold mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Revenue Chart */}
      <div className="border rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">Revenue by Month</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="revenue" fill="#000" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Orders */}
      <div className="border rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
        <table className="w-full text-sm">
          <thead className="border-b">
            <tr>
              <th className="text-left pb-3 font-medium text-gray-500">
                Order ID
              </th>
              <th className="text-left pb-3 font-medium text-gray-500">
                Customer
              </th>
              <th className="text-left pb-3 font-medium text-gray-500">
                Total
              </th>
              <th className="text-left pb-3 font-medium text-gray-500">
                Status
              </th>
              <th className="text-left pb-3 font-medium text-gray-500">Date</th>
            </tr>
          </thead>
          <tbody>
            {stats?.recentOrders.map((order) => (
              <tr key={order._id} className="border-b last:border-0">
                <td className="py-3 text-xs text-gray-400">
                  {order._id.slice(-8)}
                </td>
                <td className="py-3">{order.user?.name}</td>
                <td className="py-3 font-semibold">${order.totalPrice}</td>
                <td className="py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      order.status === "delivered"
                        ? "bg-green-100 text-green-600"
                        : order.status === "shipped"
                          ? "bg-blue-100 text-blue-600"
                          : order.status === "paid"
                            ? "bg-purple-100 text-purple-600"
                            : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="py-3 text-gray-400 text-xs">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
