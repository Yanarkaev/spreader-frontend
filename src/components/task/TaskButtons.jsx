import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { closeTask, takeToWork } from "../../app/features/tasks/tasksSlice";
import s from "./TaskButtons.module.scss";
function TaskButtons({ setIsCounting }) {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.payload.id);
  const { taskId } = useParams();

  const [toWork, settoWork] = useState(false);

  const handleToWorkTask = () => {
    settoWork(true);
    dispatch(takeToWork({ taskId, userId }));
    window.location.reload();
    // setIsCounting(true);
  };

  const handleCloseTask = () => {
    settoWork(false);
    dispatch(closeTask({ taskId }));
    setIsCounting(false);
  };

  return (
    <div className={s.container}>
      {toWork ? (
        <Link
          to="/spreader/dashboard"
          onClick={handleCloseTask}
          className={s.close}
        >
          Завершить задачу
        </Link>
      ) : (
        <button onClick={handleToWorkTask} className={s.takeToWork}>
          Вязть в работу
        </button>
      )}
    </div>
  );
}

export default TaskButtons;
