import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "../../shared/iu";
import { TaskHeaderLoader } from "../../shared/iu/Loaders/TaskHeaderLoader";
import TaskTimer from "../TaskTimer/TaskTimer";
import s from "./TaskHeader.module.scss";
// import Preloader from './../../shared/iu/Preloader/Preloader';
// import { TaskHeaderLoader } from "../../shared/iu/Loaders/TaskHeaderLoader";
// import Skeleton from "react-loading-skeleton";

const TaskHeader = ({ task, loading }) => {
  const [timerStarted, setTimerStarted] = useState(false);


  if(loading){
    return <TaskHeaderLoader />
  }

  return (
    <div className={s.TaskHeader}>
      <div className={s.points}>
        Баллы: <span> {task.points}  </span>
      </div>

      <TaskTimer
        task={task}
        timerStarted={timerStarted}
        className={`${s.timer} ${timerStarted ? s.timerStarted : ""}`}
      />
      <Button
        variant={timerStarted && "danger"}
        onClick={() => setTimerStarted(!timerStarted)}
      >
        {timerStarted ? "Остановить" : "Начать"}
      </Button>
    </div>
  );
};

export default TaskHeader;
