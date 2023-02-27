import styles from "./index.module.css";

import { ReactNode } from "react";

type TitleProps = {
  children?: ReactNode;
};

export const Title = ({ children }: TitleProps) => {
  return <p className={styles.title}>{children}</p>;
};

export default Title;
