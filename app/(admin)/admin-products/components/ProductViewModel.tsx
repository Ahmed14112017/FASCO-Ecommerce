"use client";
import { getProductByid } from "@/app/(admin)/admin-products/services/products";
import { Productprops } from "@/app/(admin)/admin-products/types/products";
import { useEffect, useState } from "react";

export default function ProductViewModel({ id }: { id: string }) {
  const [data, setData] = useState<Productprops | null>(null);
  const [loading, setloading] = useState(false);
  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        setloading(true);

        const res = await getProductByid(id);
        setData(res);
      } catch (error) {
        console.log(error);
      } finally {
        setloading(false);
      }
    };

    fetchData();
  }, [id]);
  console.log(data);

  return (
    <div>
      <h2>View Product</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        data && (
          <ul>
            <li>name: {data.name}</li>
            <li>price: {data.price}</li>
            <li>rating: {data.rating}</li>
            <li>stock: {data.stock}</li>
          </ul>
        )
      )}
    </div>
  );
}
