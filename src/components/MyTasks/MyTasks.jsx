import React, { useEffect, useState } from "react";
import MyTasksHeader from "../../components/MyTasksHeader/MyTasksHeader";
import MyTasksTable from "../../components/MyTasksTable/MyTasksTable";

export const MyTasks = () => {
  const [search, setSearch] = useState("");
  const [filterByState, setFilterByState] = useState("all");

  return (
    <div>
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


