import React from "react";
import { useSelector } from "react-redux";
import TaskTimer from "./TaskTimer/TaskTimer";

const TaskHeader = () => {
  const task = useSelector((state) => state.tasks.task);
  console.log(task);
  return (
    <div>
      <div>Баллы: {task.points}</div>
      <TaskTimer task={task}/>
    </div>
  );
};

export default TaskHeader;
