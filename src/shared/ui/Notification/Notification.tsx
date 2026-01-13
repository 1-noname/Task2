import { SyntheticEvent } from "react";

import { useAppDispatch, useAppSelector } from "@/shared/lib";
import {
  hideNotification,
  selectNotification,
} from "@/shared/lib/slice/notificationSlice";

import { Alert, Snackbar, SnackbarCloseReason } from "@mui/material";

export const Notification = () => {
  const dispatch = useAppDispatch();
  const { isOpen, message, type } = useAppSelector(selectNotification);

  const handleClose = (_: SyntheticEvent, reason?: SnackbarCloseReason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(hideNotification());
  };

  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert
        onClose={handleClose}
        severity={type}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};
