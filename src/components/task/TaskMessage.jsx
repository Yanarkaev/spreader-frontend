import React from "react";
import { useSelector } from "react-redux";
import Input from "./Input";
import s from "./TaskMessage.module.scss";

function TaskMessage({ click, isCounting, reasons, reason }) {
  const messages = useSelector((state) => state.tasks.task.message);
  const task = useSelector((state) => state.tasks.task);

  // if (task?.state !== "closed") {
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
            {/* <div className={s.stateIcon}>
            {!isCounting && reason !== null && <span>На удержании</span>}
          </div>
          <div className={s.stateReason}>
            {!isCounting && reason >= 0 ? (
              <span className={s.reasonText}>{reasons[reason]}</span>
            ) : null}
          </div> */}
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
  // }
}

export default TaskMessage;
