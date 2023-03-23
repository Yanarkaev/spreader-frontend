import React from "react";
import s from "./Input.module.scss";

export const Input = ({ value, variant, className, ...props }) => {
  return (
    <input
      value={value}
      className={`${s.Input} ${s[variant]} ${className}`}
      {...props}
    />
  );
};
