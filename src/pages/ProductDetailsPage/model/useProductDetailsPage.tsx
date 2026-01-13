import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from "@/entities/product";
import { useAppDispatch } from "@/shared/lib";
import { showNotification } from "@/shared/lib/slice/notificationSlice";

export const useProductDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading } = useGetProductByIdQuery(id ?? "", {
    skip: !id,
  });
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
  const dispatch = useAppDispatch();

  const [isEditMode, setIsEditMode] = useState(false);
  const [formValues, setFormValues] = useState({
    title: "",
    price: 0,
    description: "",
  });

  useEffect(() => {
    if (product) {
      setFormValues({
        title: product.title,
        price: product.price,
        description: product.description,
      });
    }
  }, [product]);

  const handleSave = async () => {
    if (!product) return;
    try {
      await updateProduct({ id: product.id, ...formValues }).unwrap();

      dispatch(
        showNotification({
          message: "The product has been updated successfully.",
        }),
      );

      setIsEditMode(false);
    } catch (e) {
      console.error("Failed to update", e);
    }
  };

  const handleCancel = () => {
    if (product) {
      setFormValues({
        title: product.title,
        price: product.price,
        description: product.description,
      });
      dispatch(
        showNotification({
          message: "Editing Product canceled",
          type: "info",
        }),
      );
    }
    setIsEditMode(false);
  };

  const handleFieldChange = (field: string, value: string | number) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  const onToggleEdit = () => {
    setIsEditMode(true);
  };

  return {
    product,
    isLoading,
    isEditMode,
    isUpdating,
    formValues,
    onToggleEdit,
    handleSave,
    handleCancel,
    handleFieldChange,
  };
};
