import React from "react";
import s from "./Select.module.scss";
import cn from 'classnames';

export const Select = ({
  value,
  array,
  initialValue,
  displayValue,
  selectValue,
  variant,
  className,
  ...props
  // uniqueValue,
}) => {
  return (
    <select value={value} className={cn(s.Select, s[variant], className)} {...props}>
      {initialValue && <option>{initialValue}</option>}

      {array?.map((item) => {
        return (
          <option value={item[selectValue]} key={item["_id"]}>
            {item[displayValue]}
          </option>
        );
      })}
    </select>
  );
};
