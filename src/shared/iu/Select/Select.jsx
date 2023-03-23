import React from "react";

export const Select = ({
  value,
  array,
  initialValue,
  body,
  selectValue,
  uniqueValue,
  ...props
}) => {
  return (
    <select value={value} {...props}>
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
