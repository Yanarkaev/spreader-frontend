import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./auth.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setError, signin } from "../../../app/features/auth/authSlice";

const Signin = () => {
  const error = useSelector((state) => state.auth.error);
  const loading = useSelector((state) => state.auth.loading);
  const dispatch = useDispatch();

  const [message, setMessage] = useState(error)

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleSignin = (e) => {
    e.preventDefault();
    dispatch(signin({ login, password }));
  };

  const handleLogin = (e) => {
    setLogin(e.target.value);
    // if (error) {
    //   setMessage(null)
    // }
    dispatch(setError());
  };
  const hadnlePassword = (e) => {
    setPassword(e.target.value);
  
    dispatch(setError());
  };
console.log(error)
  return (
    <div className={styles.formWrapper}>
      <form
        action=""
        onSubmit={handleSignin}
        className={error && styles.formError}
      >
        {error && (
          <div className={`${styles.status} ${styles.error}`}>{error}</div>
        )}
        {loading && (
          <div className={`${styles.status} ${styles.loading}`}>loading</div>
        )}
        <input
          type="text"
          placeholder="Логин"
          value={login}
          onChange={handleLogin}
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={hadnlePassword}
        />

        <button>Войти</button>
        <div className={styles.authQues}>
          <span>
            Нет аккаунта? <Link to="/spreader/signup">Регистрация</Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default Signin;
