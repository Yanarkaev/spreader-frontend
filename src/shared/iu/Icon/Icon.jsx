import React from "react";
import { icons } from "../../../assets/Aside/index";

export const Icon = ({ name, className, stroke="rgba(0, 0, 0, 0)", fill="rgba(0, 0, 0, 0)" }) => {
  const Glyph = icons[name];
  return <Glyph stroke={stroke} fill={fill} className={className} />;
};
