import { RootState } from "@/app/providers/StoreProvider";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CategoryState {
  selectedCategory: string | null;
}

const initialState: CategoryState = {
  selectedCategory: null,
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<string | null>) => {
      state.selectedCategory = action.payload;
    },
    resetCategory: (state) => {
      state.selectedCategory = null;
    },
  },
});

export const { setCategory, resetCategory } = categorySlice.actions;

export const selectCategory = (state: RootState) =>
  state.category.selectedCategory;

export default categorySlice.reducer;
