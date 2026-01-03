import { LoginForm } from "@/features/auth";

import cls from "./LoginPage.module.scss";

export const LoginPage = () => {
  return (
    <div className={cls.login}>
      <div className={cls.loginContainer}>
        <div className={cls.loginHeader}>
          <div className={cls.loginTitle}>Авторизация</div>
          <div className={cls.loginDesc}>
            Введите имя пользователя и пароль, чтобы войти в свою учетную запись
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};
