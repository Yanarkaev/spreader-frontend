import React from "react";
import Input from "./Input";
import s from "./TaskMessage.module.scss";

function TaskMessage({ isCounting, reasons, reason, setReason }) {
  return (
    <div className={s.parent}>
      <div className={s.container}>
        <div className={s.taskState}>
          {!isCounting && (
            <>
              <span>на удержании</span> <span>{reasons[reason]}</span>
            </>
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
          <div className={s.messageText}>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad
              tempora dolores provident totam est magni id iste quasi tenetur
              esse distinctio, vitae quisquam molestias fugiat officiis autem
              labore amet? Exercitationem.
            </p>
          </div>

          <div className={s.messageText}>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad
              tempora dolores provident totam est magni id iste quasi tenetur
              esse distinctio, vitae quisquam molestias fugiat officiis autem
              labore amet? Exercitationem.
            </p>
          </div>
        </div>
      </div>
      <Input />
    </div>
  );
}

export default TaskMessage;
