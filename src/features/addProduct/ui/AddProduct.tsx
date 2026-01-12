import { useAddProduct } from "../model/useAddProduct";

import AddIcon from "@mui/icons-material/Add";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";

const inputStyles = {
  "& .MuiInputBase-input": { color: "var(--color-primary)" },
  "& .MuiInputLabel-root": { color: "#fff" },
  "& .MuiInputLabel-root.Mui-focused": { color: "var(--color-primary)" },
  "& .MuiOutlinedInput-root": {
    "& fieldset": { borderColor: "#fff" },
    "&:hover fieldset": { borderColor: "#fff" },
    "&.Mui-focused fieldset": { borderColor: "var(--color-primary)" },
  },
};

export const AddProduct = () => {
  const {
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
  } = useAddProduct();

  return (
    <>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={handleOpenDialog}
        sx={{
          bgcolor: "#66bb6a",
          "&:hover": { bgcolor: "#43a047" },
          whiteSpace: "nowrap",
        }}
      >
        Create Product
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: "var(--bg-secondary)",
            color: "white",
            backgroundImage: "none",
          },
        }}
      >
        <DialogTitle>Create New Product</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 1 }}>
            <TextField
              label="Title"
              variant="outlined"
              value={title}
              onChange={handleTitleChange}
              fullWidth
              autoFocus
              sx={inputStyles}
            />
            <TextField
              label="Price ($)"
              type="number"
              variant="outlined"
              value={price}
              onChange={handlePriceChange}
              fullWidth
              sx={inputStyles}
            />
            <TextField
              label="Description"
              variant="outlined"
              value={description}
              onChange={handleDescriptionChange}
              multiline
              rows={3}
              fullWidth
              sx={inputStyles}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{ color: "rgba(255,255,255,0.7)" }}>
            Cancel
          </Button>
          <Button onClick={handleSave} variant="contained" disabled={isLoading}>
            {isLoading ? "Saving..." : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
