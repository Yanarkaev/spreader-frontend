import React, { useState } from "react";
import { AddTask, TasksTable } from "../../components";
import { Sort } from "../../components/Sort/Sort";
import { useSelector } from "react-redux";
import { SearchBar } from "../../shared/iu";
import s from "./DashboardPage.module.scss";

export const DashboardPage = () => {
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
