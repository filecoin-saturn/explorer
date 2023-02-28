import styles from "./index.module.css";

import { ReactNode } from "react";

type TitleProps = {
  children?: ReactNode;
  opacity?: number;
  color?: string;
};

export const Title = ({ children, opacity, color }: TitleProps) => {
  return (
    <p className={styles.title} style={{ opacity: opacity, color: color }}>
      {children}
    </p>
  );
};

export default Title;
