import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "../../../shared/iu";
import TaskTimer from "./TaskTimer/TaskTimer";
import s from "./TaskHeader.module.scss";

const TaskHeader = ({task}) => {
  // const task = useSelector((state) => state.tasks.task);
  const [timerStarted, setTimerStarted] = useState(false);

  return (
    <div className={s.TaskHeader}>
      <div className={s.points}>
        Баллы: <span> {task.points} </span>
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
