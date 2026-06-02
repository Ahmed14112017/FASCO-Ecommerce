"use client";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/Hooks";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} from "@/app/(shop)/cart/cartSlice/cartslice";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function MiniCart({ onClose }: { onClose: () => void }) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const items = useAppSelector((state) => state.cart.items);

  const subtotal = items.reduce(
    (acc, item) => acc + (item.price ?? 0) * (item.quantity ?? 1),
    0,
  );

  return (
    <div className="absolute right-0 top-12 w-96 bg-white border border-gray-200 rounded-xl shadow-xl z-50 p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-lg">Shopping Cart</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-black">
          ✕
        </button>
      </div>

      {/* Free shipping notice */}
      {subtotal < 150 && (
        <p className="text-xs text-gray-500 mb-3">
          Buy{" "}
          <span className="font-semibold">${(150 - subtotal).toFixed(2)}</span>{" "}
          more and get{" "}
          <span className="text-black font-semibold">Free Shipping</span>
        </p>
      )}

      {/* Items */}
      {items.length === 0 ? (
        <p className="text-sm text-gray-400 text-center py-8">
          Your cart is empty
        </p>
      ) : (
        <div className="flex flex-col gap-3 max-h-64 overflow-y-auto">
          {items.map((item) => (
            <div key={item._id} className="flex gap-3 items-center">
              <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0">
                <Image
                  src={item.images?.[0] || "/images/image-not-found.png"}
                  alt={item.name || "product image"}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium truncate">{item.name}</p>
                <p className="text-sm text-gray-500">${item.price}</p>
                <div className="flex items-center gap-2 mt-1">
                  <button
                    onClick={() => dispatch(decreaseQuantity(item._id!))}
                    className="w-6 h-6 border rounded text-sm flex items-center justify-center hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="text-sm">{item.quantity}</span>
                  <button
                    onClick={() => dispatch(increaseQuantity(item._id!))}
                    className="w-6 h-6 border rounded text-sm flex items-center justify-center hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                onClick={() => dispatch(removeFromCart(item._id!))}
                className="text-gray-300 hover:text-red-400 text-lg"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Subtotal */}
      {items.length > 0 && (
        <>
          <div className="flex justify-between items-center mt-4 pt-4 border-t">
            <span className="text-sm font-medium">Subtotal</span>
            <span className="font-semibold">${subtotal.toFixed(2)}</span>
          </div>
          <button
            onClick={() => {
              router.push("/checkout");
              onClose();
            }}
            className="w-full py-2.5 bg-black text-white rounded-lg mt-3 text-sm hover:opacity-80"
          >
            Checkout
          </button>
          <button
            onClick={() => {
              router.push("/cart");
              onClose();
            }}
            className="w-full py-2 text-sm text-gray-500 hover:text-black mt-1"
          >
            View Cart
          </button>
        </>
      )}
    </div>
  );
}
