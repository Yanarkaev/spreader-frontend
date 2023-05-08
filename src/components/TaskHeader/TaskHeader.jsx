import React, { useState } from "react";
import { Button } from "../../shared/iu";
import { Loader } from "../../shared/iu/Loader/Loader";
import { TaskTimer } from "../";
import s from "./TaskHeader.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { changeTime } from "../../app/features/tasks/tasksSlice";

export const TaskHeader = ({ task, loading, role }) => {
  const dispatch = useDispatch();
  const { taskId } = useParams();
  const timer = JSON.parse(localStorage.getItem(taskId));
  const startedTime = Math.floor(Date.now() / 1000);

  const [isStarted, setIsStarted] = useState(timer?.started);
  const payload = useSelector((state) => state.auth.payload);

  useEffect(() => {
    // if (timer && timer.startedTime) {
    // dispatch(
    //   changeTime({
    //     taskId,
    //     time: timer.startedTime - Math.floor(Date.now() / 1000),
    //   })
    // );
    // }
  }, [dispatch]);

  console.log("now", Math.floor(Date.now() / 1000) - timer?.startedTime);
  console.log("started", timer?.startedTime);

  // useEffect(() => {
  //   // if (isStarted) {
  //   localStorage.setItem(
  //     taskId,
  //     JSON.stringify({ ...timer, started: isStarted })
  //   );
  //   // }
  // }, [isStarted]);

  // useEffect(() => {
  //   if (isStarted) {
  //     localStorage.setItem(
  //       taskId,
  //       JSON.stringify({
  //         started: isStarted,
  //         startedTime: Math.floor(Date.now() / 1000),
  //       })
  //     );
  //   }
  // }, [isStarted]);

  return (
    <div className={s.TaskHeader}>
      {loading ? (
        <Loader w="100px" h="30px" />
      ) : (
        <div className={s.points}>
          Баллы: <span> {task.points} </span>
        </div>
      )}

      <TaskTimer
        task={task}
        loading={loading}
        isStarted={isStarted}
        startedTime={startedTime}
        timer={timer}
        className={`${s.timer} ${isStarted ? s.timerStarted : ""}`}
      />

      {payload?.role === "USER" &&
        (payload?.id === task?.userId?._id || task?.branchId === undefined) && (
          <Button
            variant={isStarted && "danger"}
            onClick={() => setIsStarted(!isStarted)}
          >
            {isStarted ? "Остановить" : "Начать"}
          </Button>
        )}
    </div>
  );
};
