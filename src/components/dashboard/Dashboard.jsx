import React, { useEffect, useState } from "react";
import s from "./Dashboard.module.scss";
import DashboardHeader from "./DashboardHeader";
import Department from "./Department";
import TasksTable from "./TasksTable/TasksTable";

function Dashboard() {
  const [search, setSearch] = useState("");

  return (
    <div className={s.container}>
      <DashboardHeader search={search} setSearch={setSearch} />
      <Department />
      <TasksTable search={search} />
      {/* {tasks.length > 0 ? (
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
                    <tr
                      className={s.taskTr}
                      key={item._id}
                      onClick={() => navigate(`${item._id}`)}
                    >
                      <td>{index + 1}</td>
                      <td>
                        <span>{item.title}</span>
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
      )}  */}
    </div>
  );
}

export default Dashboard;
