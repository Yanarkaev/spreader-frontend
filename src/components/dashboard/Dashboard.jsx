import React, { useEffect } from "react";
import s from "./Dashboard.module.scss";
import DashboardHeader from "./DashboardHeader";
import Department from "./Department";
import { useDispatch, useSelector } from "react-redux";
import { getTasks } from "./../../app/features/tasks/tasksSlice";

function Dashboard() {
  const sortBranch = useSelector((state) => state.tasks.sortBranch);

  const tasks = useSelector((state) =>
    state.tasks.tasks.filter((item) => {
      if (!sortBranch) {
        return true;
      }
      if (sortBranch === "all") {
        return item;
      }

      return item.branchId._id === sortBranch._id;
    })
  );
  const loading = useSelector((state) => state.tasks.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  return (
    <div className={s.container}>
      <DashboardHeader />

      <Department />
      <div className={s.tableContainer}>
        <table className={s.table}>
          <thead>
            <tr className={s.tableTr}>
              <th>№</th>
              <th>Название</th>
              <th>Отдел</th>
              <th>Статус</th>
              <th>Баллы</th>
              <th>Дата публикации</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td>Загрузка</td>
              </tr>
            ) : (
              tasks.map((item, index) => {
                return (
                  <tr className={s.taskTr} key={item._id}>
                    <td>{index + 1}</td>
                    <td>{item.title}</td>
                    <td>{item.branchId.name}</td>
                    <td>{item.status}</td>
                    <td>{item.points}</td>
                    <td>{item.createdAt.split("T")[0]}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
