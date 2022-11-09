import React from "react";
import s from "./Task.module.scss";
import TaskHeader from "./TaskHeader";
import TaskItem from "./TaskItem";
import { getPadTime } from "../../helpers/getPadTime";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTaskById } from "../../app/features/tasks/tasksSlice";

function Task() {
  const [click, setClick] = useState(false);
  const { taskId } = useParams();
  const task = useSelector((state) => state.tasks.task);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTaskById(taskId));
  }, [dispatch]);

  //====================================  Таймер  =========================================//
  const timer = JSON.parse(localStorage.getItem(taskId));

  const [timeLeft, setTimeLeft] = useState(
    (Number(timer?.minutes) || +task?.time) * 60 + (Number(timer?.seconds) || 0)
  );

  // ssaas?.isCounting || false
  const [isCounting, setIsCounting] = useState(
    timer?.isCounting === "false" ? true : false
  );

  let minutes = getPadTime(Math.floor(timeLeft / 60));
  let seconds = getPadTime(timeLeft - minutes * 60);
  console.log(minutes, seconds);

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
  if (!task) {
    return "Loading";
  }

  return (
    <div className={s.container}>
      {task ? (
        <TaskHeader
          setClick={setClick}
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
      ) : (
        "..."
      )}
      <TaskItem
        click={click}
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
