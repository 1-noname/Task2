import { useState } from "react";

import { SearchProduct } from "@/features/searchProduct/ui/SearchProduct";
import { ProductsFilter } from "@/widgets/productsFilter";
import { ProductsList } from "@/widgets/productsList";

import cls from "./MainPage.module.scss";

export const MainPage = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(true);

  const handleFilterOpen = () => {
    setIsFilterOpen((prev) => !prev);
  };

  return (
    <>
      <div>
        <SearchProduct
          isFilterOpen={isFilterOpen}
          onToggle={handleFilterOpen}
        />
      </div>
      <div
        className={`${cls.content} ${isFilterOpen ? cls.withFilter : cls.noFilter}`}
      >
        <ProductsList />
        {isFilterOpen && <ProductsFilter />}
      </div>
    </>
  );
};
