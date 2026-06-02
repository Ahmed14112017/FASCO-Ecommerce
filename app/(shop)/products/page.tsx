"use client";
import { useState } from "react";
import FilterProduct, {
  Filters,
} from "@/app/(shop)/products/components/FilterProduct";
import ProductsList from "@/app/(shop)/products/components/ProductsList";

const defaultFilters: Filters = {
  sizes: [],
  colors: [],
  category: "All",
  minPrice: 0,
  maxPrice: 1000,
};

export default function ProductsPage() {
  const [filters, setFilters] = useState<Filters>(defaultFilters);

  return (
    <div className="container mx-auto px-6 py-12 flex gap-8">
      <FilterProduct onFilterChange={setFilters} />
      <ProductsList filters={filters} />
    </div>
  );
}
