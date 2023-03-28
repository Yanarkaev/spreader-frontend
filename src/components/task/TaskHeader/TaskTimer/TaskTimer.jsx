import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPadTime } from "../../../../shared/helpers/getPadTime";

const TaskTimer = ({ task }) => {
  const { taskId } = useParams();

  const timer = JSON.parse(localStorage.getItem(taskId));
  console.log(timer);

  const [timeLeft, setTimeLeft] = useState(
    (Number(timer?.minutes) || +task?.time) * 60 + (Number(timer?.seconds) || 0)
  );

  //    const [isCounting, setIsCounting] = useState(
  //     timer?.isCounting === "false" ? true : false
  //   );

  console.log(timeLeft);
  const [isCounting, setIsCounting] = useState(false);

  let minutes = getPadTime(Math.floor(timeLeft / 60));
  let seconds = getPadTime(timeLeft - minutes * 60);

  useEffect(() => {
    const interval = setInterval(() => {
      if (timeLeft >= 1) {
        setTimeLeft((prev) => prev - 1);
      }

      //   localStorage.setItem(
      //     taskId,
      //     JSON.stringify({ minutes: minutes, seconds, isCounting })
      //   );
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [isCounting]);

  useEffect(() => {
    localStorage.setItem(
      taskId,
      JSON.stringify({ minutes: minutes, seconds, isCounting })
    );
  }, [timeLeft]);

  useEffect(() => {
    if (!timer) {
      localStorage.setItem(
        task._id,
        JSON.stringify({ minutes, seconds, isCounting })
      );
    }
  }, [task]);

  return (
    <div>
      {minutes}:{seconds}
    </div>
  );
};

export default TaskTimer;
