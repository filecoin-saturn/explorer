import styles from "./index.module.css";

export const Body = (children: any) => {
  return <p className={styles.body}>{children}</p>;
};

export default Body;
