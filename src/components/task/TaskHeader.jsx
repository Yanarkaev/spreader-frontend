import React from "react";
import s from "./TaskHeader.module.scss";

function TaskHeader() {
  return (
    <div className={s.container}>
      <header className={s.header}>
        <div>
          <span>№ </span>
          <h1 className={s.taskNumber}>1232194</h1>
        </div>
        <div>
          <span className={s.time}>120:67</span>
          <button>Удержание</button>
        </div>
      </header>
      <div className={s.timeModal}>
        <span className={s.reason}>Укажите причину</span>
        <ul>
          <li>Туалети вах масть ю</li>
          <li>По поручению Администратора</li>
          <li>Дали другую задачу</li>
        </ul>
      </div>
    </div>
  );
}

export default TaskHeader;
