import type { RootState } from "@/app/providers/StoreProvider";

import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

interface SearchState {
  productName: string;
}

const initialState: SearchState = {
  productName: "",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.productName = action.payload;
    },
  },
});

export const { setSearch } = searchSlice.actions;
export default searchSlice.reducer;

export const selectProductName = (state: RootState) => state.search.productName;
