import { useEffect, useMemo, useState } from "react";
import type { ChangeEvent } from "react";

import { selectCategory } from "@/features/filterCategory/model/slice/categorySlice";
import { useAppDispatch, useAppSelector } from "@/shared/lib";
import { debounce } from "@/shared/lib/helper/debounce";

import { selectProductName, setSearch } from "../slice/searchSlice";

export const useSearchProduct = () => {
  const dispatch = useAppDispatch();

  const reduxProductName = useAppSelector(selectProductName);
  const selectedCategory = useAppSelector(selectCategory);

  const [localValue, setLocalValue] = useState(reduxProductName);
  const debounceDispatch = useMemo(() => {
    return debounce((value: string) => {
      dispatch(setSearch(value));
    }, 500);
  }, [dispatch]);

  const isSearchDisabled = Boolean(selectedCategory);

  useEffect(() => {
    if (selectedCategory) {
      setLocalValue("");
      dispatch(setSearch(""));
    }
  }, [selectedCategory, dispatch]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;

    setLocalValue(val);

    debounceDispatch(val);
  };

  return { handleChange, localValue, isSearchDisabled };
};
