"use client";
import { useEffect, useState } from "react";
import {
  getAllOrders,
  updateOrderStatus,
} from "../../../features/admin-orders/services/orders";
import { toast } from "react-toastify";

interface OrderItem {
  product: { name: string; images: string[] };
  quantity: number;
  price: number;
}

interface Order {
  _id: string;
  user: { name: string; email: string };
  items: OrderItem[];
  totalPrice: number;
  status: string;
  paymentStatus: string;
  createdAt: string;
}

const statusOptions = ["pending", "paid", "shipped", "delivered"];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;

  const totalPages = Math.ceil(orders.length / ordersPerPage);
  const paginatedOrders = orders.slice(
    (currentPage - 1) * ordersPerPage,
    currentPage * ordersPerPage,
  );

  useEffect(() => {
    async function fetchOrders() {
      try {
        const data = await getAllOrders();
        setOrders(data);
      } catch {
        toast.error("Error fetching orders");
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, []);

  async function handleStatusChange(id: string, status: string) {
    try {
      await updateOrderStatus(id, status);
      setOrders((prev) =>
        prev.map((o) => (o._id === id ? { ...o, status } : o)),
      );
      toast.success("Status updated!");
    } catch {
      toast.error("Error updating status");
    }
  }

  if (loading)
    return (
      <div className="flex items-center justify-center h-60 text-gray-400">
        Loading...
      </div>
    );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Orders</h1>

      <div className="border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left p-4 font-medium text-gray-500">
                Order ID
              </th>
              <th className="text-left p-4 font-medium text-gray-500">
                Customer
              </th>
              <th className="text-left p-4 font-medium text-gray-500">Items</th>
              <th className="text-left p-4 font-medium text-gray-500">Total</th>
              <th className="text-left p-4 font-medium text-gray-500">
                Payment
              </th>
              <th className="text-left p-4 font-medium text-gray-500">
                Status
              </th>
              <th className="text-left p-4 font-medium text-gray-500">Date</th>
            </tr>
          </thead>
          <tbody>
            {paginatedOrders.map((order) => (
              <tr key={order._id} className="border-b hover:bg-gray-50">
                <td className="p-4 text-xs text-gray-400">
                  {order._id.slice(-8)}
                </td>
                <td className="p-4">
                  <p className="font-medium">{order.user?.name}</p>
                  <p className="text-xs text-gray-400">{order.user?.email}</p>
                </td>
                <td className="p-4 text-gray-500">
                  {order.items.length} items
                </td>
                <td className="p-4 font-semibold">${order.totalPrice}</td>
                <td className="p-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      order.paymentStatus === "paid"
                        ? "bg-green-100 text-green-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {order.paymentStatus}
                  </span>
                </td>
                <td className="p-4">
                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(order._id, e.target.value)
                    }
                    className="border rounded-lg px-2 py-1 text-xs"
                  >
                    {statusOptions.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="p-4 text-gray-400 text-xs">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded-lg text-sm disabled:opacity-40"
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 border rounded-lg text-sm ${
                currentPage === i + 1 ? "bg-black text-white" : ""
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded-lg text-sm disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
