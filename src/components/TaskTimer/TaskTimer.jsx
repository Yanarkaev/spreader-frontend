import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPadTime } from "../../shared/helpers/getPadTime";
import { Loader } from "../../shared/iu/Loader/Loader";
import { useDispatch } from "react-redux";
import { changeTime } from "../../app/features/tasks/tasksSlice";

export const TaskTimer = ({
  task,
  loading,
  timer,
  isStarted,
  startedTime,
  className,
}) => {
  const dispatch = useDispatch();
  const { taskId } = useParams();
  // const [timeLeft, setTimeLeft] = useState(
  //   timer ? Number(timer?.minutes * 60) + +timer?.seconds : 0
  // );

  const [timeLeft, setTimeLeft] = useState();

  let minutes = timeLeft && getPadTime(Math.floor(timeLeft / 60));
  let seconds = timeLeft && getPadTime(timeLeft - minutes * 60);

  useEffect(() => {
    if (task.time) {
      setTimeLeft(task.time * 60);
    }
  }, [task]);

  useEffect(() => {
    // if (timer?.started) {
    localStorage.setItem(
      taskId,
      JSON.stringify({
        started: isStarted,
        startedTime: isStarted
          ? Math.floor(Date.now() / 1000) + timeLeft
          : null,
      })
    );
    // }
    // console.log(timeLeft);

    

    // if (isStarted) {
    //   localStorage.setItem(
    //     taskId,
    //     JSON.stringify({
    //       started: isStarted,
    //       // startedTime: Math.floor(Date.now() / 1000),
    //     })
    //   );
    // }
  }, [isStarted]);

  console.log(timer?.startedTime);
  // console.log(Math.floor(timer?.startedTime - Date.now() / 1000));

  // console.log(timer?.startedTime);

  // useEffect(() => {
  //   if (timer === null) {
  //     setTimeLeft(+task.time * 60);
  //   }
  //   if (isStarted) {
  //     localStorage.setItem(
  //       taskId,
  //       JSON.stringify({
  //         minutes: task.time,
  //         seconds: 0,
  //         started: isStarted,
  //       })
  //     );
  //   }
  // }, [task]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (isStarted) {
      let interval;
      if (timeLeft > 0) {
        interval = setInterval(() => {
          setTimeLeft((prev) => prev - 1);
        }, 1000);
      }

      return () => clearInterval(interval);
    }
  }); // eslint-disable-line react-hooks/exhaustive-deps

  // useEffect(() => {
  //   if (timeLeft && isStarted) {
  //     localStorage.setItem(
  //       taskId,
  //       JSON.stringify({
  //         minutes,
  //         seconds,
  //         started: isStarted,
  //       })
  //     );
  //   }
  // }, [timeLeft, isStarted]); // eslint-disable-line react-hooks/exhaustive-deps

  // useEffect(() => {
  //   if (timer) {
  //     localStorage.setItem(
  //       taskId,
  //       JSON.stringify({ ...timer, started: isStarted })
  //     );
  //   }
  // }, [isStarted]);

  // useEffect(() => {
  //   dispatch(changeTime({taskId, }))
  // }, [dispatch])

  const timerText = timeLeft && `${minutes}:${seconds}`;

  return (
    <div className={className}>
      {loading ? <Loader w="110px" h="40px" /> : timerText}
    </div>
  );
};
