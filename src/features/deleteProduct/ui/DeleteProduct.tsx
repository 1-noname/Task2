import { useDeleteProduct } from "../model/useDeleteProduct";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Tooltip,
} from "@mui/material";

interface DeleteProductProps {
  id: number;
}

export const DeleteProduct = ({ id }: DeleteProductProps) => {
  const { open, isLoading, handleClickOpen, handleClose, handleConfirm } =
    useDeleteProduct(id);

  return (
    <>
      <Tooltip title="Delete product">
        <Button
          onClick={handleClickOpen}
          color="error"
          variant="contained"
          disabled={isLoading}
        >
          {isLoading ? "Deleting..." : "Delete"}
        </Button>
      </Tooltip>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        onClick={(e) => e.stopPropagation()}
      >
        <DialogTitle id="alert-dialog-title">Delete this product?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this product? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="inherit">
            Cancel
          </Button>
          <IconButton
            onClick={handleConfirm}
            color="error"
            size="small"
            sx={{
              "&:hover": { backgroundColor: "rgba(211, 47, 47, 0.1)" },
            }}
          >
            <DeleteOutlineIcon />
          </IconButton>
        </DialogActions>
      </Dialog>
    </>
  );
};
