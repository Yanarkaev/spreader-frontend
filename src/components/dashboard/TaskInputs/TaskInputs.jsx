import React, { useState, useEffect } from "react";
import s from "./TaskInputs.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { getBranches } from "../../../app/features/branches/branchesSlice";
import { addTask } from "../../../app/features/tasks/tasksSlice";
import { getUsers } from "../../../app/features/users/usersSlice";
import { Button, Input, Select } from "../../../shared/iu";

function TaskInputs() {
  const dispatch = useDispatch();

  const [data, setData] = useState({
    title: "",
    text: "",
    branchId: "Все",
    time: "",
    points: "",
    userId: "Все",
  });

  const branches = useSelector((state) => state.branches.branches);
  const users = useSelector((state) => state.users.users).filter(
    (user) => user?.branchId?._id === data.branchId
  );

  const inputsFilled =
    data.branchId === "Все"
      ? data.title && data.text && data.time && data.points
      : data.title && data.text && data.time && data.points && data.userId;

  useEffect(() => {
    dispatch(getBranches());
    dispatch(getUsers());
  }, [dispatch]);

  const handleAddTask = () => {
    dispatch(addTask(data));
  };

  const handleData = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div className={s.container}>
      <div className={s.title}>
        <Input
          placeholder="Введите название"
          type="text"
          value={data.title}
          name="title"
          onChange={handleData}
        />
      </div>

      <div className={s.text}>
        <textarea
          placeholder="Опишите задачу..."
          name="text"
          cols="30"
          rows="10"
          value={data.text}
          onChange={handleData}
        />
      </div>

      <div className={s.flex}>
        <div className={s.department}>
          <span>Выберите отдел</span>
          <Select
            value={data.branchId}
            body="name"
            name="branchId"
            selectValue="_id"
            uniqueValue="_id"
            onChange={handleData}
            array={branches}
            initialValue="Все"
          />
        </div>

        <div className={s.time}>
          <span>Время исполнения</span>
          <Input
            placeholder="Время..."
            type="number"
            value={data.time}
            name="time"
            onChange={handleData}
            min="5"
          />
        </div>
        <div className={s.time}>
          <span>Баллы</span>
          <Input
            placeholder="Баллы... "
            type="number"
            name="points"
            value={data.points}
            onChange={handleData}
            min="5"
          />
        </div>
        {data.branchId !== "Все" && (
          <div className={s.user}>
            <span>Пользователь</span>
            <Select
              value={data.user}
              body="login"
              name="userId"
              selectValue="_id"
              uniqueValue="_id"
              onChange={handleData}
              array={users}
              initialValue="Все"
            />
          </div>
        )}
      </div>

      <Button
        className={s.btn}
        disabled={!inputsFilled}
        onClick={handleAddTask}
      >
        Создать Задачу
      </Button>
    </div>
  );
}

export default TaskInputs;
