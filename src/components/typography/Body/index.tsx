import styles from "./index.module.css";

import { ReactNode } from "react";

type BodyProps = {
  children?: ReactNode;
};

export const Body = ({ children }: BodyProps) => {
  return <p className={styles.body}>{children}</p>;
};

export default Body;
