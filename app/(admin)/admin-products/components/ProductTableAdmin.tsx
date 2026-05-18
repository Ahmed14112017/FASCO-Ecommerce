"use client";
import Button from "@/app/components/ui/Button";
import Model from "@/app/components/ui/model/Model";
import { Productprops } from "@/app/(admin)/admin-products/types/products";
import { Eye, Pencil, Trash } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import ProductViewModel from "./ProductViewModel";
import ProductEditForm from "./ProductEditForm";
import ProductDeleteConfirm from "./ProductDeleteConfirm";
import ProductAddModel from "./ProductAddModel";
const items = [
  "name",
  "price",
  "images",
  "category",
  "stock",
  "rating",
  "action",
];
export default function ProductGridAdmin({
  productdata,
}: {
  productdata: Productprops[];
}) {
  const [openModel, setopemModel] = useState(false);
  const [selectid, setselectid] = useState("");
  const [selectitem, setselectitem] = useState<Productprops | null>(null);
  const [typeaction, settypeaction] = useState("");
  const openmodelfun = (type: string, id?: string, data?: Productprops) => {
    setopemModel(true);
    settypeaction(type);
    if (id) {
      setselectid(id);
    }

    if (data) {
      setselectitem(data);
    }
  };
  const closemodelfun = () => {
    setopemModel(false);
  };
  return (
    <>
      <div className="flex justify-between items-center py-6">
        <h3>Products</h3>
        <Button
          onClick={() => openmodelfun("Add")}
          variant="primary"
          className="py-3 px-5 rounded-md"
        >
          Add Product
        </Button>
      </div>
      <table className="w-full">
        <thead>
          <tr>
            {items.map((ele) => {
              return (
                <th className="p-3 border-b capitalize" key={ele}>
                  {ele}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className="text-center">
          {productdata?.map((pro) => {
            return (
              <tr className="border-b border-gray-400" key={pro._id}>
                <td className="p-3 ">{pro.name}</td>

                <td className="p-3 ">{pro.price}</td>

                <td className="p-3 ">
                  <div className="flex justify-center">
                    {" "}
                    {pro.images[0] ? (
                      <Image
                        src={pro.images[0]}
                        width={70}
                        height={70}
                        alt={pro.name}
                        className="rounded-md object-cover"
                      />
                    ) : (
                      <Image
                        src={"/images/image-not-found.png"}
                        width={100}
                        height={100}
                        alt={pro.name}
                        className="rounded-md object-cover"
                      />
                    )}
                  </div>
                </td>

                <td>{pro.category?.name}</td>

                <td className="p-3 ">{pro.stock}</td>

                <td className="p-3 ">{pro.rating}</td>
                <td className="p-3 ">
                  <Button onClick={() => openmodelfun("view", pro._id)}>
                    <Eye className="bg-white text-black" size={20} />
                  </Button>
                  <Button onClick={() => openmodelfun("Edit", "", pro)}>
                    <Pencil className="bg-white text-black" size={20} />
                  </Button>
                  <Button onClick={() => openmodelfun("Delete", pro._id)}>
                    <Trash className="bg-white text-black" size={20} />
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Model open={openModel} onClose={closemodelfun}>
        {typeaction === "view" ? (
          <ProductViewModel id={selectid} />
        ) : typeaction === "Edit" ? (
          selectitem && (
            <ProductEditForm close={closemodelfun} data={selectitem} />
          )
        ) : typeaction === "Add" ? (
          <ProductAddModel close={closemodelfun} />
        ) : (
          <ProductDeleteConfirm />
        )}
      </Model>
    </>
  );
}
