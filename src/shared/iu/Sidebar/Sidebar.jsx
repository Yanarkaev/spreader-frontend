import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { decodePayload, logOut } from "../../../app/features/auth/authSlice";
import { Link, useLocation } from "react-router-dom";
import { Icon } from "../Icon/Icon";
import s from "./Sidebar.module.scss";

export const Sidebar = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const payload = useSelector((state) => state.auth.payload);

  const location = useLocation().pathname;

  const username = payload?.login?.split(" ")[0] || " ";
  const role = payload?.role;
  const branch = payload?.branch;

  const sidebarData = [
    {
      icon: "dashboard",
      route: "/spreader/dashboard",
      text: "Все задачи",
    },
    {
      icon: "tasks",
      route: "/spreader/tasks/" + payload?.id,
      text: "Мои задачи",
    },
    {
      icon: "contacts",
      route: "/spreader/admin",
      text: "Мониторинг",
    },
    {
      icon: "deals",
      route: "/spreader/reports",
      text: "Отчеты",
    },
  ].filter((_, index) => (role === "ADMIN" ? index !== 1 : index !== 2));

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
          <div className={s.avatar}>{username[0].toUpperCase()}</div>
          <div className={s.login}>{username}</div>
          {role !== "ADMIN" && (
            <div className={s.branchName}>
              <span>Отдел: </span> <span>{branch}</span>
            </div>
          )}
        </div>

        <div className={s.sidebarItemsWrapper}>
          {sidebarData.map((el, index) => (
            <div
              className={`${s.navItem} ${
                el.route === location ? s.active : ""
              }`}
              key={index}
            >
              <Link to={el.route} className={s.navLink}>
                <Icon name={el.icon} stroke="#C2CFE0" className={s.icon} />
                <span>{el.text}</span>
              </Link>
            </div>
          ))}

          <div className={s.navItem} onClick={handleLogOut}>
            <div className={s.navLink}>
              <Icon name="logout" stroke="#C2CFE0" className={s.icon} />
              <span>Выйти в окно</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
