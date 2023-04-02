import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPadTime } from "../../../../shared/helpers/getPadTime";

const TaskTimer = ({ task, timerStarted }) => {
  const { taskId } = useParams();
  const timer = JSON.parse(localStorage.getItem(taskId));
  const [timeLeft, setTimeLeft] = useState(
    timer ? Number(timer?.minutes * 60) + +timer?.seconds : 0
  );

  let minutes = getPadTime(Math.floor(timeLeft / 60));
  let seconds = getPadTime(timeLeft - minutes * 60);

  useEffect(() => {
    if (timer === null) {
      setTimeLeft(+task.time * 60);
    }
    if (timerStarted) {
      localStorage.setItem(
        taskId,
        JSON.stringify({
          minutes: task.time,
          seconds: 0,
          isCounting: false,
        })
      );
    }
  }, [task]);

  useEffect(() => {
    if (timerStarted) {
      let interval;
      if (timeLeft > 0) {
        interval = setInterval(() => {
          setTimeLeft((prev) => prev - 1);
        }, 1000);
      }

      return () => {
        clearInterval(interval);
      };
    }
  }, [timerStarted]);

  useEffect(() => {
    if (timeLeft && timerStarted) {
      localStorage.setItem(
        taskId,
        JSON.stringify({ minutes, seconds, isCounting: false })
      );
    }
  }, [timeLeft]);

  return (
    <div>
      {minutes}:{seconds}
    </div>
  );
};

export default TaskTimer;
