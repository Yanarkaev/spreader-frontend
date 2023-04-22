import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUsers } from "./../../app/features/users/usersSlice";
import { getTasks } from "./../../app/features/tasks/tasksSlice";
import styles from "./users.module.scss";
import { WorkerCard } from "../WorkerCard/WorkerCard";

const Users = () => {
  const users = useSelector((state) => state.auth.users);
  const loading = useSelector((state) => state.auth.loading);
  const tasks = useSelector((state) => state.tasks.tasks);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getTasks());
  }, [dispatch]);

  console.log(users);

  if (loading) {
    return <span className="loader"></span>;
  }

  return (
    <div className={styles.wrapper}>
      {users.map((user) => {
        return <WorkerCard key={user._id} worker={user} tasks={tasks} loading={loading}/>;
      })}
    </div>
  );
};

export default Users;
