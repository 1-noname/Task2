import { ProductDetails } from "@/entities/product";
import { selectIsAdmin } from "@/entities/session";
import { useAppSelector } from "@/shared/lib";

import { useProductDetailsPage } from "../model/useProductDetailsPage";

export const ProductDetailsPage = () => {
  const {
    product,
    isLoading,
    isEditMode,
    isUpdating,
    formValues,
    onToggleEdit,
    handleSave,
    handleCancel,
    handleFieldChange,
  } = useProductDetailsPage();
  const isAdmin = useAppSelector(selectIsAdmin);

  return (
    <ProductDetails
      product={product}
      isLoading={isLoading}
      isAdmin={isAdmin}
      isEditMode={isEditMode}
      isUpdating={isUpdating}
      formValues={formValues}
      onToggleEdit={onToggleEdit}
      onSave={handleSave}
      onCancel={handleCancel}
      onFieldChange={handleFieldChange}
    />
  );
};
