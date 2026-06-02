import ProductGridAdmin from "./component/ProductTableAdmin";
import { getProduct } from "@/features/products/services/products";
import Pagination from "@/app/components/pagination/Pagination";

export default async function AdminProductpage({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) {
  const { page } = await searchParams;
  const currentpage = Number(page) || 1;
  const res = await getProduct(currentpage);
  const { products, total } = res;
  console.log(products);
  return (
    <>
      <ProductGridAdmin productdata={products} />
      <Pagination total={total} currentPage={currentpage} />
    </>
  );
}
