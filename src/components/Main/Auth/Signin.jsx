import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./auth.module.scss";
import { useDispatch, useSelector } from 'react-redux';
import { setError, signin } from "../../../app/features/auth/authSlice";

const Signin = () => {
  const error = useSelector((state) => state.auth.error);
  const loading = useSelector((state) => state.auth.loading);
  const dispatch = useDispatch();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleSignin = (e) => {
    e.preventDefault();
    dispatch(signin({login, password}))
  } 

  const hadnleLogin = (e) => {
    setLogin(e.target.value);
    dispatch(setError());
  };
  const hadnlePassword = (e) => {
    setPassword(e.target.value);
    dispatch(setError());
  };

  return (
    <div className={styles.formWrapper}>
      {/* <Lines /> */}
      <form action="" onSubmit={handleSignin}>
      {error && <div className={`${styles.status} ${styles.error}`}>{error}</div>}
      {loading && <div className={`${styles.status} ${styles.loading}`}>loading</div>}
      <input
          type="text"
          placeholder="Логин"
          value={login}
          onChange={hadnleLogin}
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
