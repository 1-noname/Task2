import { ChangeEvent, useEffect, useMemo, useState } from "react";

import { selectCategory } from "@/features/filterCategory/model/slice/categorySlice";
import { debounce } from "@/shared/lib";
import { useAppDispatch, useAppSelector } from "@/shared/lib";

import { selectProductName, setSearch } from "../model/slice/searchSlice";
import cls from "./SearchProducts.module.scss";

import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";

interface SearchProductProps {
  isFilterOpen: boolean;
  onToggle: () => void;
}

export const SearchProduct = ({
  isFilterOpen,
  onToggle,
}: SearchProductProps) => {
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

  return (
    <div className={cls.search}>
      <input
        value={localValue}
        onChange={handleChange}
        placeholder={
          isSearchDisabled ? "Clear category to search..." : "Type name here..."
        }
        className={cls.input}
        disabled={isSearchDisabled}
      />
      <button className={cls.button} onClick={onToggle}>
        {isFilterOpen ? <FilterAltOffIcon /> : <FilterAltIcon />}
      </button>
    </div>
  );
};
