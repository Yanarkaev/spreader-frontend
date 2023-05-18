import React from "react";
import s from "./Input.module.scss";

export const Input = ({
  value,
  variant = "outlined",
  placeholder,
  className,
  onChange,
  ...props
}) => {
  return (
      <input
        value={value}
        onChange={onChange}
        className={`${s.Input} ${s[variant]} ${className}`}
        placeholder={placeholder}
        {...props}
      />
  );
};
