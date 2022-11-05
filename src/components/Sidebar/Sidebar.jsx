import React, { useEffect } from "react";
import styles from "./sidebar.module.scss";
import { ReactComponent as DashboardIcon } from "../../assets/Aside/dashboard.svg";
import { ReactComponent as TasksIcon } from "../../assets/Aside/tasks.svg";
import { ReactComponent as ContactsIcon } from "../../assets/Aside/contacts.svg";
import { ReactComponent as DealsIcon } from "../../assets/Aside/deals.svg";
import { ReactComponent as LogoutIcon } from "../../assets/Aside/logout.svg";
import { useSelector, useDispatch } from "react-redux";
import { decodePayload, logOut } from "../../app/features/auth/authSlice";
import { Link, redirect } from "react-router-dom";

const Sidebar = () => {
  const payload = useSelector((state) => state.auth.payload);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(decodePayload());
      redirect("/we");
    }
  }, [token]);

  const handleLogOut = () => {
    dispatch(logOut());
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>
        <h1>LOGO</h1>
      </div>

      <div className={styles.profile}>
        {token && payload && <div className={styles.name}>{payload.login}</div>}
      </div>

      <div className={styles.sidebarItemsWrapper}>
        <div className={styles.sidebarItem}>
          <DashboardIcon stroke="#C2CFE0" className={styles.iconStroke} />
          <span>Все задачи</span>
        </div>
        <div className={styles.sidebarItem}>
          <TasksIcon stroke="#C2CFE0" className={styles.iconStroke} />
          <span>Мои задачи</span>
        </div>
        <div className={styles.sidebarItem}>
          <DealsIcon stroke="#C2CFE0" className={styles.iconStroke} />
          <span>Отчеты</span>
        </div>
        {payload && payload.role === "ADMIN" && (
          <div className={styles.sidebarItem}>
            <ContactsIcon stroke="#C2CFE0" className={styles.iconStroke} />
            <span>Админка</span>
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
