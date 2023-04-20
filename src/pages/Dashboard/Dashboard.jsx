import React, { useState } from "react";
import AddTask from "../../components/Addtask/AddTask";
import s from "./Dashboard.module.scss";
import Sort from "../../components/Sort/Sort";
import TasksTable from "../../components/TasksTable/TasksTable";
import DashboardHeader from "./../../components/DashboardHeader/DashboardHeader";
import { useSelector } from "react-redux";

function Dashboard() {
  const [search, setSearch] = useState("");
  const payload = useSelector((state) => state.auth.payload);

  return (
    <div className={s.Dashboard}>
      <DashboardHeader search={search} setSearch={setSearch} />
      <div className={s.tools}>
        <Sort />
        {payload?.role === "ADMIN" && <AddTask />}
      </div>
      <TasksTable search={search} />
    </div>
  );
}

export default Dashboard;
