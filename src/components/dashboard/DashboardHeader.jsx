import React from "react";
import s from "./Dashboard.module.scss";
import searchImg from "../../assets/Dashboard/search.svg";
function DashboardHeader() {
  return (
    <header className={s.header}>
      <div className={s.inputContainer}>
        <img src={searchImg} alt="" />
        <input placeholder="Поиск по задачам..." type="text" />
      </div>
    </header>
  );
}

export default DashboardHeader;
