import React, { useState } from "react";
import { Button } from "../../shared/iu";
import { Loader } from "../../shared/iu/Loader/Loader";
import {TaskTimer} from "../";
import s from "./TaskHeader.module.scss";
import { useSelector } from "react-redux";

export const TaskHeader = ({ task, loading, role }) => {
  const [timerStarted, setTimerStarted] = useState(false);
  const payload = useSelector((state) => state.auth.payload);

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
        timerStarted={timerStarted}
        className={`${s.timer} ${timerStarted ? s.timerStarted : ""}`}
      />

      {payload?.role === "USER" &&
        (payload?.id === task?.userId?._id || task?.branchId === undefined) && (
          <Button
            variant={timerStarted && "danger"}
            onClick={() => setTimerStarted(!timerStarted)}
          >
            {timerStarted ? "Остановить" : "Начать"}
          </Button>
        )}
    </div>
  );
};
