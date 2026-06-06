"use client";
import { Productprops } from "@/features/products/types/products";
import { addToCart } from "@/app/(shop)/cart/cartSlice/cartslice";
import { useAppDispatch } from "@/lib/hooks/Hooks";
import Image from "next/image";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function ProductCard({ product }: { product: Productprops }) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const requireAuth = () => {
    const token = Cookies.get("token");
    if (!token) {
      toast.error("Please login first");
      router.push("/login");
      return false;
    }
    return true;
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="relative w-full h-125 rounded-xl overflow-hidden">
          <Image
            src={product.images?.[0] || "/images/image-not-found.png"}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex flex-col gap-4 justify-center">
          <p className="text-sm text-gray-400 uppercase tracking-widest">
            {product.category?.name}
          </p>
          <h1 className="text-3xl font-bold text-black">{product.name}</h1>

          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }, (_, i) => (
              <span
                key={i}
                className={`text-lg ${
                  i < Math.floor(product.rating ?? 0)
                    ? "text-yellow-400"
                    : "text-gray-300"
                }`}
              >
                ★
              </span>
            ))}
          </div>

          <p className="text-2xl font-semibold">${product.price}</p>
          <p className="text-gray-500 text-sm leading-relaxed">
            {product.description}
          </p>
          <p className="text-sm text-gray-400">
            Stock:{" "}
            <span className="text-black font-medium">{product.stock}</span>
          </p>

          <button
            onClick={() => {
              if (!requireAuth()) return;
              dispatch(
                addToCart({
                  _id: product._id,
                  name: product.name,
                  price: product.price,
                  images: [
                    product.images?.[0] || "/images/image-not-found.png",
                  ],
                  quantity: 1,
                }),
              );
              toast.success("Product added to cart!");
            }}
            className="w-full py-3 bg-black text-white rounded-lg hover:opacity-80 transition-opacity"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
