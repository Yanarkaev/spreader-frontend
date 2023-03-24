import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTasks } from "../../../app/features/tasks/tasksSlice";
import { Table } from "../../../shared/iu/Table/Table";

const TasksTable = () => {
  const columns = [
    { value: "title", displayValue: "Название" },
    // { value: "", displayValue: "Номер" },
    { value: "branchId", displayValue: "Отдел" },
    { value: "time", displayValue: "Время" },
    { value: "points", displayValue: "Баллы" },
    { value: "createdAt", displayValue: "Дата" },
    { value: "state", displayValue: "Статус" },
  ];

  const tasks = useSelector((state) => state.tasks.tasks).filter(
    (elem) => elem.state === "new"
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);
  return (
    <div>
      <Table columns={columns} rows={tasks} />
    </div>
  );
};

export default TasksTable;
