import React from "react";
import s from "./TaskInputs.module.scss";
function TaskInputs() {
  return (
    <div className={s.container}>
      <div className={s.title}>
        <input placeholder="Введите название" type="text" />
      </div>
      <div className={s.text}>
        <textarea
          placeholder="Опишите задачу..."
          name=""
          id=""
          cols="30"
          rows="10"
        ></textarea>
        {/* <input placeholder="Опишите задачу" type="text" /> */}
      </div>
      <div className={s.flex}>
        <div className={s.department}>
          <span>Выберите отдел</span>
          <select name="Отдел" id="">
            <option value="">Все</option>
            <option value="">Бухгалтерия</option>
            <option value="">АХО</option>
            <option value="">Все</option>
          </select>
        </div>
        <div className={s.time}>
          <span>Время исполнения</span>
          <input placeholder="Время.." type="number" />
        </div>
        <div className={s.time}>
          <span>Баллы</span>
          <input placeholder="Баллы.." type="number" />
        </div>
        <div className={s.user}>
          <span>Пользователь</span>
          <select name="Юзер" id="">
            <option value="">Юзер1</option>
            <option value="">Юзер2</option>
            <option value="">Юзер3</option>
          </select>
        </div>
      </div>
      <button className={s.btn}>Создать Задачу</button>
    </div>
  );
}

export default TaskInputs;
