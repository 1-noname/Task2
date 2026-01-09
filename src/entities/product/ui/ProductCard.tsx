import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

interface ProductCardProps {
  id: number;
  title: string;
  description: string;
  category: string;
  thumbnail: string;
  price: number;
  deleteButton: ReactNode;
  isAdmin: boolean;
}

export const ProductCard = ({
  id,
  title,
  description,
  category,
  thumbnail,
  price,
  deleteButton,
  isAdmin,
}: ProductCardProps) => {
  const navigate = useNavigate();

  const handleNavigate = (id: number) => () => {
    navigate(`/products/${id}`);
  };

  return (
    <Card
      sx={{
        display: "flex",
        background: "transparent",
        color: "var(--color-secondary)",
      }}
    >
      <CardMedia
        component="img"
        image={thumbnail}
        sx={{
          objectFit: "cover",
          display: "none",

          "@media (min-width: 1024px)": {
            display: "block",
            width: 215,
            height: 260,
          },
        }}
      />
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-sm)",
        }}
      >
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="subtitle2" sx={{ color: "var(--color-primary)" }}>
          categoryes: {category}
        </Typography>
        <Typography variant="body2" sx={{ color: "var(--color-primary)" }}>
          {description}
        </Typography>
        <Typography variant="body1">{`$${price}`}</Typography>
        <CardActions sx={{ paddingLeft: "0px" }}>
          <Button size="small" onClick={handleNavigate(id)}>
            Learn More
          </Button>
          {isAdmin ? deleteButton : null}
        </CardActions>
      </CardContent>
    </Card>
  );
};
