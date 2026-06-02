"use client";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/Hooks";
import { clearCart } from "../cart/cartSlice/cartslice";
import {
  syncCartWithBackend,
  createOrder,
  clearBackendCart,
} from "@/app/(shop)/cart/services/cartApi";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { initiatePaymobCheckout } from "@/app/(shop)/cart/services/cartApi";

export default function CheckoutPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const items = useAppSelector((state) => state.cart.items);
  const [loading, setLoading] = useState(false);

  const subtotal = items.reduce(
    (acc, item) => acc + (item.price ?? 0) * (item.quantity ?? 1),
    0,
  );
  const shipping = subtotal >= 150 ? 0 : 10;
  const total = subtotal + shipping;

  async function handlePlaceOrder() {
    if (items.length === 0) return;
    setLoading(true);
    try {
      // 1. clear backend cart أولاً
      await clearBackendCart();

      // 2. sync cart الجديد
      await syncCartWithBackend(
        items.map((item) => ({
          productId: item._id!,
          quantity: item.quantity ?? 1,
        })),
      );

      // 3. create order
      const order = await createOrder();

      // 4. initiate paymob checkout
      const { url } = await initiatePaymobCheckout(order._id);

      // 5. clear redux cart
      dispatch(clearCart());

      // 6. redirect to paymob
      window.location.href = url;
    } catch (err) {
      toast.error("Something went wrong, please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-bold mb-8">Checkout</h1>

      {items.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-lg">Your cart is empty</p>
          <button
            onClick={() => router.push("/products")}
            className="mt-4 px-6 py-2 bg-black text-white rounded-lg text-sm"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Items */}
          <div className="md:col-span-2 flex flex-col gap-4">
            {items.map((item) => (
              <div
                key={item._id}
                className="flex gap-4 border rounded-xl p-4 items-center"
              >
                <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0">
                  <Image
                    src={item.images?.[0] || "/images/image-not-found.png"}
                    alt={item.name ?? ""}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">${item.price}</p>
                  <p className="text-sm text-gray-400">Qty: {item.quantity}</p>
                </div>
                <p className="font-semibold">
                  ${((item.price ?? 0) * (item.quantity ?? 1)).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="border rounded-xl p-6 h-fit flex flex-col gap-4">
            <h2 className="font-semibold text-lg">Order Summary</h2>

            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Shipping</span>
              <span>{shipping === 0 ? "Free" : `$${shipping}`}</span>
            </div>

            <div className="flex justify-between font-semibold border-t pt-4">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={loading}
              className="w-full py-3 bg-black text-white rounded-lg hover:opacity-80 transition-opacity disabled:opacity-50"
            >
              {loading ? "Placing Order..." : "Place Order"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
