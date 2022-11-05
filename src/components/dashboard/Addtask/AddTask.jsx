import React from "react";
import s from "./AddTask.module.scss";
import TaskInputs from "./TaskInputs";

function AddTask({ openTask, setOpenTask }) {
  const handleClose = () => {
    setOpenTask(!openTask);
  };
  return (
    <div className={s.container}>
      <span onClick={handleClose} className={s.delete}>
        &times;
      </span>
      <TaskInputs />
    </div>
  );
}

export default AddTask;
