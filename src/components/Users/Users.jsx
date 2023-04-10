import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUsers } from "./../../app/features/users/usersSlice";
import { getTasks } from "./../../app/features/tasks/tasksSlice";
import styles from "./users.module.scss";
import { Link } from "react-router-dom";
import { useState } from "react";
import User from "./User";

const Users = () => {
  const users = useSelector((state) => state.auth.users);
  const loading = useSelector((state) => state.auth.loading);
  const tasks = useSelector((state) => state.tasks.tasks);
  const dispatch = useDispatch();

  console.log(tasks);
  useEffect(() => {
    dispatch(getUsers());
    dispatch(getTasks());
  }, [dispatch]);

  if (loading) {
    return <span className="loader"></span>;
  }

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <h1>Администрирование</h1>
        </div>
      </header>
      {users.map((user) => {
        return (
          <div key={user._id}>
            <User user={user} tasks={tasks}/>
          </div>
        );
      })}
    </div>
  );
};

export default Users;
