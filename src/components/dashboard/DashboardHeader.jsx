import React from "react";
import s from "./Dashboard.module.scss";
function DashboardHeader() {
  return (
    <header className={s.header}>
      <input placeholder="Поиск по задачам..." type="text" />
    </header>
  );
}

export default DashboardHeader;
