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
      <h2>View Product</h2>
      <form
        onSubmit={handleSubmit((formdata) => {
          mutation.mutate({
            id: data._id!,
            updatedate: { ...formdata, image: imageFile },
          });
        })}
      >
        <div>
          <label htmlFor="name">name</label>
          <Input id="name" placeholder="name" {...register("name")} />
          {errors.name && <span>{errors.name.message}</span>}
        </div>
        <div>
          <label htmlFor="price">price</label>

          <Input
            id="price"
            placeholder="price"
            {...register("price", { valueAsNumber: true })}
          />
          {errors.price && <span>{errors.price.message}</span>}
        </div>
        <div>
          <label htmlFor="stock">stock</label>
          <Input
            id="stock"
            placeholder="stock"
            {...register("stock", { valueAsNumber: true })}
          />
          {errors.stock && <span>{errors.stock.message}</span>}
        </div>
        <div>
          <label htmlFor="category">category</label>
          <select {...register("category")}>
            <option value="">Select category</option>
            {catergry?.map((cat) => {
              return <option value={cat._id}>{cat.name}</option>;
            })}
          </select>
          {errors.category && <span>{errors.category.message}</span>}
        </div>
        <div>
          <label htmlFor="rating">rating</label>
          <Input
            id="rating"
            placeholder="rating"
            {...register("rating", { valueAsNumber: true })}
          />
          {errors.rating && <span>{errors.rating.message}</span>}
        </div>
        <div className="flex gap-2 py-2">
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
        <Button type="submit" variant="secondary">
          save
        </Button>
      </form>
    </div>
  );
}
