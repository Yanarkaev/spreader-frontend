import { Fragment, useEffect, useState } from "react";
import { Button, Select, Input } from "../../../shared/iu";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getBranches } from "../../../app/features/branches/branchesSlice";
import {
  setErrorMessage,
  signin,
  signup,
} from "../../../app/features/auth/authSlice";
import cn from "classnames";
import s from "./Auth.module.scss";

const form = [
  { name: "name", type: "text", placeholder: "Имя" },
  { name: "surname", type: "text", placeholder: "Фамилия" },
  { name: "login", type: "text", placeholder: "Логин" },
  { name: "password", type: "password", placeholder: "Пароль" },
];

export const SignUp = () => {
  const branches = useSelector((state) => state.branches.branches);
  const signedUp = useSelector((state) => state.auth.signedUp);
  const error = useSelector((state) => state.auth.error);
  const dispatch = useDispatch();

  const [data, setData] = useState({
    name: "",
    surname: "",
    login: "",
    password: "",
    branchId: "",
  });

  useEffect(() => {
    dispatch(getBranches());
    dispatch(setErrorMessage());
  }, [dispatch]);

  useEffect(() => {
    if (branches[0]) {
      setData({ ...data, branchId: branches[0]._id });
    }
    console.log(branches);
  }, [branches]); // eslint-disable-line react-hooks/exhaustive-deps 

  const handleData = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    dispatch(setErrorMessage());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signup(data));
  };

  useEffect(() => {
    if (signedUp) {
      dispatch(signin({ login: data.login, password: data.password }));
    }
  }, [signedUp]); // eslint-disable-line react-hooks/exhaustive-deps 

  const isValid =
    data.name && data.surname && data.login && data.password && data.branchId;

  return (
    <form className={cn(s.Form, error && s.formError)} onSubmit={handleSubmit}>
      <div className={s.title}>
        <h1>Регистрация</h1>
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

        <Select
          name="branchId"
          value={data.branchId}
          array={branches}
          displayValue="name"
          selectValue="_id"
          onChange={handleData}
          className={cn(s.input, s.select)}
          variant="outlined"
        />
      </div>

      <Button
        disabled={error || !isValid}
        className={s.submit}
        variant="success"
      >
        Зарегистрироваться
      </Button>

      <Link className={s.redirect} to="/signin">
        <Button>Есть аккаунт?</Button>
      </Link>
    </form>
  );
};
