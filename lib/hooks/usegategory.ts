import { useQuery } from "@tanstack/react-query";
import { GetGategory } from "../../app/(admin)/categories/services/categories";

export const useCategory = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: GetGategory,
  });
};
