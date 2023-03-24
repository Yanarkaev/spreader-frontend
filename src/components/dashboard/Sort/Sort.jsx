import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { sortByBranch } from "../../../app/features/tasks/tasksSlice";
import { useSelector } from "react-redux";
import s from "./Sort.module.scss";
import { useEffect } from "react";

const Sort = () => {
  const [openSort, setOpenSort] = useState(false);
  const dispatch = useDispatch();
  const sortBranch = useSelector((state) => state.tasks.sortBranch);
  const branches = useSelector((state) => state.branches.branches);

  const handleSortByBranch = (branchId) => {
    dispatch(sortByBranch(branchId));
    setOpenSort(!openSort);
  };

  //   useEffect(() => {
  //     if (openSort) {
  //       document.body.addEventListener("click", () => setOpenSort(false));
  //     }
  //     return document.body.removeEventListener("click", () => setOpenSort(false));
  //   }, [openSort]);

  return (
    <div>
      <div onClick={() => setOpenSort(!openSort)}>
        <span>
          Фильтр:
          <span className={s.textBlue}>
            {sortBranch === "all" ? " Все" : " " + sortBranch.name}
          </span>
        </span>
      </div>

      {openSort && (
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
  );
};

export default Sort;
