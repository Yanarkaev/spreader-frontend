import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUsers } from "./../../app/features/users/usersSlice";
import { getTasks } from "./../../app/features/tasks/tasksSlice";
import styles from "./users.module.scss";
import { Link } from "react-router-dom";
import { useState } from "react";

const User = ({ user }) => {
  const tasks = useSelector((state) => state.tasks.tasks);
  const dispatch = useDispatch();


  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  return (
    <>
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
                    key={task._id}
                  >
                    <div className={styles.taskTitle}>{task.title}</div>
                  </Link>
                )
              }
            })}
        </div>
      </div>
    </>
  )
};

export default User;
