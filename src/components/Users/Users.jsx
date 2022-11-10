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

  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getTasks());
  }, [dispatch]);

  if (loading) {
    return <span className="loader"></span>;
  }

  return (
    <div className={styles.wrapper}>
      {/* {users.map((user) => {
        return (
          <div className={styles.userInfoWrapper}>
            <div className={styles.user} onClick={() => setOpen(!open)}>
              <div className={styles.login}>{user.login}</div>
              <div className={styles.branch}>
                Отдел: <span>{user.branchId.name}</span>
              </div>
            </div>

            <div className={styles.tasksWrapper}>
              {open &&
                tasks.map((task) => {
                  if (task.userId === user._id) {
                    return (
                      <Link
                        to={`/spreader/dashboard/${task._id}`}
                        className={styles.task}
                      >
                        <div className={styles.taskTitle}>{task.title}</div>
                      </Link>
                    );
                  }
                })}
            </div>
          </div>
        );
      })} */}
      {users.map((user) => {
        return (
          <div key={user._id}>
            <User user={user} />
          </div>
        )
      })}
    </div>
  );
};

export default Users;
