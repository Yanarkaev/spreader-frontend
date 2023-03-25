import React, { useRef } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { sortByBranch } from "../../../app/features/tasks/tasksSlice";
import { useSelector } from "react-redux";
import s from "./Sort.module.scss";
import { useEffect } from "react";
import { getBranches } from './../../../app/features/branches/branchesSlice';

const Sort = () => {
  const [openSort, setOpenSort] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState("Все");

  const dispatch = useDispatch();
  const sortBranch = useSelector((state) => state.tasks.sortBranch);
  const branches = useSelector((state) => state.branches.branches);

  const handleSortByBranch = (branch) => {
    dispatch(sortByBranch(branch));
    setSelectedBranch(branch.name);
    setOpenSort(!openSort);
  };

  console.log("render")

  const ref = useRef(null);

  useEffect(() => {
    dispatch(getBranches())
  }, [])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpenSort(false);
      }
    };
    document.addEventListener("click", handleClickOutside, true);

    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [setOpenSort]);

  return (
    <div className={s.Sort} ref={ref}>
      <div className={s.sortInput} onClick={() => setOpenSort(!openSort)}>
        <div>
          Фильтр:
          <span className={s.selectedPreview}>
            {sortBranch === "all" ? "Все" : "" + sortBranch.name}
          </span>
        </div>
      </div>

      {openSort && (
        <div className={s.modal}>
          <ul>
            <li
              className={sortBranch === "all" ? s.selected : ""}
              onClick={() => handleSortByBranch("all")}
            >
              Все
            </li>
            {branches.map((item) => {
              return (
                <li
                  className={selectedBranch === item.name ? s.selected : ""}
                  onClick={() => handleSortByBranch(item)}
                  key={item._id}
                >
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
