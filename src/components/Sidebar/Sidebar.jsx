import React, { useEffect } from "react";
import styles from "./sidebar.module.scss";
import { ReactComponent as DashboardIcon } from "../../assets/Aside/dashboard.svg";
import { ReactComponent as TasksIcon } from "../../assets/Aside/tasks.svg";
import { ReactComponent as ContactsIcon } from "../../assets/Aside/contacts.svg";
import { ReactComponent as DealsIcon } from "../../assets/Aside/deals.svg";
import { ReactComponent as LogoutIcon } from "../../assets/Aside/logout.svg";
import { useSelector, useDispatch } from "react-redux";
import { decodePayload, logOut } from "../../app/features/auth/authSlice";
import { Link, NavLink, useLocation } from "react-router-dom";

const Sidebar = () => {
  const payload = useSelector((state) => state.auth.payload);
  const token = useSelector((state) => state.auth.token);
  const location = useLocation().pathname;

  const sidebarItems = [
    {
      id: 1,
      name: "Все задачи",
      link: "/spreader/dashboard",
      taskIcon: DashboardIcon,
      className: styles.sidebarItem,
    },
    {
      id: 2,
      name: "Мои задачи",
      link: "/spreader/tasks",
      taskIcon: TasksIcon,
      className: styles.sidebarItem,
    },
    {
      id: 3,
      name: "Статистика",
      link: "/spreader/reports",
      taskIcon: DealsIcon,
      className: styles.sidebarItem,
    },
  ].filter((item) => (payload?.role === "ADMIN" ? item.id !== 2 : item));

  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(decodePayload());
    }
  }, [token]);

  const handleLogOut = () => {
    dispatch(logOut());
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.inner}>
        <div className={styles.profile}>
          {token && payload && (
            <div className={styles.name}>
              <span
                className={`${styles.avatar} ${
                  payload?.role === "ADMIN" ? styles.adminAvatar : ""
                }`}
              >
                {payload.login[0].toUpperCase()}
              </span>
            </div>
          )}

          <div className={styles.login}>
            {payload?.login?.split(" ").length > 1
              ? `${payload?.login?.split(" ")[0]} ${payload?.login
                  .split(" ")[1][0]
                  .toUpperCase()}.`
              : payload?.login?.split(" ")[0]}
          </div>

          {payload?.role !== "ADMIN" && (
            <div className={styles.branchName}>
              <span>Отдел: </span> <span>{payload?.branch}</span>
            </div>
          )}
        </div>

        <div className={styles.sidebarItemsWrapper}>
          {sidebarItems.map((item) => {
            return (
              <div
                className={item.className}
                key={item.id}
                style={item.link === location ? { color: "#109cf1" } : {}}
              >
                <NavLink to={item.link}>
                  <item.taskIcon
                    stroke="#C2CFE0"
                    className={styles.iconStroke}
                    style={item.link === location ? { stroke: "#109cf1" } : {}}
                  />
                  <span>{item.name}</span>
                </NavLink>
              </div>
            );
          })}

          {token && payload && payload.role === "ADMIN" && (
            <div
              className={styles.sidebarItem}
              style={location === "/spreader/admin" ? { color: "#109cf1" } : {}}
            >
              <Link to="/spreader/admin">
                <ContactsIcon
                  stroke="#C2CFE0"
                  className={styles.iconStroke}
                  style={
                    location === "/spreader/admin" ? { stroke: "#109cf1" } : {}
                  }
                />
                <span>Админка</span>
              </Link>
            </div>
          )}

          {token ? (
            <div
              className={`${styles.other} ${styles.sidebarItem}`}
              onClick={handleLogOut}
            >
              <LogoutIcon fill="#C2CFE0" className={styles.iconFill} />
              <span>Выйти в окно</span>
            </div>
          ) : (
            <div className={`${styles.other} ${styles.sidebarItem}`}>
              <Link to="/spreader/signin" className={styles.signInBtn}>
                Войти
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
