import React from "react";
import { useSelector } from "react-redux";
import Input from "./Input";
import s from "./TaskMessage.module.scss";

function TaskMessage({ click, reasons, reason }) {
  const messages = useSelector((state) => state.tasks.task.message);

  return (
    <div className={s.parent}>
      <div className={s.container}>
        <div className={s.taskState}>
          {click && (
            <div className={s.stateIcon}>
              <span>на удержании</span>
              <p className={s.reasonText}>{reasons[reason]}</p>
            </div>
          )}
        </div>
        <div className={s.messages}>
          {messages.map((item, ind) => {
            return (
              <div className={s.messageText} key={ind}>
                <p>{item}</p>
              </div>
            );
          })}
        </div>
      </div>
      <Input />
    </div>
  );
}

export default TaskMessage;
