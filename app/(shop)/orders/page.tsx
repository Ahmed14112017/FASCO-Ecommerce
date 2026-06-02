"use client";
import { useEffect, useState } from "react";
import { getMyOrders } from "@/app/(shop)/cart/services/cartApi";
import { useRouter } from "next/navigation";

interface OrderItem {
  product: {
    _id: string;
    name: string;
    price: number;
    images: string[];
  };
  quantity: number;
  price: number;
}

interface Order {
  _id: string;
  items: OrderItem[];
  totalPrice: number;
  status: string;
  paymentStatus: string;
  createdAt: string;
}

const statusSteps = ["pending", "paid", "shipped", "delivered"];

function OrderTracking({ status }: { status: string }) {
  const currentIndex = statusSteps.indexOf(status);

  return (
    <div className="mt-4 mb-2">
      <div className="flex items-center justify-between relative">
        {/* Progress line */}
        <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200 z-0">
          <div
            className="h-full bg-black transition-all duration-500"
            style={{
              width: `${(currentIndex / (statusSteps.length - 1)) * 100}%`,
            }}
          />
        </div>

        {statusSteps.map((step, i) => (
          <div key={step} className="flex flex-col items-center z-10">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium border-2 transition-colors ${
                i <= currentIndex
                  ? "bg-black border-black text-white"
                  : "bg-white border-gray-300 text-gray-400"
              }`}
            >
              {i < currentIndex ? "✓" : i + 1}
            </div>
            <p
              className={`text-xs mt-1 capitalize ${i <= currentIndex ? "text-black font-medium" : "text-gray-400"}`}
            >
              {step}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchOrders() {
      try {
        const data = await getMyOrders();
        setOrders(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-60 text-gray-400">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-bold mb-8">My Orders</h1>

      {orders.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-lg">No orders yet</p>
          <button
            onClick={() => router.push("/products")}
            className="mt-4 px-6 py-2 bg-black text-white rounded-lg text-sm"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {orders.map((order) => (
            <div key={order._id} className="border rounded-xl p-6">
              {/* Order Header */}
              <div className="flex justify-between items-center mb-2">
                <div>
                  <p className="text-xs text-gray-400">Order ID</p>
                  <p className="text-sm font-medium">{order._id}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    order.paymentStatus === "paid"
                      ? "bg-green-100 text-green-600"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {order.paymentStatus}
                </span>
              </div>

              {/* Tracking */}
              <OrderTracking status={order.status} />

              {/* Items */}
              <div className="flex flex-col gap-3 mt-4">
                {order.items.map((item, i) => (
                  <div key={i} className="flex gap-3 items-center">
                    <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-gray-100">
                      {item.product?.images?.[0] && (
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">
                        {item.product?.name}
                      </p>
                      <p className="text-xs text-gray-400">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="text-sm font-semibold">${item.price}</p>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="flex justify-between items-center mt-4 pt-4 border-t">
                <p className="text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
                <p className="font-semibold">Total: ${order.totalPrice}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
