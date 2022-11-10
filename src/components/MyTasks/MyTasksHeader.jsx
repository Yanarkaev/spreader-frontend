import React from "react";
import s from "./mytasks.module.scss";
import searchImg from "../../assets/Dashboard/search.svg";

function MyTasksHeader({ search, setSearch }) {
  const handleSearch = (e) => {
    if(e.target.value[0] !== ' '){
      setSearch(e.target.value)
    }
  }
  return (
    <header className={s.header}>
      <div className={s.inputContainer}>
        <img src={searchImg} alt="" />
        <input
          placeholder="Поиск по задачам..."
          type="text"
          value={search}
          onChange={handleSearch}
        />
      </div>
    </header>
  );
}

export default MyTasksHeader;
