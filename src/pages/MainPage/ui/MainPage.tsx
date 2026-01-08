import { SearchProduct } from "@/features/searchProduct/ui/SearchProduct";
import { ProductsList } from "@/widgets/productsList";

export const MainPage = () => {
  return (
    <div>
      <SearchProduct isOpen={false} />
      <ProductsList />
    </div>
  );
};
