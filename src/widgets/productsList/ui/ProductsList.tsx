import { ProductCard } from "@/entities/product";
import { selectIsAdmin } from "@/entities/session";
import { DeleteProduct } from "@/features/deleteProduct";
import { useAppSelector } from "@/shared/lib";
import { ProductSkeleton } from "@/shared/ui";

import { useLazyDataFetching } from "../model/hooks/useLazyDataFetching";
import cls from "./ProductsList.module.scss";

export const ProductsList = () => {
  const { products, isLoading, isError, trigger } = useLazyDataFetching();
  const isAdmin = useAppSelector(selectIsAdmin);

  if (isError) {
    return <div>:(</div>;
  }

  return (
    <div className={cls.products}>
      {isLoading ? (
        <ProductSkeleton />
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
              isAdmin={isAdmin}
            />
          ),
        )
      )}
      <div ref={trigger}></div>
    </div>
  );
};
