import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useLoginMutation } from "../../api/authApi";

export const useLoginForm = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [login, { isLoading, isError }] = useLoginMutation();
  const navigate = useNavigate();

  const isFilled = username !== "" && password !== "";

  const handleLogin = async () => {
    try {
      setErrorMsg(null);

      const data = await login({ username, password }).unwrap();

      localStorage.setItem("token", data.accessToken);

      navigate("/");
    } catch (e) {
      if (e.status === 401) {
        setErrorMsg("Неверный логин или пароль");
      } else {
        setErrorMsg("Ошибка сервера. Попробуйте позже");
      }
    }
  };

  return {
    username,
    password,
    setUsername,
    setPassword,
    isFilled,
    handleLogin,
    isLoading,
    isError,
    errorMsg,
  };
};
