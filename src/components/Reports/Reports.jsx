import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBranches } from "../../app/features/branches/branchesSlice";
import { getTasks } from "../../app/features/tasks/tasksSlice";
import DoughnutChart from "./Doughnut";
import { ReactComponent as ReportsIcon } from "../../assets/Reports/reportsIcon.svg";

import s from "./Reports.module.scss";

function Reports() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBranches());
    dispatch(getTasks());
  }, [dispatch]);

  const departments = useSelector((state) => state.branches.branches); //Название и айди отдела
  const tasks = useSelector((state) => state.tasks.tasks); // айди отдела и статус задачи "new" "inWork" "closed"

  const res = departments.map((dep) => {
    return {
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
      <header className={s.header}>
        <div className={s.headerInner}>
          <h1>Статистика</h1>
        <div className={s.reportsIcon}>
          <span >
            <ReportsIcon fill="#109cf1" />
          </span>
        </div>
        </div>
      </header>

      <main className={s.main}>
        {/* <div className={s.departments}> */}
        {res.map((item) => {
          return (
            <div className={s.chartsContainer}>
              <div className={s.Doughnut}>
                <span>{item.name}</span>
                <DoughnutChart item={item} />
              </div>
            </div>
          );
        })}
        {/* </div> */}
      </main>
    </div>
  );
}

export default Reports;
