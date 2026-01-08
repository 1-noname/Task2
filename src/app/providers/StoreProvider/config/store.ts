import searchSlice from "@/features/searchProduct/model/slice/searchSlice";
import { baseApi } from "@/shared/api/baseApi";

import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    search: searchSlice,
  },
  devTools: __IS_DEV__,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
