import React, { useEffect, useState } from "react";
import s from "./Dashboard.module.scss";
import img from "../../assets/Dashboard/Polygon.svg";
import AddTask from "./Addtask/AddTask";
import { useDispatch, useSelector } from "react-redux";
import { getBranches } from "./../../app/features/branches/branchesSlice";
import { sortByBranch } from "../../app/features/tasks/tasksSlice";
import { Button } from "./../../shared/iu";

function Department() {
  const [opened, setOpened] = useState(false);
  const [openTask, setOpenTask] = useState(false);

  const payload = useSelector((state) => state.auth.payload);
  const token = useSelector((state) => state.auth.token);
  const branches = useSelector((state) => state.branches.branches);
  const sortBranch = useSelector((state) => state.tasks.sortBranch);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBranches());
  }, [dispatch]);

  const handleOpenAddTask = () => {
    setOpenTask(!openTask);
  };
  const handleCLick = () => {
    setOpened(!opened);
  };
  const handleOpen = () => {
    setOpened(!opened);
  };

  const handleSortByBranch = (branchId) => {
    dispatch(sortByBranch(branchId));
    setOpened(!opened);
  };

  return (
    <>
      <div className={s.Department}>
        <div>
          <span>
            Фильтр по отделам:
            <span onClick={handleOpen} className={s.textBlue}>
              {sortBranch === "all" ? " Все" : " " + sortBranch.name}
            </span>
          </span>
          <img onClick={handleCLick} src={img} alt="logo" />
        </div>
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
        {opened && (
          <div className={s.modal}>
            <ul>
              <li onClick={() => handleSortByBranch("all")}>Все</li>
              {branches.map((item) => {
                return (
                  <li onClick={() => handleSortByBranch(item)} key={item._id}>
                    {item.name}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}

export default Department;
