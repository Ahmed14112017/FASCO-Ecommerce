"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import CategoryTabs from "./Categorytab";
import { getNewArrivals } from "@/app/(admin)/admin-products/services/products";
import { Productprops } from "@/app/(admin)/admin-products/types/products";
import ProductGrid from "../user/products/ProductGrid";

export default function NewArrivals() {
  const [selectedCategory, setSelectedCategory] = useState("");

  const { data } = useQuery({
    queryKey: ["newArrivals", selectedCategory],
    queryFn: () => getNewArrivals(selectedCategory),
  });

  return (
    <section className="container  mx-auto px-4 py-8">
      <h2 className="text-center text-2xl font-bold py-4">New Arrivals</h2>
      <CategoryTabs onSelect={setSelectedCategory} />
      <div className="grid grid-cols-3 gap-4 mt-6">
        {data?.products.map((product: Productprops) => (
          <ProductGrid key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
}
