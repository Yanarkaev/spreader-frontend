import React, { useState } from "react";
import { MyTasksHeader, MyTasksTable } from "../../components";
import { useSelector } from "react-redux";
import { WorkerDefinition } from "../../components/WorkerDefinition/WorkerDefinition";
import s from "./MyTasksPage.module.scss";

export const MyTasksPage = () => {
  const [search, setSearch] = useState("");
  const [filterByState, setFilterByState] = useState("all");
  const payload = useSelector((state) => state.auth.payload);

  return (
    <div className={s.MyTasks}>
      <MyTasksHeader
        search={search}
        setSearch={setSearch}
        filterByState={filterByState}
        setFilterByState={setFilterByState}
      />
      {payload?.role === "ADMIN" && <WorkerDefinition />}
      <MyTasksTable search={search} filterByState={filterByState} />
    </div>
  );
};