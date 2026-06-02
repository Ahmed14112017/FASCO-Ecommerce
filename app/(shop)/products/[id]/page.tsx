import { getProductByid } from "@/features/products/services/products";
import ProductCard from "@/app/(shop)/products/[id]/ProductCard";

export default async function ProductDetailspage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  console.log(id);
  const data = await getProductByid(id);
  return <ProductCard product={data} />;
}
