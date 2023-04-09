import React from "react";
import { TasksHeader } from "../../shared/iu/TasksHeader/TasksHeader";
import s from "./MyTasksHeader.module.scss";

const MyTasksHeader = ({
  search,
  setSearch,
  filterByState,
  setFilterByState,
}) => {
  const handleSearch = (e) => {
    if (e.target.value[0] !== " ") {
      setSearch(e.target.value);
    }
  };

  const filterButtons = [
    { value: "all", displayValue: "Все" },
    { value: "inWork", displayValue: "В работе" },
    { value: "closed", displayValue: "Завершенные" },
  ];

  return (
    <header className={s.MyTasksHeader}>
      <TasksHeader search={search} onChange={handleSearch}>
        <div className={s.sortButtons}>
          {filterButtons.map(({ value, displayValue }) => {
            return (
              <button
                key={value}
                onClick={() => setFilterByState(value)}
                className={filterByState === value ? s.active : ""}
              >
                {displayValue}
              </button>
            );
          })}
        </div>
      </TasksHeader>
    </header>
  );
};

export default MyTasksHeader;
