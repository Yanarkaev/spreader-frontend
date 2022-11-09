import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./auth.module.scss";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setError, signup } from "./../../../app/features/auth/authSlice";
import { getBranches } from "./../../../app/features/branches/branchesSlice";

const Signup = () => {
  const branches = useSelector((state) => state.branches.branches);
  const error = useSelector((state) => state.auth.error);
  const loading = useSelector((state) => state.auth.loading);
  const dispatch = useDispatch();

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

  const handleSignup = (e) => {
    e.preventDefault();
    dispatch(signup({ login, password, branchId: branch }));
  };

  const hadnleLogin = (e) => {
    setLogin(e.target.value);
    dispatch(setError());
  };

  const hadnlePassword = (e) => {
    setPassword(e.target.value);
    dispatch(setError());
  };

  const handleBranch = (e) => {
    setBranch(e.target.value);
    dispatch(setError());
  };

  return (
    <div className={styles.formWrapper}>
      <form action="" onSubmit={handleSignup}>
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

        <button
          disabled={isEmpty || loading || error}
          className={`${isEmpty || loading || error ? styles.disabled : ""}`}
        >
          Зарегистрироваться
        </button>
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
