import React from "react";
import s from "./TasksHeader.module.scss";
import searchIcon from "../../../assets/Dashboard/search.svg";

export const TasksHeader = ({ children, ...props }) => {
  return (
    <header className={s.TasksHeader}>
      <div className={s.inputContainer}>
        <img src={searchIcon} alt="" />
        <input {...props} placeholder="Поиск по задачам"/>
      </div>
      {children}
    </header>
  );
};
