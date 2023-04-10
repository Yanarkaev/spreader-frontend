import { useSelector } from "react-redux";
import { Table } from "../../shared/iu/Table/Table";
import { useTasks } from "./../../shared/hooks/useTasks";
import { TableLoader } from "../../shared/iu/Loader/TableLoader";

const TasksTable = ({ search }) => {
  const columns = [
    { value: "title", displayValue: "Название" },
    { value: "branchId", displayValue: "Отдел" },
    { value: "time", displayValue: "Время" },
    { value: "points", displayValue: "Баллы" },
    { value: "createdAt", displayValue: "Дата" },
    { value: "state", displayValue: "Статус" },
  ];

  const { tasks, loading } = useTasks();
  const sortTasksValue = useSelector((state) => state.tasks.sortBranch);

  const filtered = tasks
    .filter((task) =>
      sortTasksValue === "all"
        ? task
        : task.branchId?._id === sortTasksValue._id
    )
    .filter(({ title }) => title.toLowerCase().includes(search.toLowerCase()));

  if (loading) {
    return <TableLoader />;
  }

  return (
    <div style={{ marginBottom: "50px" }}>
      <Table columns={columns} rows={filtered} />
    </div>
  );
};

export default TasksTable;
