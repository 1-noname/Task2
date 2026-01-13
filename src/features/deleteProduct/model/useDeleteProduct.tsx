import { useState } from "react";

import { useDeleteProductMutation } from "@/entities/product";
import { useAppDispatch } from "@/shared/lib";
import { showNotification } from "@/shared/lib/slice/notificationSlice";

export const useDeleteProduct = (id: number) => {
  const [open, setOpen] = useState(false);
  const [deleteProduct, { isLoading }] = useDeleteProductMutation();
  const dispatch = useAppDispatch();

  const handleClickOpen = (e: MouseEvent) => {
    e.stopPropagation();
    setOpen(true);
  };

  const handleClose = (e: MouseEvent) => {
    e.stopPropagation();
    setOpen(false);
  };

  const handleConfirm = async (e: MouseEvent) => {
    e.stopPropagation();
    try {
      await deleteProduct(id).unwrap();

      dispatch(
        showNotification({
          message: "Success product removed",
        }),
      );

      setOpen(false);
    } catch (error) {
      console.error("Failed to delete", error);

      setOpen(false);
    }
  };

  return {
    open,
    isLoading,
    handleClickOpen,
    handleClose,
    handleConfirm,
  };
};
