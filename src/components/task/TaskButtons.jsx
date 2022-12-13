import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { closeTask, takeToWork } from "../../app/features/tasks/tasksSlice";
import s from "./TaskButtons.module.scss";

function TaskButtons({ setIsCounting }) {
  const dispatch = useDispatch();
  const payload = useSelector((state) => state.auth.payload);
  const task = useSelector((state) => state.tasks.task);
  const [inWork, setInWork] = useState(false);

  const loading = useSelector((state) => state.tasks.loading);
  const { taskId } = useParams();

  const handleToWorkTask = () => {
    dispatch(
      takeToWork({ taskId, userId: payload?.id, branchId: payload?.branchId })
    );
    setInWork(true);
  };

  const handleCloseTask = () => {
    dispatch(closeTask({ taskId }));
    setIsCounting(false);
    setInWork(false);
  };

  if (loading) {
    return <span className="loader"></span>;
  }

  if (
    (task?.state === "new" &&
      payload?.role === "USER" &&
      task.branchId === undefined) ||
    (task.branchId._id === payload?.branchId && task.userId === undefined)
  ) {
    return (
      <button onClick={handleToWorkTask} className={s.takeToWork}>
        Вязть в работу
      </button>
    );
  }

  if (
    (task?.state === "inWork" &&
      payload?.role === "USER" &&
      task?.userId?._id === payload?.id) ||
    inWork
  ) {
    return (
      <button onClick={handleCloseTask} className={s.close}>
        Завершить задачу
      </button>
    );
  }

  if (task?.state === "closed") {
    return (
      <Link to="/spreader/tasks" className={s.closed}>
        Завершено
      </Link>
    );
  }
}

export default TaskButtons;
