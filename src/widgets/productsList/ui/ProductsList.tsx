import { useNavigate } from "react-router-dom";

import { ProductCard } from "@/entities/product";
import { DeleteProduct } from "@/features/deleteProduct";
import { PageLoader } from "@/shared/ui/PageLoader";

import { useLazyDataFetching } from "../model/hooks/useLazyDataFetching";

export const ProductsList = () => {
  const { products, isLoading, isError, trigger } = useLazyDataFetching();
  const navigate = useNavigate();

  const handleNavigate = (id: number) => {
    navigate(`/products/${id}`);
  };

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
          deleteButton={<DeleteProduct id={id} />}
          onLearnMore={handleNavigate(id)}
        />
      ))}
      <div ref={trigger}></div>
    </div>
  );
};
