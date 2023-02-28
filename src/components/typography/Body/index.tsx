import styles from "./index.module.css";

import { ReactNode } from "react";

type BodyProps = {
  children?: ReactNode;
  opacity?: number;
  color?: string;
};

export const Body = ({ children, opacity, color }: BodyProps) => {
  return (
    <p className={`${styles.body}`} style={{ opacity: opacity, color: color }}>
      {children}
    </p>
  );
};

export default Body;
