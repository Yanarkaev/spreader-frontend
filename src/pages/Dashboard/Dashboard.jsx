import React, { useState } from "react";
import AddTask from "../../components/Addtask/AddTask";
import s from "./Dashboard.module.scss";
import { Sort } from "../../components/Sort/Sort";
import TasksTable from "../../components/TasksTable/TasksTable";
import { useSelector } from "react-redux";
import { SearchBar } from "../../shared/iu";

function Dashboard() {
  const [search, setSearch] = useState("");
  const payload = useSelector((state) => state.auth.payload);

  return (
    <div className={s.Dashboard}>
      <SearchBar
        placeholder="Поиск по задачам"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className={s.tools}>
        <Sort />
        {payload?.role === "ADMIN" && <AddTask />}
      </div>
      <TasksTable search={search} />
    </div>
  );
}

export default Dashboard;
