import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getTasks } from "./../../app/features/tasks/tasksSlice";
import s from "./mytasks.module.scss";
import { Link } from "react-router-dom";
import MyTasksHeader from "./MyTasksHeader";
import { useState } from "react";
import MyTasksTable from "../MyTasksTable/MyTasksTable";
import DashboardHeader from "../DashboardHeader/DashboardHeader";

const MyTasks = () => {
  const [search, setSearch] = useState("");
  const [filterByState, setFilterByState] = useState("all");

  // const tasks = useSelector((state) => state.tasks.tasks)
  //   .filter((item) => item.title.toLowerCase().includes(search.toLowerCase()))
  //   .filter((elem) => {
  //     if (filterByState === 1) {
  //       return elem?.state === "inWork";
  //     }
  //     if (filterByState === 2) {
  //       return elem?.state === "closed";
  //     } else {
  //       return elem;
  //     }
  //   });

  // if (loading) {
  //   return <span className="loader"></span>;
  // }

  return (
    <div className={s.wrapper}>
      <MyTasksHeader
        search={search}
        setSearch={setSearch}
        filterByState={filterByState}
        setFilterByState={setFilterByState}
      />
      {/* <div className={s.tableContainer}>
        <table className={s.table}>
          <thead>
            <tr className={s.tableTr}>
              <th>№</th>
              <th>Название</th>
              <th>Статус</th>
              <th>Время</th>
              <th>Баллы</th>
              <th>Дата публикации</th>
            </tr>
          </thead>

          <tbody>
            {tasks.map((item, index) => {
              if (
                payload?.id === item.userId ||
                (item.state === "new" && payload?.branchId === item.branchId)
              ) {
                return (
                  <tr
                    className={`${s.taskTr} ${
                      item?.state === "inWork" ? s.inWork : s.closed
                    }`}
                    key={item._id}
                  >
                    <td>{index + 1}</td>
                    <td>
                      <Link to={`/spreader/dashboard/${item._id}`}>
                        {item.title}
                      </Link>
                    </td>
                    <td>
                      {item?.state === "inWork" ? "В работе" : "Завершено"}
                    </td>
                    <td>{item.time}</td>
                    <td>{item.points}</td>
                    <td>{item.createdAt?.split("T")[0]}</td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
      </div> */}

      <MyTasksTable search={search} filterByState={filterByState} />
    </div>
  );
};

export default MyTasks;
