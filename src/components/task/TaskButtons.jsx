import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  closeTask,
  getTaskById,
  takeToWork,
} from "../../app/features/tasks/tasksSlice";
import s from "./TaskButtons.module.scss";
function TaskButtons({ setIsCounting }) {
  const dispatch = useDispatch();
  const payload = useSelector((state) => state.auth.payload);
  const task = useSelector((state) => state.tasks.task);
  const loading = useSelector((state) => state.tasks.loading);
  const { taskId } = useParams();

  const handleToWorkTask = () => {
    dispatch(takeToWork({ taskId, userId: payload?.id }));
  };

  const handleCloseTask = () => {
    dispatch(closeTask({ taskId }));
    setIsCounting(false);
  };

  if (loading) {
    return <span className="loader"></span>;
  }

  if (task?.state === "new" && payload?.role === "USER") {
    return (
      <button onClick={handleToWorkTask} className={s.takeToWork}>
        Вязть в работу
      </button>
    );
  }

  if (task?.state === "inWork" && payload?.role === "USER") {
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
