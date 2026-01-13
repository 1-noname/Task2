import { ChangeEvent, useEffect } from "react";

import { selectCategory } from "@/features/filterCategory/model/slice/categorySlice";
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

  const productName = useAppSelector(selectProductName);
  const selectedCategory = useAppSelector(selectCategory);

  const isSearchDisabled = Boolean(selectedCategory);

  useEffect(() => {
    if (selectedCategory) {
      dispatch(setSearch(""));
    }
  }, [selectedCategory, dispatch]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearch(e.target.value));
  };

  return (
    <div className={cls.search}>
      <input
        value={productName}
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
