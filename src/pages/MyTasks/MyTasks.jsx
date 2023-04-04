import React, { useState } from "react";
import s from "./MyTasks.module.scss";
import MyTasksHeader from "../../components/MyTasksHeader/MyTasksHeader";
import MyTasksTable from "../../components/MyTasksTable/MyTasksTable";

const MyTasks = () => {
  const [search, setSearch] = useState("");
  const [filterByState, setFilterByState] = useState("all");

  return (
    <div className={s.MyTasks}>
      <MyTasksHeader
        search={search}
        setSearch={setSearch}
        filterByState={filterByState}
        setFilterByState={setFilterByState}
      />
      <MyTasksTable search={search} filterByState={filterByState} />
    </div>
  );
};

export default MyTasks;
