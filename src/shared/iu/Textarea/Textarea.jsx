import cn from "classnames";
import s from "./Textarea.module.scss";

export const Textarea = ({ value, className, ...props }) => {
  return (
    <textarea className={cn(s.Textarea, className)} value={value} {...props} />
  );
};
