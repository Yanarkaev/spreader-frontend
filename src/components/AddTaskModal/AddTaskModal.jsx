import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../../app/features/tasks/tasksSlice";
import { Button, Input, Select, Textarea } from "../../shared/iu";
import s from "./AddTaskModal.module.scss";
import cn from "classnames";

export const AddTaskModal = ({ openModal, setOpenModal }) => {
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

  const workersList = useSelector((state) => state.users.workersList).filter(
    (user) => user?.branchId?._id === data.branchId
  );

  const requiredFields = ["title", "text", "time", "points"];

  const inputsFilled =
    requiredFields.every(field => data[field]) &&
    (data.branchId === "Все" ? !!data.userId : true);

  const handleAddTask = () => {
    dispatch(addTask(data));
    setOpenModal((prev) => !prev);
  };

  const handleData = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div
        className={cn(s.overlay, openModal && s.active)}
        onClick={() => setOpenModal(false)}
      ></div>
      <div className={cn(s.AddTaskModal, openModal && s.opened)}>
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
          <Textarea
            placeholder="Опишите задачу..."
            name="text"
            cols="30"
            rows="10"
            value={data.text}
            onChange={handleData}
          />
        </div>

        <div className={s.flex}>
          <div className={s.flexItem}>
            <span>Выберите отдел</span>
            <Select
              value={data.branchId}
              displayValue="name"
              name="branchId"
              selectValue="_id"
              // uniqueValue="_id"
              onChange={handleData}
              array={branches}
              initialValue="Все"
              variant="outlined"
            />
          </div>

          <div className={s.flexItem}>
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
          <div className={s.flexItem}>
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
            <div className={s.flexItem}>
              <span>Пользователь</span>
              <Select
                value={data.user}
                displayValue="login"
                name="userId"
                selectValue="_id"
                // uniqueValue="_id"
                onChange={handleData}
                array={workersList}
                initialValue="Все"
                variant="outlined"
              />
            </div>
          )}
        </div>

        <div className={s.btns}>
          <Button disabled={!inputsFilled} onClick={handleAddTask}>
            Создать Задачу
          </Button>

          <Button
            variant="danger"
            className={s.closeModal}
            onClick={() => setOpenModal((prev) => !prev)}
          >
            Закрыть
          </Button>
        </div>
      </div>
    </>
  );
};
