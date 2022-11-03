import React from "react";
import { Link } from "react-router-dom";
import styles from "./auth.module.scss";

const Auth = () => {
  return (
    <div className={styles.formWrapper}>
      <form action="">
        <input type="text" placeholder="Login" />
        <input type="password" placeholder="Password" />
        <button>Войти</button>
        <div className={styles.authQues}>
          <span>
            Нет аккаунта? <Link>Регистрация</Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default Auth;
