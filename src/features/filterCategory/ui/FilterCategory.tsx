import { CategorySelect } from "@/entities/category";

import { useFilterCategory } from "../model/hooks/useFilterCategory";

export const FilterCategory = () => {
  const { selectedCategory, categories, handleCategoryChange, isLoading } =
    useFilterCategory();

  return (
    <div>
      <CategorySelect
        categories={categories}
        selected={selectedCategory}
        onChange={handleCategoryChange}
        isLoading={isLoading}
      />
    </div>
  );
};
