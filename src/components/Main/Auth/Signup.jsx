// import React, { useEffect } from "react";
// import { Link } from "react-router-dom";
// import styles from "./auth.module.scss";
// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   setErrorMessage,
//   signup,
// } from "./../../../app/features/auth/authSlice";
// import { getBranches } from "./../../../app/features/branches/branchesSlice";
// import { Input } from "./../../../shared/iu/Input/Input";
// import { Button } from "./../../../shared/iu/Button/Button";

// const Signup = () => {
//   const branches = useSelector((state) => state.branches.branches);
//   const error = useSelector((state) => state.auth.error);
//   const loading = useSelector((state) => state.auth.loading);
//   const dispatch = useDispatch();

//   const [data, setData] = useState({
//     login: "",
//     password: "",
//     branchId: "",
//   });
//   // const [login, setLogin] = useState("");
//   // const [password, setPassword] = useState("");
//   // const [branch, setBranch] = useState("");
//   const [isEmpty, setIsEmpty] = useState(true);

//   useEffect(() => {
//     setIsEmpty(data.login && data.password && data.branchId ? false : true);
//   }, [data.login, data.password, data.branchId]);

//   useEffect(() => {
//     dispatch(getBranches());
//   }, [dispatch]);

//   useEffect(() => {
//     // branches[0] && setData(data.branchId[0]._id);
//   }, [branches]);

//   // useEffect(() => {
//   //   dispatch(signin({login, password}))
//   // }, [signedUp])

//   const handleSignup = (e) => {
//     e.preventDefault();
//     dispatch(signup(data));
//     // setTimeout(() => {
//     // dispatch(signin({login, password}))
//     // }, 1000)
//   };

//   const handleData = (e) => {
//     setData(...data, ([e.target.name] = e.target.value));
//   };

//   console.log(branches);
//   return (
//     <div className={styles.formWrapper}>
//       {/* <Select
//         value={data.branchId}
//         initialValue={branches[0]}
//         array={branches}
//         selectValue="_id"
//         body="name"
//       /> */}
//       <form action="" onSubmit={handleSignup}>
//         {error && (
//           <div className={`${styles.status} ${styles.error}`}>{error}</div>
//         )}
//         {loading && (
//           <div className={`${styles.status} ${styles.loading}`}>loading</div>
//         )}
//         <Input
//           name="login"
//           type="text"
//           placeholder="Логин"
//           value={data.login}
//           onChange={handleData}
//         />
//         <Input
//           name="password"
//           type="password"
//           placeholder="Пароль"
//           value={data.password}
//           onChange={handleData}
//         />

//         <p>
//           <span>Отдел:</span>
//           <select value={data.branchId} onChange={handleData}>
//             {branches.map((item) => {
//               return (
//                 <option value={item._id} key={item._id}>
//                   {item.name}
//                 </option>
//               );
//             })}
//           </select>
//         </p>

//         <Button
//           disabled={isEmpty || loading || error}
//           className={`${isEmpty || loading || error ? styles.disabled : ""}`}
//         >
//           Зарегистрироваться
//         </Button>
//         <div className={styles.authQues}>
//           <span>
//             Есть аккаунт? <Link to="/spreader/signin">Войти</Link>
//           </span>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Signup;

import { Fragment, useEffect, useState } from "react";
import { Button, Select, Input } from "../../../shared/iu";
import { useDispatch, useSelector } from "react-redux";
import { getBranches } from "../../../app/features/branches/branchesSlice";
import s from "./Auth.module.scss";
import { Link } from "react-router-dom";
import cn from 'classnames';

const form = [
  { name: "name", type: "text", placeholder: "Имя" },
  { name: "surname", type: "text", placeholder: "Фамилия" },
  { name: "login", type: "text", placeholder: "Логин" },
  { name: "password", type: "password", placeholder: "Пароль" },
];

export const SignUp = () => {
  const branches = useSelector((state) => state.branches.branches);
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
  }, [dispatch]);

  const handleData = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  console.log(data);

  return (
    <form className={s.Form}>
      <h1 className={s.title}>Регистрация</h1>

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

        <Select
          name="branchId"
          value={data.branchId}
          array={branches}
          displayValue="name"
          selectValue="_id"
          onChange={handleData}
          className={cn(s.input, s.select)}
          variant="underlined"
        />
      </div>

      <Button className={s.submit} variant="success">Зарегистрироваться</Button>

      <Link className={s.redirect} to="/signin">
        <Button>Есть аккаунт?</Button>
      </Link>
    </form>
  );
};
