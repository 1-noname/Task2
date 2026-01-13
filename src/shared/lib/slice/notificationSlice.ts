import { RootState } from "@/app/providers/StoreProvider";

import { AlertColor } from "@mui/material";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NotificationState {
  isOpen: boolean;
  message: string;
  type: AlertColor;
}

const initialState: NotificationState = {
  isOpen: false,
  message: "",
  type: "success",
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    showNotification: (
      state,
      action: PayloadAction<{ message: string; type?: AlertColor }>,
    ) => {
      state.isOpen = true;
      state.message = action.payload.message;
      state.type = action.payload.type || "success";
    },
    hideNotification: (state) => {
      state.isOpen = false;
    },
  },
});

export const { showNotification, hideNotification } = notificationSlice.actions;
export default notificationSlice.reducer;

export const selectNotification = (state: RootState) => state.notification;
