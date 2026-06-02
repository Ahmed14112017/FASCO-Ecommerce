import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector, useStore } from "react-redux";
import type { RootState, AppDispatch, AppStore } from "../store";
import { GetGategory } from "../../features/categories/services/categories";

export const useCategory = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: GetGategory,
  });
};

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();
