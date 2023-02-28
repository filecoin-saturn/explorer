import styles from "./index.module.css";

import { ReactNode } from "react";

type ParagraphProps = {
  children?: ReactNode;
  opacity?: number;
  color?: string;
};

export const Paragraph = ({ children, opacity, color }: ParagraphProps) => {
  return (
    <p
      className={`${styles.Paragraph}`}
      style={{ opacity: opacity, color: color }}
    >
      {children}
    </p>
  );
};

export default Paragraph;
