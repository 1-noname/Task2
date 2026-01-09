import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

import { LIMIT } from "@/entities/product";
import { useGetProductsQuery } from "@/entities/product";
import { selectCategory } from "@/features/filterCategory/model/slice/categorySlice";
import { selectProductName } from "@/features/searchProduct/model/slice/searchSlice";
import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";

export const useLazyDataFetching = () => {
  const [skip, setSkip] = useState(0);
  const search = useAppSelector(selectProductName);
  const category = useAppSelector(selectCategory);

  const { ref, inView } = useInView({
    threshold: 0.5,
    rootMargin: "100px",
  });
  const { data, isLoading, isError, isFetching } = useGetProductsQuery({
    limit: LIMIT,
    skip,
    search,
    category,
  });

  useEffect(() => {
    setSkip(0);
  }, [search, category]);

  useEffect(() => {
    const hasScroll = data && data.products.length < data.total;
    if (inView && !isLoading && hasScroll) {
      setSkip((prev) => prev + LIMIT);
    }
  }, [inView, isFetching, data]);

  return {
    products: data?.products,
    isLoading,
    isError,
    trigger: ref,
  };
};
