import s from "./Loader.module.scss"

export const Loader = ({w, h, br, ...props}) => {
  const styles = {
    height: h,
    width: w,
    borderRadius: br,
    ...props,
  };
  return <div style={styles} className={s.loader} {...props}></div>;
};
