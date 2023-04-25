import React from "react";
import s from "./Empty.module.scss";

export const Empty = ({ children }) => {
  return <div className={s.Empty}>{children}</div>;
};
