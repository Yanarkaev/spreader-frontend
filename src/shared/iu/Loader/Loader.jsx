import s from "./Loader.module.scss"

export const Loader = ({w, h, ...props}) => {
  const styles = {
    height: h,
    width: w,
    ...props,
  };
  return <div style={styles} className={s.loader} {...props}></div>;
};
