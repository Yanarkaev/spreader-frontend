import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUsers } from "./../../app/features/users/usersSlice";
import { getTasks } from "./../../app/features/tasks/tasksSlice";
import styles from "./users.module.scss";
import User from "./User";
import { WorkerCard } from "../WorkerCard/WorkerCard";

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
      {users.map((user) => {
        return <WorkerCard user={user} tasks={tasks}/>;
      })}
    </div>
  );
};

export default Users;
