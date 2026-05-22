"use client";
import { useForm } from "react-hook-form";
import { Productprops } from "../types/products";
import Input from "@/app/components/ui/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductFormData, productschema } from "../schema/productschema";
import Button from "@/app/components/ui/Button";
import { useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { updateproduct } from "../services/products";
import { useCategory } from "@/lib/hooks/usegategory";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function ProductEditForm({
  data,
  close,
}: {
  data: Productprops;
  close: () => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productschema),
    defaultValues: {
      name: data.name,
      description: data.description,
      price: data.price,
      stock: data.stock,
      category: data.category?._id ?? "",
      rating: data.rating,
    },
  });
  const [imageFile, setImageFile] = useState<File | undefined>(undefined);
  console.log(data);
  const ref = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const handleButtonClick = () => {
    ref.current?.click();
  };

  /* get catergory */
  const { data: catergry } = useCategory();
  /* update catergory */
  const mutation = useMutation({
    mutationFn: ({
      id,
      updatedate,
    }: {
      id: string;
      updatedate: ProductFormData;
    }) => updateproduct(id, updatedate),
    onSuccess: () => {
      toast.success("Product updated successfully");
      router.refresh();
      close();
    },
  });

  return (
    <div>
      <h2>Edit Product</h2>
      <form
        onSubmit={handleSubmit((formdata) => {
          mutation.mutate({
            id: data._id!,
            updatedate: { ...formdata, image: imageFile },
          });
        })}
        className="w-full flex flex-col  gap-1"
      >
        <div className="flex items-center">
          <label htmlFor="name">name</label>
          <Input
            className="w-full"
            id="name"
            placeholder="name"
            {...register("name")}
          />
        </div>
        {errors.name && (
          <span className="text-xs text-red-500">{errors.name.message}</span>
        )}
        <div className="flex items-center">
          <label htmlFor="description">description</label>
          <textarea
            {...register("description")}
            placeholder="Product description"
            className="w-full"
          />
        </div>
        {errors.description && (
          <span className="text-xs text-red-500">
            {errors.description.message}
          </span>
        )}
        <div className="flex items-center">
          <label htmlFor="price">price</label>

          <Input
            id="price"
            placeholder="price"
            {...register("price", { valueAsNumber: true })}
            className="w-full"
          />
        </div>
        {errors.price && (
          <span className="text-xs text-red-500">{errors.price.message}</span>
        )}
        <div className="flex  items-center">
          <label htmlFor="stock">stock</label>
          <Input
            id="stock"
            placeholder="stock"
            {...register("stock", { valueAsNumber: true })}
            className="w-full"
          />
        </div>
        {errors.stock && (
          <span className="text-xs text-red-500">{errors.stock.message}</span>
        )}
        <div className="flex  items-center">
          <label htmlFor="category">category</label>
          <select
            {...register("category")}
            className="w-full border-b text-sm outline-none border-gray-400"
          >
            <option value="">Select category</option>
            {catergry?.map((cat) => {
              return <option value={cat._id}>{cat.name}</option>;
            })}
          </select>
        </div>
        {errors.category && (
          <span className="text-xs text-red-500">
            {errors.category.message}
          </span>
        )}
        <div className="flex  items-center">
          <label htmlFor="rating">rating</label>
          <Input
            id="rating"
            placeholder="rating"
            {...register("rating", { valueAsNumber: true })}
            className="w-full"
          />
        </div>
        {errors.rating && (
          <span className="text-xs text-red-500">{errors.rating.message}</span>
        )}
        <div className="flex  items-center">
          <label htmlFor="images">images</label>
          <Input
            type="file"
            accept="image/*"
            id="image"
            className="hidden"
            ref={ref}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) setImageFile(file);
            }}
          />
          <Button
            type="button"
            className="py-2 px-4 rounded-md"
            onClick={handleButtonClick}
          >
            Choose Image
          </Button>
        </div>
        <div className="w-full flex items-center justify-center">
          <Button
            type="submit"
            className="py-2 px-4 rounded-md w-full bg-gray-300"
            variant="secondary"
          >
            save
          </Button>
        </div>
      </form>
    </div>
  );
}
