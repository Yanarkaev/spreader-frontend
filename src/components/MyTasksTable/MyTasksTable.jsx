import React, { useEffect } from "react";
import { Table } from "../../shared/iu/Table/Table";
import { useSelector, useDispatch } from "react-redux";
import { getTasksByUser } from "./../../app/features/tasks/tasksSlice";
import { useParams } from "react-router-dom";
import s from "./MyTasksTable.module.scss";
import Preloader from "../../shared/iu/Preloader/Preloader";
import { useMyTasks } from "./../../shared/hooks/useMyTasks";

const MyTasksTable = ({ search, filterByState }) => {
  const columns = [
    { value: "title", displayValue: "Название" },
    { value: "time", displayValue: "Время" },
    { value: "points", displayValue: "Баллы" },
    { value: "createdAt", displayValue: "Дата" },
    { value: "state", displayValue: "Статус" },
  ];

  const { userId } = useParams();
  const { tasks, loading } = useMyTasks(userId);

  tasks
    .filter((task) =>
      filterByState === "all" ? task : task.state === filterByState
    )
    .filter((task) => task?.title.toLowerCase().includes(search.toLowerCase()));

  if (loading) {
    return <Preloader />;
  }

  return (
    <div>
      <Table columns={columns} rows={tasks} className={s.MyTasksTable} />
    </div>
  );
};

export default MyTasksTable;
