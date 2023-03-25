import React from "react";
import s from "./Select.module.scss";

export const Select = ({
  value,
  array,
  initialValue,
  body,
  selectValue,
  uniqueValue,
  className,
  ...props
}) => {
  return (
    <select value={value} {...props} className={`${s.Select} ${className}`}>
      {initialValue && <option>{initialValue}</option>}
      {array.map((item) => {
        return (
          <option value={item[selectValue]} key={item[uniqueValue]}>
            {item[body]}
          </option>
        );
      })}
    </select>
  );
};
