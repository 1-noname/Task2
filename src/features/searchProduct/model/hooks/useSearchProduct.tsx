import { useMemo } from "react";
import type { ChangeEvent } from "react";

import { debounce } from "@/shared/lib/helper/debounce";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch";

import { setSearch } from "../slice/searchSlice";

export const useSearchProduct = () => {
  const dispatch = useAppDispatch();

  const debouncedSetSearch = useMemo(
    () =>
      debounce((value: string) => {
        dispatch(setSearch(value));
      }, 500),
    [dispatch],
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    debouncedSetSearch(e.target.value);
  };

  return { handleChange };
};
