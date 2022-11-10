import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getTasks } from "./../../app/features/tasks/tasksSlice";
import s from "./mytasks.module.scss";
import { Link } from "react-router-dom";
import MyTasksHeader from "./MyTasksHeader";
import { useState } from "react";

const MyTasks = () => {
  const [search, setSearch] = useState("");

  const tasks = useSelector((state) => state.tasks.tasks).filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  const loading = useSelector((state) => state.tasks.loading);
  const payload = useSelector((state) => state.auth.payload);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  if (loading) {
    return <span className="loader"></span>;
  }

  return (
    <div className={s.wrapper}>
      <MyTasksHeader search={search} setSearch={setSearch} />
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
            </tr>
          </thead>

          <tbody>
            {tasks.map((item, index) => {
              if (payload?.id === item.userId) {
                return (
                  <tr className={s.taskTr} key={item._id}>
                    <td>{index + 1}</td>
                    <td>
                      <Link to={`/spreader/dashboard/${item._id}`}>
                        {item.title}
                      </Link>
                    </td>

                    <td>
                      {item.branchId === "Все" || item.branchId === undefined
                        ? "Все"
                        : item.branchId.name}
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
      </div>
    </div>
  );
};

export default MyTasks;
