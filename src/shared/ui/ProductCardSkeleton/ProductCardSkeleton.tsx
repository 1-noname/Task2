import cls from "./ProductCardSkeleton.module.scss";

import { Skeleton } from "@mui/material";

export const ProductCardSkeleton = () => {
  return (
    <div className={cls.card}>
      <Skeleton animation="wave" variant="rounded" width="100%" height={180} />

      <div className={cls.content}>
        <Skeleton animation="wave" height={28} width="70%" />

        <Skeleton animation="wave" height={18} width="100%" />
        <Skeleton animation="wave" height={18} width="90%" />

        <div className={cls.footer}>
          <Skeleton animation="wave" height={24} width={80} />

          <Skeleton variant="rounded" height={36} width={36} />
        </div>
      </div>
    </div>
  );
};
