import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNewTasks } from "../../app/features/tasks/tasksSlice";
import { Table } from "../../shared/iu/Table/Table";
import Preloader from "./../../shared/iu/Preloader/Preloader";

const TasksTable = ({ search }) => {
  const columns = [
    { value: "title", displayValue: "Название" },
    // { value: "", displayValue: "Номер" },
    { value: "branchId", displayValue: "Отдел" },
    { value: "time", displayValue: "Время" },
    { value: "points", displayValue: "Баллы" },
    { value: "createdAt", displayValue: "Дата" },
    { value: "state", displayValue: "Статус" },
  ];

  const dispatch = useDispatch();
  const sortTasksValue = useSelector((state) => state.tasks.sortBranch);
  const loading = useSelector((state) => state.tasks.loading);

  const tasks = useSelector((state) => state.tasks.tasks)
    .filter((task) =>
      sortTasksValue === "all"
        ? task
        : task.branchId?._id === sortTasksValue._id
    )
    .filter(({ title }) => title.toLowerCase().includes(search.toLowerCase()));

  useEffect(() => {
    dispatch(getNewTasks());
  }, [dispatch]);

  if (loading) {
    return <Preloader />;
  }

  return (
    <div style={{ marginBottom: "50px" }}>
      <Table columns={columns} rows={tasks} />
    </div>
  );
};

export default TasksTable;
