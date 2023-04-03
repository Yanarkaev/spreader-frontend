import React from "react";
import s from "./mytasks.module.scss";
import searchImg from "../../assets/Dashboard/search.svg";
import DashboardHeader from "../DashboardHeader/DashboardHeader";

function MyTasksHeader({ search, setSearch, filterByState, setFilterByState }) {
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

  console.log(filterByState);

  return (
    <header className={s.header}>
      {/* <div className={s.inputContainer}>
        <img src={searchImg} alt="" />
        <input
          placeholder="Поиск по задачам..."
          type="text"
          value={search}
          onChange={handleSearch}
        />
      </div> */}

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
        {/* <button
          className={filterByState === 0 ? s.active : ""}
          onClick={() => setFilterByState(0)}
        >
          Все
        </button>
        <button
          className={filterByState === 1 ? s.active : ""}
          onClick={() => setFilterByState(1)}
        >
          В работе
        </button>
        <button
          className={filterByState === 2 ? s.active : ""}
          onClick={() => setFilterByState(2)}
        >
          Завершенные
        </button> */}
      </div>
    </header>
  );
}

export default MyTasksHeader;
