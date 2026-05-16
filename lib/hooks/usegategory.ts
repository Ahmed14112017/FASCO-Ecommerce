import { useQuery } from "@tanstack/react-query";
import { GetGategory } from "../api/categories";

export const useCategory = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: GetGategory,
  });
};
