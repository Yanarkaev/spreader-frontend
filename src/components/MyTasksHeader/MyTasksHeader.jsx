import React from "react";
import s from "./MyTasksHeader.module.scss";
import { Button, SearchBar } from "../../shared/iu";
import cn from 'classnames';

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
              <Button
                key={value}
                onClick={() => setFilterByState(value)}
                className={cn(s.button, filterByState === value ? s.active : "")}
              >
                {displayValue}
              </Button>
            );
          })}
        </div>
      </SearchBar>
    </header>
  );
};
