import { RootState } from "@/app/providers/StoreProvider";
import { User } from "@/features/auth";

import { sessionApi } from "../api/sessionApi";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SessionState {
  user: User | null;
  isAuth: boolean;
}

const initialState: SessionState = {
  user: null,
  isAuth: false,
};

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    setSession: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuth = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuth = false;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      sessionApi.endpoints.me.matchFulfilled,
      (state, { payload }) => {
        state.isAuth = true;
        state.user = payload;
      },
    );
  },
});

export const { setSession, logout } = sessionSlice.actions;

export const selectUser = (state: RootState) => state.session.user;
export const selectIsAuth = (state: RootState) => state.session.isAuth;

export default sessionSlice.reducer;

export const selectIsAdmin = (state: RootState) => {
  return state.session.user?.role === "admin";
};
