import { MouseEvent, useState } from "react";

import { useMeQuery } from "@/entities/session";

export const useHeader = () => {
  const { data: user, isLoading } = useMeQuery();
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return {
    user,
    isLoading,
    anchorElNav,
    handleOpenNavMenu,
    handleCloseNavMenu,
  };
};
