// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import styles from "./Auth.module.scss";
// import { useDispatch, useSelector } from "react-redux";
// import { setErrorMessage, signin } from "../../../app/features/auth/authSlice";
// import { Input } from "../../../shared/iu/Input/Input";
// import { Button } from "../../../shared/iu/Button/Button";

// const Signin = () => {
//   const error = useSelector((state) => state.auth.error);
//   const loading = useSelector((state) => state.auth.loading);
//   const dispatch = useDispatch();
//   const [rand, setRand] = useState(0);

//   const handleHover = () => {
//     if (error) {
//       setRand(rand > 0 ? -150 : 150);
//     }
//     if (password.length < 5) {
//       setRand(rand > 0 ? -150 : 150);
//     }
//   };

//   // const [message, setMessage] = useState(error);

//   const [login, setLogin] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSignin = (e) => {
//     e.preventDefault();
//     if (error) {
//       setRand(rand > 0 ? -150 : 150);
//     }
//     dispatch(signin({ login, password }));
//   };

//   const handleLogin = (e) => {
//     setLogin(e.target.value);
//     dispatch(setErrorMessage());
//   };
//   const hadnlePassword = (e) => {
//     setPassword(e.target.value);
//     dispatch(setErrorMessage());
//   };

//   const handleBlur = () => {
    
//   };
//   return (
//     <div className={styles.formWrapper}>
      
//       <form action="" onSubmit={handleSignin}>
//         {error && (
//           <div className={`${styles.status} ${styles.error}`}>{error}</div>
//         )}
//         {loading && (
//           <div className={`${styles.status} ${styles.loading}`}>loading</div>
//         )}
//         <Input
//           type="text"
//           placeholder="Логин"
//           value={login}
//           onChange={handleLogin}
//         />
//         <Input
//           type="password"
//           placeholder="Пароль"
//           value={password}
//           onChange={hadnlePassword}
//           onBlur={handleBlur}
//         />

//         <Button
//           onMouseOver={handleHover}
//           style={{ transform: `translate(${rand}px, 0)` }}
//         >
//         </Button>
//         <div className={styles.authQues}>
//           <span>
//             Нет аккаунта? <Link to="/spreader/signup">Регистрация</Link>
//           </span>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Signin;


import { Fragment, useEffect, useState } from "react";
import { Button, Select, Input } from "../../../shared/iu";
import { useDispatch, useSelector } from "react-redux";
import { getBranches } from "../../../app/features/branches/branchesSlice";
import s from "./Auth.module.scss";
import { Link } from "react-router-dom";
import cn from 'classnames';

const form = [
  // { name: "name", type: "text", placeholder: "Имя" },
  // { name: "surname", type: "text", placeholder: "Фамилия" },
  { name: "login", type: "text", placeholder: "Логин" },
  { name: "password", type: "password", placeholder: "Пароль" },
];

export const SignIn = () => {
  // const branches = useSelector((state) => state.branches.branches);
  // const dispatch = useDispatch();
  const [data, setData] = useState({
    // name: "",
    // surname: "",
    login: "",
    password: "",
    // branchId: "",
  });

  // useEffect(() => {
  //   dispatch(getBranches());
  // }, [dispatch]);

  const handleData = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  console.log(data);

  return (
    <form className={s.Form}>
      <h1 className={s.title}>Вход</h1>

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
              variant="underlined"
            />
          </Fragment>
        ))}
{/* 
        <Select
          name="branchId"
          value={data.branchId}
          array={branches}
          displayValue="name"
          selectValue="_id"
          onChange={handleData}
          className={cn(s.input, s.select)}
          variant="underlined"
        /> */}
      </div>

      <Button className={s.submit} variant="success">Войти</Button>

      <Link className={s.redirect} to={"/signup"}>
        <Button>Нет аккаунта?</Button>
      </Link>
    </form>
  );
};

