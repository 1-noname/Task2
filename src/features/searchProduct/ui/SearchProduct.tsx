import { useSearchProduct } from "../model/hooks/useSearchProduct";
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
  const { handleChange, localValue, isSearchDisabled } = useSearchProduct();

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
