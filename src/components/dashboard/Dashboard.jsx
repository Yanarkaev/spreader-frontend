import React, { useEffect } from "react";
import s from "./Dashboard.module.scss";
import DashboardHeader from "./DashboardHeader";
import Department from "./Department";
import { useDispatch, useSelector } from "react-redux";
import { getTasks } from "./../../app/features/tasks/tasksSlice";
import { Link } from "react-router-dom";
import { useState } from "react";

function Dashboard() {
  const loading = useSelector((state) => state.tasks.loading);
  const dispatch = useDispatch();
  const sortBranch = useSelector((state) => state.tasks.sortBranch);
  const [search, setSearch] = useState("");

  const tasks = useSelector((state) =>
    state.tasks.tasks
      .filter((item) => {
        if (!sortBranch) {
          return true;
        }
        if (sortBranch === "all") {
          return item;
        }
        return item.branchId?._id === sortBranch._id;
      })
      .filter((elem) => elem.state === "new" && elem.userId !== "Все")
  ).filter((item) => {
    if (item?.title.toLowerCase().includes(search.toLocaleLowerCase())) {
      return item;
    }
  });

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  if (loading) {
    return <span className="loader"></span>;
  }

  return (
    <div className={s.container}>
      <DashboardHeader search={search} setSearch={setSearch} />

      <Department/>
      {tasks.length > 0 ? (
        <>
          <div className={s.tableContainer}>
            <table className={s.table}>
              <thead>
                <tr className={s.tableTr}>
                  <th>№</th>
                  <th>Название</th>
                  <th>Отдел</th>
                  <th>Время</th>
                  <th>Баллы</th>
                  <th>Дата публикации</th>
                  <th>Статус</th>
                </tr>
              </thead>

              <tbody>
                {tasks.map((item, index) => {
                  return (
                    <tr className={s.taskTr} key={item._id}>
                      <td>{index + 1}</td>
                      <td>
                        <Link to={item._id}>{item.title}</Link>
                      </td>

                      <td>
                        {item.branchId === "Все" || item.branchId === undefined
                          ? "Все"
                          : item.branchId.name}
                      </td>
                      <td>{item.time}</td>
                      <td>{item.points}</td>
                      <td>{item.createdAt?.split("T")[0]}</td>
                      <td>{item.state}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div className={s.empty}>Задач пока нет</div>
      )}
    </div>
  );
}

export default Dashboard;
