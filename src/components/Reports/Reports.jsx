import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBranches } from "../../app/features/branches/branchesSlice";
import { getTasks } from "../../app/features/tasks/tasksSlice";
import DoughnutChart from "./Doughnut";

import s from "./Reports.module.scss";
import { Sort } from "../Sort/Sort";

function Reports() {
  const dispatch = useDispatch();
  const sortValue = useSelector((state) => state.tasks.sortBranch);

  useEffect(() => {
    dispatch(getBranches());
    dispatch(getTasks());
  }, [dispatch]);

  const departments = useSelector((state) => state.branches.branches).filter(
    (el) => (sortValue === "all" ? el : el?._id === sortValue._id)
  ); //Название и айди отдела

  const tasks = useSelector((state) => state.tasks.tasks); // айди отдела и статус задачи "new" "inWork" "closed"

  const res = departments.map((dep) => {
    return {
      all: tasks.filter((task) => task.branchId?._id === dep._id).length,
      closed: tasks
        .filter((task) => task.branchId && task.branchId["_id"] === dep._id)
        .filter((x) => x.state === "closed").length,
      new: tasks
        .filter((task) => task.branchId && task.branchId["_id"] === dep._id)
        .filter((x) => x.state === "new").length,
      inWork: tasks
        .filter((task) => task.branchId && task.branchId["_id"] === dep._id)
        .filter((x) => x.state === "inWork").length,
      name: dep.name,
    };
  });

  return (
    <div className={s.container}>
      <div>
        <Sort className={s.filter} />
      </div>
      <main className={s.main}>
        {res.map((item, index) => {
          return (
            <div className={s.chartsContainer} key={index}>
              <div className={s.Doughnut}>
                <span className={s.branch}>{item.name}</span>
                <div className={s.tasksCount}>Всего задач: {item.all}</div>
                <DoughnutChart item={item} />
              </div>
            </div>
          );
        })}
      </main>
    </div>
  );
}

export default Reports;
