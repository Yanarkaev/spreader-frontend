import React from "react";
import { useState } from "react";
import { Sort } from "../../components/Sort/Sort";
import { WorkersList } from "../../components/WorkersList/WorkersList";
import { SearchBar } from "../../shared/iu";
import s from "./Monitoring.module.scss";

export const Monitoring = () => {
  const [searchValue, setSearchValue] = useState("");
  return (
    <div className={s.Monitoring}>
      <SearchBar
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="Поиск по работникам"
      />
      <Sort className={s.sortMenu} />
      <WorkersList searchValue={searchValue} />
    </div>
  );
};
