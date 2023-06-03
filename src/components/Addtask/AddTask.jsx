import React, { useEffect, useRef } from "react";
import { AddTaskModal } from "../";
import { Button } from "../../shared/iu";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getUsers, getWorkersList } from "../../app/features/users/usersSlice";

export const AddTask = () => {
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();

  const ref = useRef(null);

  useEffect(() => {
    dispatch(getWorkersList());
  }, [dispatch]);

  return (
    <div ref={ref}>
      <Button onClick={() => setOpenModal(!openModal)}>Добавить задачу</Button>
      <AddTaskModal openModal={openModal} setOpenModal={setOpenModal} />
    </div>
  );
};
