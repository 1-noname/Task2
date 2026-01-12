import { useGetCategoriesQuery } from "@/entities/product";
import { useAppDispatch, useAppSelector } from "@/shared/lib";

import { selectCategory, setCategory } from "../slice/categorySlice";

export const useFilterCategory = () => {
  const dispatch = useAppDispatch();
  const selectedCategory = useAppSelector(selectCategory);

  const { data: categories = [], isLoading } = useGetCategoriesQuery();

  const handleCategoryChange = (newValue: string | null) => {
    console.log(newValue);
    dispatch(setCategory(newValue));
  };

  return {
    selectedCategory,
    categories,
    handleCategoryChange,
    isLoading,
  };
};
