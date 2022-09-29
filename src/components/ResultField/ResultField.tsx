import { FC } from "react";
import styles from "./ResultField.module.scss";

type ResultFieldProps = {
  text: string;
  result: number;
};
export const ResultField: FC<ResultFieldProps> = ({ text, result }) => {
  return (
    <div className={styles.result}>
      <div className={styles.title}>{text}</div>
      <div className={styles.value}>
        {Math.round(result).toLocaleString()}&nbsp;<span>₽</span>
      </div>
    </div>
  );
};
