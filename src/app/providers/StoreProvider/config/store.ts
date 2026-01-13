import sessionSlice from "@/entities/session/model/sessionSlice";
import categorySlice from "@/features/filterCategory/model/slice/categorySlice";
import searchSlice from "@/features/searchProduct/model/slice/searchSlice";
import { baseApi } from "@/shared/api/baseApi";
import notificationSlice from "@/shared/lib/slice/notificationSlice";

import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    search: searchSlice,
    category: categorySlice,
    session: sessionSlice,
    notification: notificationSlice,
  },
  devTools: __IS_DEV__,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
