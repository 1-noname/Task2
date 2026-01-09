import { FilterCategory } from "@/features/filterCategory";

import cls from "./ProductsFilter.module.scss";

export const ProductsFilter = () => {
  return (
    <div className={cls.filter}>
      <FilterCategory />
    </div>
  );
};
