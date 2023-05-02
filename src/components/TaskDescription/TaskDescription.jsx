import React from "react";
import s from "./TaskDescription.module.scss";
import { Loader } from "./../../shared/iu/Loader/Loader";

export const TaskDescription = ({ task, loading }) => {
  const text = task?.text?.split("/абзац/") || [];

  return (
    <div className={s.TaskDescription}>
      <h1 className={s.title}>
        {loading ? <Loader w="400px" h="40px" /> : task.title}
      </h1>
      <div className={s.text}>
        {loading
          ? new Array(12).fill(0).map((el, i) => {
              return (
                <Loader
                  w="100%"
                  h="20px"
                  margin={`${i % 4 === 0 ? "25px 0 0" : "5px 0"}`}
                  key={i}
                />
              );
            })
          : text.map((par, i) => {
              return <p key={par + i}>{par}</p>;
            })}
      </div>
    </div>
  );
};
