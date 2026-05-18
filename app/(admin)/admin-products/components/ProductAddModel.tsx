"use client";
import { useForm } from "react-hook-form";
import { ProductFormData, productschema } from "../schema/productschema";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/app/components/ui/Input";
import { ChangeEvent, useRef, useState } from "react";
import Button from "@/app/components/ui/Button";
import { useCategory } from "@/lib/hooks/usegategory";
import { useMutation } from "@tanstack/react-query";
import { Addproducts } from "../services/products";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function ProductAddModel({ close }: { close: () => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productschema),
  });
  const ref = useRef<HTMLInputElement>(null);
  const handleButtonClick = () => {
    ref.current?.click();
  };
  const router = useRouter();
  const [imageFile, setimageFile] = useState<File | undefined>(undefined);
  const handelimage = (e: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setimageFile(file);
    }
  };
  const { data: categories } = useCategory();

  const addProductMutation = useMutation({
    mutationFn: Addproducts,
    onSuccess: () => {
      toast.success("product is Added successfully");
      router.refresh();
      close();
    },
  });
  return (
    <div>
      <h2>Add Product</h2>
      <form
        onSubmit={handleSubmit((data) => {
          addProductMutation.mutate({ ...data, image: imageFile });
        })}
      >
        <div>
          <label htmlFor="name">name</label>
          <Input id="name" placeholder="name" {...register("name")} />
          {errors.name && (
            <span className="text-xs text-red-500">{errors.name.message}</span>
          )}
        </div>
        <div>
          <label htmlFor="price">price</label>

          <Input
            id="price"
            placeholder="price"
            {...register("price", { valueAsNumber: true })}
          />
          {errors.price && (
            <span className="text-xs text-red-500">{errors.price.message}</span>
          )}
        </div>
        <div>
          <label htmlFor="stock">stock</label>
          <Input
            id="stock"
            placeholder="stock"
            {...register("stock", { valueAsNumber: true })}
          />
          {errors.stock && (
            <span className="text-xs text-red-500">{errors.stock.message}</span>
          )}
        </div>
        <div>
          <label htmlFor="category">category</label>
          <select {...register("category")}>
            <option value="">Select category</option>
            {categories?.map((cat) => {
              return <option value={cat._id}>{cat.name}</option>;
            })}
          </select>
          {errors.category && (
            <span className="text-xs text-red-500">
              {errors.category.message}
            </span>
          )}
        </div>
        <div>
          <label htmlFor="rating">rating</label>
          <Input
            id="rating"
            placeholder="rating"
            {...register("rating", { valueAsNumber: true })}
          />
          {errors.rating && (
            <span className="text-xs text-red-500">
              {errors.rating.message}
            </span>
          )}
        </div>
        <div className="flex gap-2 py-2">
          <label htmlFor="images">images</label>
          <Input
            type="file"
            accept="image/*"
            id="image"
            className="hidden"
            ref={ref}
            onChange={handelimage}
          />
          <Button
            type="button"
            className="py-2 px-4 rounded-md"
            onClick={handleButtonClick}
          >
            Choose Image
          </Button>
        </div>
        <Button type="submit" variant="secondary">
          save
        </Button>
      </form>
    </div>
  );
}
