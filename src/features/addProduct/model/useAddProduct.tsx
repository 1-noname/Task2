import { ChangeEvent, useState } from "react";

import { useAddProductMutation } from "@/entities/product/api/productsApi";

export const useAddProduct = () => {
  const [open, setOpen] = useState(false);
  const [addProduct, { isLoading }] = useAddProductMutation();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const handleOpenDialog = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    setTitle("");
    setPrice("");
    setDescription("");
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPrice(e.target.value);
  };
  const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handleSave = async () => {
    if (!title || !price) return;
    try {
      await addProduct({ title, price: Number(price), description }).unwrap();
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
  };
};
