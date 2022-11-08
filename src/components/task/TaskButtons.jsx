import React, { useState } from "react";
import s from "./TaskButtons.module.scss";
function TaskButtons({ isCounting, setIsCounting }) {
  const [toWork, settoWork] = useState(false);
  const handleToWorkTask = () => {
    settoWork(true);
    setIsCounting(true);
    console.log(isCounting);
  };
  const handleCloseTask = () => {
    settoWork(false);
  };
  return (
    <div className={s.container}>
      {toWork ? (
        <button onClick={handleCloseTask} className={s.close}>
          Завершить задачу
        </button>
      ) : (
        <button onClick={handleToWorkTask} className={s.takeToWork}>
          {" "}
          Вязть в работу
        </button>
      )}
    </div>
  );
}

export default TaskButtons;
