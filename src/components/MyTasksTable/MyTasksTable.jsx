import React, { useEffect } from "react";
import { Table } from "../../shared/iu/Table/Table";
import { useSelector, useDispatch } from "react-redux";
import { getTasksByUser } from "./../../app/features/tasks/tasksSlice";
import { useParams } from "react-router-dom";
import { useMyTasks } from "./../../shared/hooks/useMyTasks";
import { TableLoader } from "../../shared/iu/Loader/TableLoader";

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

  const filtered = tasks.filter((task) =>
      filterByState === "all" ? task : task.state === filterByState
    )
    .filter((task) => task?.title.toLowerCase().includes(search.toLowerCase()));

  if (loading) {
    return <TableLoader />;
  }

  return (
    <div>
      <Table columns={columns} rows={filtered} />
    </div>
  );
};

export default MyTasksTable;
