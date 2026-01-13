import { useEffect, useRef, useState } from "react";
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

  const prevFilters = useRef({ search, category });
  const isFiltersChange =
    search !== prevFilters.current.search ||
    category !== prevFilters.current.category;
  const actualSkip = isFiltersChange ? 0 : skip;

  const querySearch = category ? "" : search;

  const { ref, inView } = useInView({
    threshold: 0.5,
    rootMargin: "100px",
  });
  const { data, isLoading, isError, isFetching } = useGetProductsQuery({
    limit: LIMIT,
    skip: actualSkip,
    search: querySearch,
    category,
  });

  useEffect(() => {
    if (isFiltersChange) {
      setSkip(0);
      prevFilters.current = { search, category };
    }
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
