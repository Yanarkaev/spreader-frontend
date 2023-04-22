import { useEffect, useState } from "react";
import s from "./WorkerCard.module.scss";
import { getValidTasksCounterWord } from "./../../shared/helpers/getValidTasksCounterWord";

export const WorkerCard = ({ user, tasks }) => {
  const [workerTasks, setWorkerTasks] = useState({
    inWork: 0,
    closed: 0,
    allTasks: 0,
  });

  useEffect(() => {
    const currentWorkerTasks = tasks.filter(
      (task) => task?.userId === user._id
    );

    setWorkerTasks({
      inWork: currentWorkerTasks.filter((el) => el.state === "inWork"),
      closed: currentWorkerTasks.filter((el) => el.state === "closed"),
      allTasks: currentWorkerTasks,
    });
  }, [tasks, user._id]);

  return (
    <div className={s.WorkerCard}>
      <div className={s.info}>
        <div className={s.img}></div>
        <span className={s.name}>{user.login}</span>
        <span className={s.branch}>{user.branchId.name}</span>
      </div>

      <div className={s.tasksCount}>
        <div className={s.allTasks}>
          {workerTasks.allTasks.length}{" "}
          {getValidTasksCounterWord(workerTasks.allTasks.length)}{" "}
        </div>
        <div className={s.inWork} title="В работе">
          <span></span>
          {workerTasks.inWork.length}
        </div>
        <div className={s.closed} title="Выполнено">
          <span></span>
          {workerTasks.closed.length}
        </div>
      </div>
    </div>
  );
};
