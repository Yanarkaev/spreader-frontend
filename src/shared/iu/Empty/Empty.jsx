import React from "react";
import s from "./Empty.module.scss";
import cn from "classnames";

export const Empty = ({ className, children }) => {
  return <div className={cn(s.Empty, className)}>{children}</div>;
};
