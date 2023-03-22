import React from "react";
import s from "./Button.module.scss";

export const Button = ({ children, variant, className, ...props }) => {
  return (
    <button className={`${s.Button} ${s[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};
