import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTasks } from "../../../app/features/tasks/tasksSlice";
import { Table } from "../../../shared/iu/Table/Table";

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
  const sortTasksValue = useSelector((state) => state.tasks.sortBranch);

  const tasks = useSelector((state) => state.tasks.tasks)
    .filter(({ state }) => state === "new")
    .filter((task) => {
      if (sortTasksValue === "all") {
        return task;
      } else {
        return task.branchId?._id === sortTasksValue._id;
      }
    })
    .filter(({ title }) => title.toLowerCase().includes(search.toLowerCase()));

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
