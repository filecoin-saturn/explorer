import styles from "./index.module.css";
import Body from "../typography/Body";

export const Scale = () => {
  return (
    <div className={styles.Scale}>
      <div className={styles.title}>
        <Body>Scale</Body>
      </div>

      <div className={`${styles.step} ${styles.high}`}>
        <Body>High</Body>
        <Body>{">"} 400</Body>
      </div>

      <div className={`${styles.step} ${styles.medium}`}>
        <Body>Medium</Body>
        <Body>{"<"} 400</Body>
      </div>

      <div className={`${styles.step} ${styles.low}`}>
        <Body>Low</Body>
        <Body>{"<"} 250</Body>
      </div>

      <div className={`${styles.step} ${styles.veryLow}`}>
        <Body>Very Low</Body>
        <Body>{"<"} 100</Body>
      </div>
    </div>
  );
};

export default Scale;
