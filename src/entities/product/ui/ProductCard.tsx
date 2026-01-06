import { ReactNode } from "react";

import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";

interface ProductCardProps {
  id: number;
  title: string;
  description: string;
  category: string;
  onLearnMore: () => void;
  deleteButton: ReactNode;
}

export const ProductCard = ({
  id,
  title,
  description,
  category,
  onLearnMore,
  deleteButton,
}: ProductCardProps) => {
  return (
    <Card>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title} | {id}
        </Typography>
        <Typography variant="subtitle2">categoryes: {category}</Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={onLearnMore}>
          Learn More
        </Button>
        {deleteButton}
      </CardActions>
    </Card>
  );
};
