import React from "react";
import s from "./MyTasksHeader.module.scss";
import { SearchBar } from "../../shared/iu";

export const MyTasksHeader = ({
  search,
  setSearch,
  filterByState,
  setFilterByState,
}) => {

  const filterButtons = [
    { value: "all", displayValue: "Все" },
    { value: "inWork", displayValue: "В работе" },
    { value: "closed", displayValue: "Завершенные" },
  ];

  return (
    <header className={s.MyTasksHeader}>
      <SearchBar placeholder="Поиск по задачам" value={search} onChange={(e) => setSearch(e.target.value)}>
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
      </SearchBar>
    </header>
  );
};
