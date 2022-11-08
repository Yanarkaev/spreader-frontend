import React, { useState } from "react";

import s from "./TaskHeader.module.scss";

function TaskHeader({
  setIsCounting,
  minutes,
  seconds,
  isCounting,
  reasons,
  reason,
  setReason,
}) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleReason = (index) => {
    setIsCounting(false);
    setReason(index);
    setOpen(!open);
  };

  localStorage.setItem(
    "timer", // прописать id задачи
    JSON.stringify({ minutes, seconds, isCounting })
  );

  // const timer = JSON.parse(localStorage.getItem("timer"));

  const handleStart = () => {
    setIsCounting(true);
  };

  return (
    <div className={s.container}>
      <header className={s.header}>
        <div className={s.taskDescription}>
          <span>Номер задачи: </span>
          <h1 className={s.taskNumber}>1232194</h1>
        </div>
        <div>
          <span className={s.time}>{`${minutes}:${seconds}`}</span>
        </div>
        <div>
          {isCounting ? (
            <button onClick={handleOpen}>Удержание</button>
          ) : (
            <button onClick={handleStart}>Продолжить</button>
          )}
        </div>
      </header>
      {open && (
        <div className={s.timeModal}>
          <span className={s.reason}>Укажите причину</span>
          <ul>
            {reasons.map((reason, index) => {
              return (
                <li onClick={() => handleReason(index)} key={index}>
                  {reason}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

export default TaskHeader;
