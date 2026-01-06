import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

import { LIMIT } from "@/entities/product";

import { useGetProductsQuery } from "../../api/productsApi";

export const useLazyDataFetching = () => {
  const [skip, setSkip] = useState(0);
  const { ref, inView } = useInView({
    threshold: 0.5,
    rootMargin: "100px",
  });
  const { data, isLoading, isError, isFetching } = useGetProductsQuery({
    limit: LIMIT,
    skip,
  });

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
