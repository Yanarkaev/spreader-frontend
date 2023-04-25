import React from "react";
import s from "./SearchBar.module.scss";
import searchIcon from "../../../assets/Dashboard/search.svg";
import { Input } from "../Input/Input";

export const SearchBar = ({
  children,
  placeholder,
  onChange,
  value,
  ...props
}) => {
  return (
    <section className={s.SearchBar}>
      <div className={s.inputContainer}>
        <img src={searchIcon} alt="" />
        <Input
          onChange={onChange}
          value={value}
          placeholder={placeholder}
          {...props}
        />
      </div>
      {children}
    </section>
  );
};
