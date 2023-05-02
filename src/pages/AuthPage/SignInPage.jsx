import { Fragment, useState } from "react";
import { Button, Input } from "../../shared/iu";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setErrorMessage, signin } from "../../app/features/auth/authSlice";
import cn from "classnames";
import s from "./AuthPage.module.scss";

const form = [
  { name: "login", type: "text", placeholder: "Логин" },
  { name: "password", type: "password", placeholder: "Пароль" },
];

export const SignInPage = () => {
  const error = useSelector((state) => state.auth.error);
  const dispatch = useDispatch();

  const [data, setData] = useState({
    login: "",
    password: "",
  });

  const handleData = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setErrorMessage();
    dispatch(setErrorMessage());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signin(data));
    console.log(data);
  };

  const isValid = data.login && data.password;

  return (
    <form className={cn(s.Form, error && s.formError)} onSubmit={handleSubmit}>
      <div className={s.title}>
        <h1>Вход</h1>
        {error && <div className={s.error}>{error}</div>}
      </div>

      <div className={s.inputsWrapper}>
        {form.map((el) => (
          <Fragment key={el.name}>
            <Input
              type={el.type}
              value={data[el.name]}
              name={el.name}
              placeholder={el.placeholder}
              onChange={handleData}
              className={s.input}
              variant="outlined"
            />
          </Fragment>
        ))}
      </div>

      <Button
        disabled={error || !isValid}
        className={s.submit}
        variant="success"
      >
        Войти
      </Button>

      <Link className={s.redirect} to={"/signup"}>
        <Button>Нет аккаунта?</Button>
      </Link>
    </form>
  );
};
