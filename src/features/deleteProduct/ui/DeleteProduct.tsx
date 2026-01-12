import { useDeleteProductMutation } from "@/entities/product/api/productsApi";

import { Button } from "@mui/material";

interface deleteProductProps {
  id: number;
}

export const DeleteProduct = ({ id }: deleteProductProps) => {
  const [deleteProduct, { isLoading }] = useDeleteProductMutation();

  const handleDelete = () => {
    try {
      deleteProduct(id).unwrap();
    } catch (e) {
      console.error("Cant remove data: ", e);
    }
  };

  return (
    <Button variant="outlined" color="error" onClick={handleDelete}>
      {isLoading ? "Deleting..." : "Delete"}
    </Button>
  );
};
