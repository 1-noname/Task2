import { useEffect, useState } from "react";

import type { Product } from "../../model/types/types";

import { Box, Paper, Stack } from "@mui/material";

interface ProductGalleryProps {
  product: Product;
}

export const ProductGallery = ({ product }: ProductGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState<string>("");

  useEffect(() => {
    if (product?.images?.length) {
      setSelectedImage(product.images[0]);
    } else if (product?.thumbnail) {
      setSelectedImage(product.thumbnail);
    }
  }, [product]);

  return (
    <Stack spacing={2}>
      <Paper
        elevation={4}
        sx={{
          height: "500px",
          borderRadius: 4,
          bgcolor: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <img
          src={selectedImage}
          alt={product.title}
          style={{
            maxWidth: "95%",
            maxHeight: "95%",
            objectFit: "contain",
          }}
        />
      </Paper>

      {product.images.length > 1 && (
        <Stack direction="row" spacing={2} sx={{ overflowX: "auto", py: 1 }}>
          {product.images.map((img, index) => (
            <Box
              key={index}
              onClick={() => setSelectedImage(img)}
              sx={{
                width: 80,
                height: 80,
                borderRadius: 2,
                cursor: "pointer",
                border:
                  selectedImage === img
                    ? "2px solid #90caf9"
                    : "2px solid transparent",
                bgcolor: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <img
                src={img}
                alt={`thumb-${index}`}
                style={{
                  maxWidth: "90%",
                  maxHeight: "90%",
                  objectFit: "contain",
                }}
              />
            </Box>
          ))}
        </Stack>
      )}
    </Stack>
  );
};
