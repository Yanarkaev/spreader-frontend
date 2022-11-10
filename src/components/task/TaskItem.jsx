import React from "react";
import s from "./TaskItem.module.scss";
import img from "../../assets/Admin/Admin.jpg";
import TaskMessage from "./TaskMessage";
import TaskButtons from "./TaskButtons";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getTaskById } from "../../app/features/tasks/tasksSlice";

function TaskItem({
  click,
  isCounting,
  setIsCounting,
  reasons,
  reason,
  setReason,
}) {
  const { taskId } = useParams();
  const task = useSelector((state) => state.tasks.task);
  const loading = useSelector(state => state.tasks.loading)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTaskById(taskId));
  }, [dispatch]);

  if (loading) {
    return <span className="loader"></span>
  }

  return (
    <div className={s.container}>
      <div className={s.Admin}>
        <div className={s.AdminLogo}>
          <img src={img} alt="/" />
        </div>
        <div>
          <span className={s.adminName}>Admin</span>
          <span className={s.adminMail}>admin@mail.ru</span>
        </div>
      </div>
      <div className={s.task}>
        <div className={s.taskName}>
          <h1>{task.title}</h1>
        </div>
        <div className={s.taskDescription}>
          <p>{task.text}</p>
        </div>
      </div>
      <TaskMessage
        click={click}
        isCounting={isCounting}
        reasons={reasons}
        reason={reason}
        setReason={setReason}
      />
      <TaskButtons isCounting={isCounting} setIsCounting={setIsCounting} />
    </div>
  );
}

export default TaskItem;
