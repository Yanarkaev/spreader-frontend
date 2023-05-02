import React, { useEffect, useRef } from "react";
import s from "./AddTask.module.scss";
import { AddTaskModal } from "../";
import { Button } from "../../shared/iu";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getUsers } from "../../app/features/users/usersSlice";

export const AddTask = () => {
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();

  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpenModal(false);
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [setOpenModal]);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <div className={s.AddTask} ref={ref}>
      <Button onClick={() => setOpenModal(!openModal)}>Добавить задачу</Button>
      {openModal && <AddTaskModal setOpenModal={setOpenModal} />}
    </div>
  );
};
