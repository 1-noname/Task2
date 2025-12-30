import { ChangeEvent, useState } from "react";

import cls from "./LoginPage.module.scss";

import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
import { Button, InputAdornment, TextField } from "@mui/material";

export const LoginPage = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const isFilled = login !== "" && password !== "";

  const handleLogin = (e: ChangeEvent<HTMLInputElement>) => {
    setLogin(e.target.value);
  };

  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div className={cls.login}>
      <div className={cls.loginContainer}>
        <div className={cls.loginHeader}>
          <div className={cls.loginTitle}>Авторизация</div>
          <div className={cls.loginDesc}>
            Введите имя пользователя и пароль, чтобы войти в свою учетную запись
          </div>
        </div>
        <form className={cls.loginForm}>
          <TextField
            label="Логин"
            variant="outlined"
            value={login}
            onChange={handleLogin}
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
            onChange={handlePassword}
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
        </form>
        <div>
          <Button
            variant="contained"
            disabled={!isFilled}
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
        </div>
      </div>
    </div>
  );
};
