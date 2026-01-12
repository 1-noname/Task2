import { Product } from "@/entities/product";

import AssignmentReturnIcon from "@mui/icons-material/AssignmentReturn";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import SaveIcon from "@mui/icons-material/Save";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  Rating,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

interface ProductInfoProps {
  product: Product;
  isAdmin: boolean;
  isEditMode: boolean;
  isUpdating: boolean;
  formValues?: {
    title: string;
    price: number;
    description: string;
  };
  onToggleEdit?: () => void;
  onSave?: () => void;
  onCancel?: () => void;
  onFieldChange?: (field: string, value: string | number) => void;
}

export const ProductInfo = ({
  product,
  isAdmin,
  isEditMode,
  isUpdating,
  formValues,
  onToggleEdit,
  onSave,
  onCancel,
  onFieldChange,
}: ProductInfoProps) => {
  const handleChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      onFieldChange?.(field, e.target.value);
    };

  return (
    <Stack spacing={3}>
      {/* --- BRAND & ADMIN ACTIONS --- */}
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        {product.brand && (
          <Typography
            variant="overline"
            sx={{
              color: "#90caf9",
              fontSize: "1rem",
              letterSpacing: 1.2,
            }}
          >
            {product.brand}
          </Typography>
        )}

        {isAdmin && (
          <Stack direction="row" spacing={1}>
            {!isEditMode ? (
              <IconButton
                onClick={onToggleEdit}
                sx={{ color: "var(--color-secondary)" }}
              >
                <EditIcon />
              </IconButton>
            ) : (
              <>
                <IconButton
                  onClick={onSave}
                  disabled={isUpdating}
                  sx={{ color: "#66bb6a" }}
                >
                  <SaveIcon />
                </IconButton>
                <IconButton onClick={onCancel} sx={{ color: "#f44336" }}>
                  <CloseIcon />
                </IconButton>
              </>
            )}
          </Stack>
        )}
      </Stack>

      {/* --- TITLE --- */}
      {isEditMode && formValues ? (
        <TextField
          value={formValues.title}
          onChange={handleChange("title")}
          fullWidth
          variant="outlined"
          size="small"
          sx={{
            input: {
              color: "var(--color-secondary)",
              fontSize: "1.5rem",
              fontWeight: "bold",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "var(--color-secondary)",
            },
          }}
        />
      ) : (
        <Typography variant="h3" fontWeight={800} sx={{ lineHeight: 1.1 }}>
          {product.title}
        </Typography>
      )}

      {/* --- RATING --- */}
      <Stack direction="row" alignItems="center" spacing={2}>
        <Stack direction="row" alignItems="center" spacing={0.5}>
          <Rating
            value={product.rating}
            precision={0.1}
            readOnly
            size="small"
          />
          <Typography variant="body2" color="var(--color-secondary)">
            {product.rating}
          </Typography>
        </Stack>
        <Divider orientation="vertical" flexItem sx={{ bgcolor: "#fff" }} />
        <Typography
          variant="body2"
          sx={{
            color: product.stock > 5 ? "#66bb6a" : "#ffa726",
            fontWeight: "bold",
          }}
        >
          {product.availabilityStatus || `${product.stock} in Stock`}
        </Typography>
      </Stack>

      {/* --- PRICE --- */}
      <Box>
        <Stack direction="row" alignItems="baseline" spacing={2}>
          {isEditMode && formValues ? (
            <TextField
              type="number"
              value={formValues.price}
              onChange={handleChange("price")}
              size="small"
              sx={{
                width: 150,
                input: {
                  color: "#90caf9",
                  fontSize: "2rem",
                  fontWeight: "bold",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "var(--color-secondary)",
                },
              }}
            />
          ) : (
            <Typography variant="h2" fontWeight={700}>
              ${product.price}
            </Typography>
          )}
        </Stack>
        <Typography
          variant="body2"
          sx={{ color: "var(--color-secondary)", mt: 0.5 }}
        >
          Tax included. Shipping calculated at checkout.
        </Typography>
      </Box>

      <Divider sx={{ borderColor: "var(--color-secondary)" }} />

      {/* --- DESCRIPTION --- */}
      {isEditMode && formValues ? (
        <TextField
          value={formValues.description}
          onChange={handleChange("description")}
          multiline
          rows={4}
          fullWidth
          sx={{
            textarea: {
              color: "var(--color-secondary)",
              lineHeight: 1.7,
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#fff",
            },
          }}
        />
      ) : (
        <Typography
          variant="body1"
          sx={{ color: "var(--color-secondary)", lineHeight: 1.7 }}
        >
          {product.description}
        </Typography>
      )}

      {/* --- ACTION BUTTONS --- */}
      <Stack spacing={2} sx={{ pt: 2 }}>
        <Button
          variant="contained"
          size="large"
          startIcon={<ShoppingCartIcon />}
          sx={{
            bgcolor: "#90caf9",
            color: "#000",
            py: 1.5,
            fontWeight: "bold",
            "&:hover": { bgcolor: "#42a5f5" },
          }}
        >
          Add to Cart
        </Button>
        <Button
          variant="outlined"
          size="large"
          sx={{
            borderColor: "#fff",
            color: "var(--color-secondary)",
            py: 1.5,
            "&:hover": {
              borderColor: "var(--color-secondary)",
              bgcolor: "#fff",
            },
          }}
        >
          Buy Now
        </Button>
      </Stack>

      {/* --- META --- */}
      <Stack spacing={2} sx={{ mt: 4 }}>
        {product.shippingInformation && (
          <InfoRow
            icon={<LocalShippingIcon fontSize="small" />}
            text={product.shippingInformation}
          />
        )}
        {product.warrantyInformation && (
          <InfoRow
            icon={<VerifiedUserIcon fontSize="small" />}
            text={product.warrantyInformation}
          />
        )}
        {product.returnPolicy && (
          <InfoRow
            icon={<AssignmentReturnIcon fontSize="small" />}
            text={product.returnPolicy}
          />
        )}
      </Stack>
    </Stack>
  );
};

const InfoRow = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
  <Stack
    direction="row"
    spacing={2}
    alignItems="center"
    sx={{
      p: 1.5,
      borderRadius: 2,
    }}
  >
    <Avatar
      sx={{ bgcolor: "transparent", color: "#90caf9", width: 24, height: 24 }}
    >
      {icon}
    </Avatar>
    <Typography variant="body2" sx={{ color: "var(--color-secondary)" }}>
      {text}
    </Typography>
  </Stack>
);
