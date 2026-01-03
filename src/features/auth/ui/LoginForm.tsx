import { ChangeEvent } from "react";

import { useLoginForm } from "../model/hooks/useLoginForm";
import cls from "./LoginForm.module.scss";

import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
import { Button, InputAdornment, TextField } from "@mui/material";

export const LoginForm = () => {
  const {
    username,
    password,
    setUsername,
    setPassword,
    isFilled,
    handleLogin,
  } = useLoginForm();

  const handleLoginWriting = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordWriting = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <form className={cls.loginForm}>
      <TextField
        label="Логин"
        variant="outlined"
        value={username}
        onChange={handleLoginWriting}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon sx={{ color: "var(--color-primary)" }} />
              </InputAdornment>
            ),
          },
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "var(--color-primary)",
            },
            "&:hover fieldset": {
              borderColor: "var(--hover-primary)",
            },
            "&.Mui-focused fieldset": {
              borderColor: "var(--red)",
            },
          },
          "& .MuiInputLabel-root": {
            color: "var(--color-primary)",
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "var(--red)",
          },
        }}
      />

      <TextField
        label="Пароль"
        variant="outlined"
        value={password}
        onChange={handlePasswordWriting}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon sx={{ color: "var(--color-primary)" }} />
              </InputAdornment>
            ),
          },
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "var(--color-primary)",
            },
            "&:hover fieldset": {
              borderColor: "var(--hover-primary)",
            },
            "&.Mui-focused fieldset": {
              borderColor: "var(--red)",
            },
          },
          "& .MuiInputLabel-root": {
            color: "var(--color-primary)",
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "var(--red)",
          },
        }}
      />

      <Button
        variant="contained"
        disabled={!isFilled}
        onClick={handleLogin}
        sx={{
          "&.Mui-disabled": {
            color: "var(--color-primary)",
            background: "var(--button-inactive)",
          },
          width: "100%",
          color: "var(--color-secondary)",
          background: "var(--button-active)",
        }}
      >
        Авторизация
      </Button>
    </form>
  );
};
