import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useLoginMutation } from "../../api/authApi";

export const useLoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [login, { isLoading, isError }] = useLoginMutation();
  const navigate = useNavigate();

  const isFilled = username !== "" && password !== "";

  const handleLogin = async () => {
    try {
      const data = await login({ username, password }).unwrap();

      console.log("FULL DATA", data);
      console.log("TOKEN SUCCESS:", data.accessToken);

      localStorage.setItem("token", data.accessToken);

      navigate("/");
    } catch (e) {
      console.log("ERROR: ", e);
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
  };
};
