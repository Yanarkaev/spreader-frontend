import { useEffect, useState } from "react";
import s from "./WorkerCard.module.scss";
import { getValidTasksCounterWord } from "./../../shared/helpers/getValidTasksCounterWord";
import { useNavigate } from "react-router-dom";

export const WorkerCard = ({ worker, tasks }) => {
  const [workerTasks, setWorkerTasks] = useState({
    inWork: 0,
    closed: 0,
    allTasks: 0,
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (tasks?.length) {
      const currentWorkerTasks = tasks.filter(
        (task) => task?.userId === worker?._id
      );

      setWorkerTasks({
        inWork: currentWorkerTasks.filter((el) => el.state === "inWork"),
        closed: currentWorkerTasks.filter((el) => el.state === "closed"),
        allTasks: currentWorkerTasks,
      });
    }
  }, [tasks, worker?._id]);

  return (
    <div
      className={s.WorkerCard}
      onClick={() => navigate("/spreader/tasks/" + worker?._id)}
    >
      <div className={s.info}>
        <div className={s.img}></div>
        <span className={s.name}>{worker?.login}</span>
        <span className={s.branch}>{worker?.branchId?.name}</span>
      </div>

      <div className={s.tasksCount}>
        <div className={s.allTasks}>
          {workerTasks.allTasks.length + " "}
          {getValidTasksCounterWord(workerTasks.allTasks.length)}
        </div>
        <div
          className={s.inWork}
          title={`В работе ${workerTasks.inWork.length}`}
        >
          <span></span>
          {workerTasks.inWork.length}
        </div>
        <div
          className={s.closed}
          title={`Выполнено ${workerTasks.closed.length}`}
        >
          <span></span>
          {workerTasks.closed.length}
        </div>
      </div>
    </div>
  );
};
