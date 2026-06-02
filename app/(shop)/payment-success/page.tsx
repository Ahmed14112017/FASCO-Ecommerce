"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function PaymentSuccessPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/orders");
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center flex flex-col items-center gap-6">
        {/* Icon */}
        <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center">
          <span className="text-5xl">✓</span>
        </div>

        {/* Text */}
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Payment Successful!
          </h1>
          <p className="text-gray-500 text-sm">
            Your order has been placed successfully.
          </p>
          <p className="text-gray-400 text-xs mt-1">
            Redirecting to your orders in 5 seconds...
          </p>
        </div>

        {/* Button */}
        <button
          onClick={() => router.push("/orders")}
          className="px-8 py-3 bg-black text-white rounded-lg hover:opacity-80 transition-opacity"
        >
          View Orders
        </button>
      </div>
    </div>
  );
}
