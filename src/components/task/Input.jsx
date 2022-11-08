import React from "react";
import s from "./Input.module.scss";
function Input() {
  return (
    <div className={s.container}>
      <input placeholder="Введите сообщение..." type="text" />
      <button>Отправить</button>
    </div>
  );
}

export default Input;
