import { ProductCard } from "@/entities/product";
import { PageLoader } from "@/shared/ui/PageLoader";

import { useProductsList } from "../model/hooks/useProductsList";

export const ProductsList = () => {
  const { products, isLoading, isError, trigger } = useProductsList();

  if (isLoading) {
    return <PageLoader />;
  }

  if (isError) {
    return <div>:(</div>;
  }

  return (
    <div>
      {products.map(({ id, title, description, category }) => (
        <ProductCard
          key={id}
          id={id}
          title={title}
          description={description}
          category={category}
        />
      ))}
      <div ref={trigger}></div>
    </div>
  );
};
