import React from "react";
import s from "./Task.module.scss";
import TaskHeader from "./TaskHeader";
import TaskItem from "./TaskItem";
import { getPadTime } from "../../helpers/getPadTime";
import { useState, useEffect } from "react";

function Task() {
  //====================================  Таймер  =========================================//
  const timer = JSON.parse(localStorage.getItem("timer"));

  const [timeLeft, setTimeLeft] = useState(
    (Number(timer?.minutes) || 130) * 60 + (Number(timer?.seconds) || 0)
  );

  // ssaas?.isCounting || false
  const [isCounting, setIsCounting] = useState(
    timer?.isCounting === "false" ? true : false
  );
  console.log(timer, timeLeft);
  let minutes = getPadTime(Math.floor(timeLeft / 60));
  let seconds = getPadTime(timeLeft - minutes * 60);

  useEffect(() => {
    const interval = setInterval(() => {
      isCounting &&
        setTimeLeft((timeLeft) => (timeLeft >= 1 ? timeLeft - 1 : 0));
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [isCounting]);

  // =================================== Reasons ========================================== \\
  const reasons = [
    "По поручению администратора",
    "Причина 2",
    "Причина 3",
    "Причина 4",
  ];

  const [reason, setReason] = useState(null);

  return (
    <div className={s.container}>
      <TaskHeader
        minutes={minutes}
        seconds={seconds}
        timeLeft={timeLeft}
        setTimeLeft={setTimeLeft}
        isCounting={isCounting}
        setIsCounting={setIsCounting}
        reasons={reasons}
        reason={reason}
        setReason={setReason}
      />
      <TaskItem
        reason={reason}
        setReason={setReason}
        reasons={reasons}
        isCounting={isCounting}
        setIsCounting={setIsCounting}
      />
    </div>
  );
}

export default Task;
