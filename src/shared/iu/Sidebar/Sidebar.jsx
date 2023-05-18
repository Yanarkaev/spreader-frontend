import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { decodePayload, logOut } from "../../../app/features/auth/authSlice";
import { Link, useLocation } from "react-router-dom";
import { Icon } from "../Icon/Icon";
import s from "./Sidebar.module.scss";
import cn from "classnames";

export const Sidebar = React.memo(() => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const payload = useSelector((state) => state.auth.payload);
  const location = useLocation().pathname;

  const name = payload?.name;
  const surname = payload?.surname;
  const role = payload?.role;
  const branch = payload?.branch;

  const sidebarData = [
    {
      icon: "dashboard",
      route: "/dashboard",
      text: "Все задачи",
    },
    {
      icon: "tasks",
      route: "/tasks/" + payload?.id,
      text: "Мои задачи",
    },
    {
      icon: "contacts",
      route: "/monitoring",
      text: "Мониторинг",
    },
    {
      icon: "deals",
      route: "/reports",
      text: "Отчеты",
    },
    {
      icon: "admin",
      route: "/admin",
      text: "Админ-панель",
      fill: true,
    },
  ].filter((_, index) => (role === "ADMIN" ? index !== 1 : index !== 4));

  useEffect(() => {
    if (token) {
      dispatch(decodePayload());
    }
  }, [token, dispatch]);

  const handleLogOut = () => {
    dispatch(logOut());
  };

  return (
    <div className={s.Sidebar}>
      <div className={s.inner}>
        <div className={s.profile}>
          <div className={s.avatar}>
            {name && name[0].toUpperCase()}
            {name && surname[0].toUpperCase()}
          </div>
          <div className={s.login}>
            {name} {surname}
          </div>
          {branch && (
            <div className={s.branchName}>
              <span>Отдел: </span> <span>{branch}</span>
            </div>
          )}
        </div>

        <div className={s.sidebarItemsWrapper}>
          {sidebarData.map((el, index) => (
            <Link
              to={el.route}
              key={index}
              className={`${s.navItem} ${
                el.route === location ? s.active : ""
              }`}
            >
              <Icon
                name={el.icon}
                stroke="#C2CFE0"
                fill={`${el.fill ? "#C2CFE0" : "transparent"}`}
                className={cn(s.icon, el.fill && s.fillIcon)}
              />
              <span>{el.text}</span>
            </Link>
          ))}

          <div className={`${s.navItem} ${s.logout}`} onClick={handleLogOut}>
            <Icon name="logout" stroke="#C2CFE0" className={s.icon} />
            <span>Выйти</span>
          </div>
        </div>
      </div>
    </div>
  );
});
