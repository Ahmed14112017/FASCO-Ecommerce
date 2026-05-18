import { z } from "zod";

export const productschema = z.object({
  name: z.string().min(3, "name must be at least 3 characters"),
  price: z.number().min(0, "Price must be a positive number"),
  stock: z.number().min(0, "Stock must be a positive number"),
  category: z.string().min(1, "Category is required"),
  image: z.instanceof(File).optional(),
  rating: z.number().min(0).max(5).optional(),
});

export type ProductFormData = z.infer<typeof productschema>;
