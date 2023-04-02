import React, { useState } from "react";
import { useSelector } from "react-redux";
import s from "./TaskHeader.module.scss";

function TaskHeader({
  setIsCounting,
  minutes,
  seconds,
  isCounting,
  // reasons,
  // setReason,
  // setClick,
}) {
  const task = useSelector((state) => state.tasks.task);
  const payload = useSelector((state) => state.auth.payload);
  // console.log(payload);

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleReason = (index) => {
    setIsCounting(false);
    // setReason(index);
    setOpen(!open);
    // setClick(true);
  };

  localStorage.setItem(
    `${task._id}`,
    JSON.stringify({ minutes, seconds, isCounting })
  );

  const handleStart = () => {
    setIsCounting(true);
    // setClick(false);
  };

  return (
    <div className={s.container}>
      <header className={s.header}>
        <div className={s.taskDescription}>
          <span>Баллы: </span>
          <h1 className={s.taskNumber}>{task.points}</h1>
        </div>
        <div>
          <span className={s.time}>{`${minutes}:${seconds}`}</span>
        </div>
        {task?.state !== "closed" &&
          payload?.role === "USER" &&
           (
            <div>
              {isCounting ? (
                <button onClick={handleOpen}>Удержание</button>
              ) : (
                <button disabled={task.state === "new"} onClick={handleStart}>
                  Начать
                </button>
              )}
            </div>
          )}
      </header>
      {/* {open && (
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
      )} */}
    </div>
  );
}

export default TaskHeader;
