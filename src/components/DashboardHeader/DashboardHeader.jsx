import React from "react";
import { TasksHeader } from "../../shared/iu";

const DashboardHeader = ({ search, setSearch }) => {
  const handleSearch = (e) => {
    if (e.target.value[0] !== " ") {
      setSearch(e.target.value);
    }
  };

  return <TasksHeader value={search} onChange={handleSearch} />;
};

export default DashboardHeader;
