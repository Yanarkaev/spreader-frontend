import React, { useEffect, useRef } from "react";
import s from "./AddTask.module.scss";
import AddTaskModal from "../AddTaskModal/AddTaskModal";
import { Button } from "../../../shared/iu";
import { useState } from "react";

function AddTask() {
  const [openModal, setOpenModal] = useState(false);

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

  return (
    <div className={s.AddTask} ref={ref}>
      {/* <span onClick={handleClose} className={s.delete}>
        &times;
      </span> */}
      <Button onClick={() => setOpenModal(!openModal)}>Добавить задачу</Button>
      {openModal && <AddTaskModal setOpenModal={setOpenModal} />}
    </div>
  );
}

export default AddTask;
