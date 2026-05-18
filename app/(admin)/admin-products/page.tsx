import React from "react";
import ProductGridAdmin from "./components/ProductTableAdmin";
import { getProduct } from "@/app/(admin)/admin-products/services/products";

export default async function AdminProductpage() {
  const res = await getProduct();
  const { products } = res;
  // const sorted = data.products.reverse();
  return <ProductGridAdmin productdata={products} />;
}
