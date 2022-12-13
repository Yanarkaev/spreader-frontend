import React from "react";
import s from "./TaskInputs.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { getBranches } from "./../../../app/features/branches/branchesSlice";
import { useEffect } from "react";
import { addTask } from "../../../app/features/tasks/tasksSlice";
import { getUsers } from "./../../../app/features/users/usersSlice";
function TaskInputs() {
  const dispatch = useDispatch();
  const branches = useSelector((state) => state.branches.branches);
  const users = useSelector((state) => state.users.users);

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [branch, setBranch] = useState("Все");
  const [time, setTime] = useState("");
  const [points, setPoints] = useState("");
  const [user, setUser] = useState("Все");
  console.log(user);

  const inputsFilled =
    branch == "Все"
      ? title && text && time && points
      : title && text && time && points && user;

  useEffect(() => {
    dispatch(getBranches());
    dispatch(getUsers());
  }, [dispatch]);

  const handleAddTask = () => {
    dispatch(
      addTask({ title, text, branchId: branch, time, points, userId: user })
    );
  };

  return (
    <div className={s.container}>
      <div className={s.title}>
        <input
          placeholder="Введите название"
          type="text"
          value={title}
          onChange={(e) =>
            e.target.value[0] !== " " && setTitle(e.target.value)
          }
        />
      </div>

      <div className={s.text}>
        <textarea
          placeholder="Опишите задачу..."
          name=""
          id=""
          cols="30"
          rows="10"
          value={text}
          onChange={(e) => e.target.value[0] !== " " && setText(e.target.value)}
        />
      </div>

      <div className={s.flex}>
        <div className={s.department}>
          <span>Выберите отдел</span>
          <select
            name="Отдел"
            value={branch}
            onChange={(e) => {
              setBranch(e.target.value);
            }}
          >
            <option value={"Все"}>Все</option>
            {branches.map((item) => {
              return (
                <option value={item._id} key={item._id}>
                  {item.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className={s.time}>
          <span>Время исполнения</span>
          <input
            placeholder="Время..."
            type="number"
            value={time}
            onChange={(e) =>
              e.target.value[0] !== " " && setTime(e.target.value)
            }
            min="5"
          />
        </div>
        <div className={s.time}>
          <span>Баллы</span>
          <input
            placeholder="Баллы... "
            type="number"
            value={points}
            onChange={(e) => setPoints(e.target.value)}
            min="5"
          />
        </div>
        {branch !== "Все" && (
          <div className={s.user}>
            <span>Пользователь</span>
            <select value={user} onChange={(e) => setUser(e.target.value)}>
              <option value="Все">Все</option>
              {users.map((item, index) => {
                if (item.branchId._id === branch) {
                  return (
                    <option value={item._id} key={item._id}>
                      {item.login}
                    </option>
                  );
                }
              })}
            </select>
          </div>
        )}
      </div>
      <button
        disabled={!inputsFilled}
        className={`${s.btn} ${!inputsFilled && s.btnDisabled}`}
        onClick={handleAddTask}
      >
        Создать Задачу
      </button>
    </div>
  );
}

export default TaskInputs;
