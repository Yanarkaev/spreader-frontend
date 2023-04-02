import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "../../../shared/iu";
import TaskTimer from "./TaskTimer/TaskTimer";

const TaskHeader = () => {
  const task = useSelector((state) => state.tasks.task);
  const [timerStarted, setTimerStarted] = useState(false);
  // console.log(task);
  return (
    <div>
      <div>Баллы: {task.points}</div>
      <TaskTimer task={task} timerStarted={timerStarted} />
      <Button variant="success" onClick={() => setTimerStarted(!timerStarted)}>
        {timerStarted ? "Остановить" : "Начать"}
      </Button>
    </div>
  );
};

export default TaskHeader;
