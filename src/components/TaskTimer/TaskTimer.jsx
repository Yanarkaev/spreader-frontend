import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPadTime } from "../../shared/helpers/getPadTime";
import { Loader } from "../../shared/iu/Loader/Loader";

export const TaskTimer = ({ task, loading, timerStarted, className }) => {
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
          started: timerStarted,
        })
      );
    }
  }, [task]);  // eslint-disable-line react-hooks/exhaustive-deps

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
  }, [timerStarted]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (timeLeft && timerStarted) {
      localStorage.setItem(
        taskId,
        JSON.stringify({ minutes, seconds, started: timerStarted })
      );
    }
  }, [timeLeft]); // eslint-disable-line react-hooks/exhaustive-deps

  const timerText = `${minutes}:${seconds}`

  return (
    <div className={className}>
      {loading ? <Loader w="110px" h="40px"/> : timerText}
    </div>
  );
};