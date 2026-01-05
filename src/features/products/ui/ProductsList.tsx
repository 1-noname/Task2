import { ProductCard } from "@/entities/product";
import { PageLoader } from "@/shared/ui/PageLoader";

import { useGetProductsQuery } from "../api/productsApi";

export const ProductsList = () => {
  const { data, isLoading, isError } = useGetProductsQuery({
    limit: 6,
    skip: 0,
  });

  if (isLoading) {
    return <PageLoader />;
  }

  if (isError) {
    return <div>:(</div>;
  }

  return (
    <div>
      {console.log("current data: ", data)}
      {data?.products.map(({ id, title, description, category }) => (
        <ProductCard
          key={id}
          id={id}
          title={title}
          description={description}
          category={category}
        />
      ))}
    </div>
  );
};
