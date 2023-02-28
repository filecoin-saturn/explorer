import styles from "./index.module.css";

import { ReactNode } from "react";

type SubtitleProps = {
  children?: ReactNode;
  opacity?: number;
  color?: string;
};

export const Subtitle = ({ children, opacity, color }: SubtitleProps) => {
  return (
    <p className={styles.subtitle} style={{ opacity: opacity, color: color }}>
      {children}
    </p>
  );
};

export default Subtitle;
