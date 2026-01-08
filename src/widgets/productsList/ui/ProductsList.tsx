import { ProductCard } from "@/entities/product";
import { DeleteProduct } from "@/features/deleteProduct";
import { ProductCardSkeleton } from "@/shared/ui";

import { useLazyDataFetching } from "../model/hooks/useLazyDataFetching";
import cls from "./ProductsList.module.scss";

export const ProductsList = () => {
  const { products, isLoading, isError, trigger } = useLazyDataFetching();

  if (isError) {
    return <div>:(</div>;
  }

  return (
    <div className={cls.products}>
      {isLoading ? (
        <ProductCardSkeleton />
      ) : (
        products.map(
          ({ id, title, description, category, thumbnail, price }) => (
            <ProductCard
              key={id}
              id={id}
              title={title}
              description={description}
              category={category}
              thumbnail={thumbnail}
              price={price}
              deleteButton={<DeleteProduct id={id} />}
            />
          ),
        )
      )}
      <div ref={trigger}></div>
    </div>
  );
};
