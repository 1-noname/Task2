import { selectIsAdmin } from "@/entities/session";
import { AddProduct } from "@/features/addProduct";
import { FilterCategory } from "@/features/filterCategory";
import { useAppSelector } from "@/shared/lib";

import cls from "./ProductsFilter.module.scss";

export const ProductsFilter = () => {
  const isAdmin = useAppSelector(selectIsAdmin);

  return (
    <div className={cls.filter}>
      <FilterCategory />
      {isAdmin && <AddProduct />}
    </div>
  );
};
