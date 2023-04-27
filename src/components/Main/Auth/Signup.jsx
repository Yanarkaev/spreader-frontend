import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./auth.module.scss";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setErrorMessage, signup } from "./../../../app/features/auth/authSlice";
import { getBranches } from "./../../../app/features/branches/branchesSlice";
import { Input } from './../../../shared/iu/Input/Input';
import { Button } from './../../../shared/iu/Button/Button';

const Signup = () => {
  const branches = useSelector((state) => state.branches.branches);
  const error = useSelector((state) => state.auth.error);
  const loading = useSelector((state) => state.auth.loading);
  const dispatch = useDispatch();

  const [data, setData] = useState({
    login: '',
    password: '',
    branch: '',
  })
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [branch, setBranch] = useState("");
  const [isEmpty, setIsEmpty] = useState(true);

  useEffect(() => {
    setIsEmpty(login && password && branch ? false : true);
  }, [login, password, branch]);

  useEffect(() => {
    dispatch(getBranches());
  }, [dispatch]);

  useEffect(() => {
    branches[0] && setBranch(branches[0]._id);
  }, [branches]);

  // useEffect(() => {
  //   dispatch(signin({login, password}))
  // }, [signedUp])

  const handleSignup = (e) => {
    e.preventDefault();
    dispatch(signup({ login, password, branchId: branch }));
    // setTimeout(() => {
    // dispatch(signin({login, password}))
    // }, 1000)
  };

  const hadnleLogin = (e) => {
    setLogin(e.target.value);
    dispatch(setErrorMessage());
  };

  const hadnlePassword = (e) => {
    setPassword(e.target.value);
    dispatch(setErrorMessage());
  };

  const handleBranch = (e) => {
    setBranch(e.target.value);
    dispatch(setErrorMessage());
  };

  return (
    <div className={styles.formWrapper}>
      <form action="" onSubmit={handleSignup}>
      {error && <div className={`${styles.status} ${styles.error}`}>{error}</div>}
      {loading && <div className={`${styles.status} ${styles.loading}`}>loading</div>}
        <Input
          type="text"
          placeholder="Логин"
          value={login}
          onChange={hadnleLogin}
        />
        <Input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={hadnlePassword}
        />

        <p>
          <span>Отдел:</span>
          <select value={branch} onChange={handleBranch}>
            {branches.map((item) => {
              return (
                <option value={item._id} key={item._id}>
                  {item.name}
                </option>
              );
            })}
          </select>
        </p>

        <Button
          disabled={isEmpty || loading || error}
          className={`${isEmpty || loading || error ? styles.disabled : ""}`}
        >
          Зарегистрироваться
        </Button>
        <div className={styles.authQues}>
          <span>
            Есть аккаунт? <Link to="/spreader/signin">Войти</Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default Signup;
