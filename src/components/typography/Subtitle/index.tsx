import styles from "./index.module.css";

import { ReactNode } from "react";

type SubtitleProps = {
  children?: ReactNode;
};

export const Subtitle = ({ children }: SubtitleProps) => {
  return <p className={styles.subtitle}>{children}</p>;
};

export default Subtitle;
