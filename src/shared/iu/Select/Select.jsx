import React from "react";

export const Select = ({ value, array, initialValue, ...props }) => {
  return (
    <select value={value} {...props}>
      {initialValue && <option>{initialValue}</option>}
      {array.map((item) => {
        return (
          <option value={item._id} key={item._id}>
            {item.name}
          </option>
        );
      })}
    </select>
  );
};
