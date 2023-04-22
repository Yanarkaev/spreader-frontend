import React, { useState } from "react";
import s from "./MyTasks.module.scss";
import MyTasksHeader from "../../components/MyTasksHeader/MyTasksHeader";
import MyTasksTable from "../../components/MyTasksTable/MyTasksTable";
import { useWorker } from "../../shared/hooks/useWorker";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { WorkerDefinition } from "../../components/WorkerDefinition/WorkerDefinition";

const MyTasks = () => {
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

export default MyTasks;
