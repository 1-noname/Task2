import { MouseEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  logout,
  selectIsAuth,
  selectUser,
  useMeQuery,
} from "@/entities/session";
import { useAppDispatch, useAppSelector } from "@/shared/lib";

export const useHeader = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { isLoading } = useMeQuery();
  const user = useAppSelector(selectUser);
  const isAuth = useAppSelector(selectIsAuth);

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    handleCloseUserMenu();
    navigate("/login");
  };

  return {
    user,
    isAuth,
    isLoading,
    anchorElNav,
    anchorElUser,
    handleOpenNavMenu,
    handleCloseNavMenu,
    handleOpenUserMenu,
    handleCloseUserMenu,
    handleLogout,
  };
};
