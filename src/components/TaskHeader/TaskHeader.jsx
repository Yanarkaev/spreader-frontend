import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "../../shared/iu";
import { Loader } from "../../shared/iu/Loader/Loader";
import TaskTimer from "../TaskTimer/TaskTimer";
import s from "./TaskHeader.module.scss";
// import Preloader from './../../shared/iu/Preloader/Preloader';
// import { TaskHeaderLoader } from "../../shared/iu/Loaders/TaskHeaderLoader";
// import Skeleton from "react-loading-skeleton";

const TaskHeader = ({ task, loading, role }) => {
  const [timerStarted, setTimerStarted] = useState(false);

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

      {!loading && role !== "ADMIN" && (
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

export default TaskHeader;
