import React from "react";
import s from "./Task.module.scss";
import TaskHeader from "./TaskHeader";

function Task() {
  return (
    <div className={s.container}>
      <TaskHeader />
      
    </div>
  );
}

export default Task;
