import React from "react";
import s from "./TaskDescription.module.scss";

const TaskDescription = ({ task }) => {
  const text = task?.text?.split("/абзац/") || [];
  console.log(text);
  return (
    <div className={s.TaskDescription}>
      <h1 className={s.title}>{task.title}</h1>
      <div className={s.text}>
        {text.map((par) => {
          return (
            <>
              <p>{par}</p>
              <br />
            </>
          );
        })}
      </div>
      {/* <p className={s.text}>
        {task.text}
        Описание: Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Recusandae atque debitis magni optio aliquam non quasi iure ad
        aspernatur! Quis quasi perferendis animi obcaecati omnis eveniet nostrum
        dolorum ipsa vitae.
      </p> */}
    </div>
  );
};

export default TaskDescription;
