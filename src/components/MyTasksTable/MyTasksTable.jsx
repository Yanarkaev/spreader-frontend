import { Table } from "../../shared/iu/Table/Table";
import { useParams } from "react-router-dom";
import { useMyTasks } from "./../../shared/hooks/useMyTasks";
import { TableLoader } from "../../shared/iu/Loader/TableLoader";

const columns = [
  { value: "title", displayValue: "Название" },
  { value: "time", displayValue: "Время" },
  { value: "points", displayValue: "Баллы" },
  { value: "createdAt", displayValue: "Дата" },
  { value: "state", displayValue: "Статус" },
];

export const MyTasksTable = ({ search, filterByState }) => {
  const { userId } = useParams();
  const { tasks, loading } = useMyTasks(userId);

  const filtered = tasks
    .filter((task) =>
      filterByState === "all" ? task : task.state === filterByState
    )
    .filter((task) => task?.title.toLowerCase().includes(search.toLowerCase()));

  if (loading) {
    return <TableLoader />;
  }

  return (
    <div style={{ marginTop: "20px" }}>
      <Table columns={columns} rows={filtered} />
    </div>
  );
};
