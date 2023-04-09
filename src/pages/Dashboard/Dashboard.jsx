import React, { useState } from "react";
import AddTask from "../../components/Addtask/AddTask";
import s from "./Dashboard.module.scss";
import Sort from "../../components/Sort/Sort";
import TasksTable from "../../components/TasksTable/TasksTable";
import DashboardHeader from "./../../components/DashboardHeader/DashboardHeader";

function Dashboard() {
  const [search, setSearch] = useState("");

  return (
    <div className={s.Dashboard}>
      <DashboardHeader search={search} setSearch={setSearch} />
      <div className={s.tools}>
        <Sort />
        <AddTask />
      </div>
      <TasksTable search={search} />
    </div>
  );
}

export default Dashboard;
