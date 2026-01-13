import { ChangeEvent, useState } from "react";

import { useAddProductMutation } from "@/entities/product/api/productsApi";
import { useAppDispatch } from "@/shared/lib";
import { showNotification } from "@/shared/lib/slice/notificationSlice";

interface FormError {
  title?: string;
  price?: string;
}

export const useAddProduct = () => {
  const [open, setOpen] = useState(false);
  const [addProduct, { isLoading }] = useAddProductMutation();
  const dispatch = useAppDispatch();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState<FormError>({});

  const handleOpenDialog = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    setTitle("");
    setPrice("");
    setDescription("");
    setErrors({});
  };

  const validate = (): boolean => {
    const newError: FormError = {};
    let isValid = true;

    if (!title) {
      newError.title = "Title is required";
      isValid = false;
    }

    if (!price) {
      newError.price = "Price is required";
      isValid = false;
    }

    setErrors(newError);
    return isValid;
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);

    if (errors.title) {
      setErrors((prev) => ({ ...prev, title: undefined }));
    }
  };

  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPrice(e.target.value);

    if (errors.price) {
      setErrors((prev) => ({ ...prev, price: undefined }));
    }
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handleSave = async () => {
    if (!validate()) return;

    try {
      await addProduct({ title, price: Number(price), description }).unwrap();

      dispatch(
        showNotification({
          message: "The product has been added successfully.",
        }),
      );

      handleClose();
    } catch (e) {
      console.error(e);
    }
  };

  return {
    open,
    isLoading,
    handleOpenDialog,
    title,
    handleTitleChange,
    price,
    handlePriceChange,
    description,
    handleDescriptionChange,
    handleClose,
    handleSave,
    errors,
  };
};
