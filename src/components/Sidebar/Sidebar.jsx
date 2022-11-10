import React, { useEffect } from "react";
import styles from "./sidebar.module.scss";
import { ReactComponent as DashboardIcon } from "../../assets/Aside/dashboard.svg";
import { ReactComponent as TasksIcon } from "../../assets/Aside/tasks.svg";
import { ReactComponent as ContactsIcon } from "../../assets/Aside/contacts.svg";
import { ReactComponent as DealsIcon } from "../../assets/Aside/deals.svg";
import { ReactComponent as LogoutIcon } from "../../assets/Aside/logout.svg";
import { useSelector, useDispatch } from "react-redux";
import { decodePayload, logOut } from "../../app/features/auth/authSlice";
import { Link, NavLink } from "react-router-dom";

const Sidebar = () => {
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
      name: "Отчеты",
      link: "/spreader/reports",
      taskIcon: DealsIcon,
      className: styles.sidebarItem,
    },
  ];

  const payload = useSelector((state) => state.auth.payload);
  const token = useSelector((state) => state.auth.token);
  const branch = useSelector((state) => state.auth.branch);
  // const branch = useSelector((state) => state.branches.branches)?.find(
  //   (item) => item._id === payload.branch
  // )?.name;

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
      <div className={styles.profile}>
        {token && payload && (
          <div className={styles.name}>
            <span className={`${styles.avatar} ${payload?.role === "ADMIN" ? styles.adminAvatar : ''}`}>
              {payload.login[0].toUpperCase()}
            </span>
            <span className={styles.login}>{payload.login}</span>
          </div>
        )}

        {payload?.role !== "ADMIN" && (
          <div className={styles.branchName}>
            <span>Отдел</span> <span>{payload.branch}</span>
          </div>
        )}
      </div>

      <div className={styles.sidebarItemsWrapper}>
        {sidebarItems.map((item) => {
          return (
            <div className={item.className} key={item.id}>
              <NavLink to={item.link}>
                <item.taskIcon stroke="#C2CFE0" className={styles.iconStroke} />
                <span>{item.name}</span>
              </NavLink>
            </div>
          );
        })}

        {token && payload && payload.role === "ADMIN" && (
          <div className={styles.sidebarItem}>
            <Link to="/spreader/admin">
              <ContactsIcon stroke="#C2CFE0" className={styles.iconStroke} />
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
  );
};

export default Sidebar;
