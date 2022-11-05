import React, { useState } from "react";
import s from "./Dashboard.module.scss";
import img from "../../assets/Dashboard/Polygon.svg";
import AddTask from "./Addtask/AddTask";
function Department() {
  const [opened, isOpened] = useState(false);
  const [openTask, setOpenTask] = useState(false);
  const handleOpenAddTask = () => {
    setOpenTask(!openTask);
  };
  const handleCLick = () => {
    isOpened(!opened);
  };
  const handleOpen = () => {
    isOpened(!opened);
  };
  return (
    <>
      <div className={s.Department}>
        <div>
          <span>
            Фильтр по отделам:{" "}
            <span onClick={handleOpen} className={s.textBlue}>
              Все
            </span>
          </span>
          <img onClick={handleCLick} src={img} alt="logo" />
        </div>
        <div>
          <button onClick={handleOpenAddTask} className={s.btn}>
            Добавить задачу
          </button>
          {openTask && (
            <AddTask openTask={openTask} setOpenTask={setOpenTask} />
          )}
        </div>

        {opened ? (
          <div className={s.modal}>
            <ul>
              <li>Отделллл - 1</li>
              <li>Отделллл - 2</li>
              <li>Отделл - 3</li>
              <li>Отделллл - 4</li>
            </ul>
          </div>
        ) : null}
      </div>
    </>
  );
}

export default Department;
