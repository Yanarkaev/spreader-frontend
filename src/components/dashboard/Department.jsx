import React, { useEffect, useState } from "react";
import s from "./Dashboard.module.scss";
import img from "../../assets/Dashboard/Polygon.svg";
import AddTask from "./Addtask/AddTask";
import { useDispatch, useSelector } from "react-redux";
import { getBranches } from "./../../app/features/branches/branchesSlice";
import { sortByBranch } from "../../app/features/tasks/tasksSlice";
import { Button } from "./../../shared/iu";
import Sort from "./Sort/Sort";

function Department() {
  const [openTask, setOpenTask] = useState(false);

  const payload = useSelector((state) => state.auth.payload);
  const token = useSelector((state) => state.auth.token);

  const handleOpenAddTask = () => {
    setOpenTask(!openTask);
  };
  
  return (
    <>
      <div className={s.Department}>
        <Sort />
        {token && payload && payload.role === "ADMIN" && (
          <div className={s.addTaskBtn}>
            <Button onClick={handleOpenAddTask} className={s.btn}>
              Добавить задачу
            </Button>
            {openTask && (
              <AddTask
                openTask={openTask}
                setOpenTask={setOpenTask}
                sortByBranch={sortByBranch}
              />
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default Department;
