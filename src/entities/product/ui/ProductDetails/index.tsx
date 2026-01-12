import { useNavigate } from "react-router-dom";

import { Product } from "../../model/types/types";
import { ProductGallery } from "./ProductGallery";
import { ProductInfo } from "./ProductInfo";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, Button, Container, Grid } from "@mui/material";

export interface ProductDetailsProps {
  product: Product;
  isLoading?: boolean;
  isAdmin?: boolean;
  isEditMode?: boolean;
  isUpdating?: boolean;
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

export const ProductDetails = ({
  product,
  isLoading,
  ...infoProps
}: ProductDetailsProps) => {
  const navigate = useNavigate();

  if (isLoading || !product) {
    return <Box sx={{ p: 4, color: "var(--color-secondary)" }}>Loading...</Box>;
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "var(--bg-secondary)",
        color: "var(--color-secondary)",
        pt: 4,
        pb: 8,
      }}
    >
      <Container maxWidth="lg">
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          sx={{
            mb: 4,
            color: "var(--color-secondary)",
            "&:hover": { color: "var(--color-secondary)" },
          }}
        >
          Back to Catalog
        </Button>

        <Grid container spacing={6}>
          <Grid item xs={12} md={7}>
            <ProductGallery product={product} />
          </Grid>

          <Grid item xs={12} md={5}>
            <ProductInfo product={product} {...infoProps} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
