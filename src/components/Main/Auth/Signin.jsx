import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./auth.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setErrorMessage, signin } from "../../../app/features/auth/authSlice";
import { Input } from "../../../shared/iu/Input/Input";
import { Button } from "../../../shared/iu/Button/Button";

const Signin = () => {
  const error = useSelector((state) => state.auth.error);
  const loading = useSelector((state) => state.auth.loading);
  const dispatch = useDispatch();
  const [rand, setRand] = useState(0);

  const handleHover = () => {
    if (error) {
      setRand(rand > 0 ? -150 : 150);
    }
    if (password.length < 5) {
      setRand(rand > 0 ? -150 : 150);
    }
  };

  // const [message, setMessage] = useState(error);

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleSignin = (e) => {
    e.preventDefault();
    if (error) {
      setRand(rand > 0 ? -150 : 150);
    }
    dispatch(signin({ login, password }));
  };

  const handleLogin = (e) => {
    setLogin(e.target.value);
    dispatch(setErrorMessage());
  };
  const hadnlePassword = (e) => {
    setPassword(e.target.value);
    dispatch(setErrorMessage());
  };

  const handleBlur = () => {
    
  };
  return (
    <div className={styles.formWrapper}>
      
      <form action="" onSubmit={handleSignin}>
        {error && (
          <div className={`${styles.status} ${styles.error}`}>{error}</div>
        )}
        {loading && (
          <div className={`${styles.status} ${styles.loading}`}>loading</div>
        )}
        <Input
          type="text"
          placeholder="Логин"
          value={login}
          onChange={handleLogin}
        />
        <Input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={hadnlePassword}
          onBlur={handleBlur}
        />

        <Button
          onMouseOver={handleHover}
          style={{ transform: `translate(${rand}px, 0)` }}
        >
        </Button>
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
