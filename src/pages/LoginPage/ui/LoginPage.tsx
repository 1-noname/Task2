import { LoginForm } from "@/features/auth";

import cls from "./LoginPage.module.scss";

export const LoginPage = () => {
  return (
    <div className={cls.login}>
      <div className={cls.loginContainer}>
        <div className={cls.loginHeader}>
          <div className={cls.loginTitle}>Authorization</div>
          <div className={cls.loginDesc}>
            Enter your username and password to log in to your account
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};
