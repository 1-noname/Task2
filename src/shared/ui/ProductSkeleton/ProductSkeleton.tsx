import cls from "./ProductSkeleton.module.scss";

import { Skeleton } from "@mui/material";

export const ProductSkeleton = () => {
  return (
    <div className={cls.card}>
      <div>
        <Skeleton width="100%" />

        <Skeleton width="50%" />
        <Skeleton width="75%" />
      </div>
      <div>
        <Skeleton width="100%" />

        <Skeleton width="50%" />
        <Skeleton width="75%" />
      </div>
      <div>
        <Skeleton width="100%" />

        <Skeleton width="50%" />
        <Skeleton width="75%" />
      </div>
    </div>
  );
};
