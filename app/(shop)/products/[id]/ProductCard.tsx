"use client";
import { Productprops } from "@/features/products/types/products";
import { addToCart } from "@/app/(shop)/cart/cartSlice/cartslice";
import { useAppDispatch } from "@/lib/hooks/Hooks";
import Image from "next/image";
import { toast } from "react-toastify";

export default function ProductCard({ product }: { product: Productprops }) {
  const dispatch = useAppDispatch();
  return (
    <div className="container mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Image */}
        <div className="relative w-full h-125 rounded-xl overflow-hidden">
          <Image
            src={product.images?.[0] || "/images/image-not-found.png"}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>

        {/* Details */}
        <div className="flex flex-col gap-4 justify-center">
          {/* Category */}
          <p className="text-sm text-gray-400 uppercase tracking-widest">
            {product.category?.name}
          </p>

          {/* Name */}
          <h1 className="text-3xl font-bold text-black">{product.name}</h1>

          {/* Rating */}
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

          {/* Price */}
          <p className="text-2xl font-semibold">${product.price}</p>

          {/* Description */}
          <p className="text-gray-500 text-sm leading-relaxed">
            {product.description}
          </p>

          {/* Stock */}
          <p className="text-sm text-gray-400">
            Stock:{" "}
            <span className="text-black font-medium">{product.stock}</span>
          </p>

          {/* Add to Cart */}
          <button
            onClick={() => {
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
