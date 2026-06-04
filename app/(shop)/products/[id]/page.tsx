import { getProductByid } from "@/features/products/services/products";
import ProductCard from "@/app/(shop)/products/[id]/ProductCard";
import ProductReviews from "./_components/ProductReviews";

export default async function ProductDetailspage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  console.log(id);
  const data = await getProductByid(id);
  return (
    <div>
      <ProductCard product={data} />
      <div className="max-w-4xl mx-auto px-6">
        <ProductReviews productId={id} />
      </div>
    </div>
  );
}
