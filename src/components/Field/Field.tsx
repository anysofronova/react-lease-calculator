import styles from "./Field.module.scss";
import { FC } from "react";
import { StateProps } from "../../App";

type FieldProps = {
  title: string;
  name: keyof StateProps;
  min: string;
  max: string;
  type: "%" | "₽" | "мес.";
  state: StateProps;
  setState: (state: StateProps) => void;
};
export const Field: FC<FieldProps> = ({
  title,
  name,
  min,
  max,
  type,
  state,
  setState,
}) => {
  return (
    <div className={styles.field}>
      <div className={styles.title}>{title}</div>
      <input
        className={styles.number}
        readOnly={type === "%"}
        type="text"
        pattern={"/^\\d+$/gm"}
        value={
          type === "%"
            ? Math.round((+state[name] * +state.cost) / 100).toLocaleString(
                "ru-RU"
              )
            : (+state[name]).toLocaleString("ru-RU")
        }
        onChange={(e) =>
          setState({
            ...state,
            [name]: e.currentTarget.value
              .replace(/[^0-9 ]*/gm, "")
              .slice(0, name === "cost" ? 7 : 2),
          })
        }
      />
      {type !== "%" && <div className={styles.typeContainer}>{type}</div>}
      {type === "%" && (
        <div className={styles.percentContainer}>
          <input
            className={styles.percent}
            type="text"
            value={state[name]}
            onChange={(e) =>
              setState({
                ...state,
                [name]: e.currentTarget.value
                  .replace(/[^0-9]*/gm, "")
                  .slice(0, 2),
              })
            }
            min={min}
            max={max}
          />
        </div>
      )}
      <input
        className={styles.range}
        type="range"
        value={state[name]}
        onChange={(e) =>
          setState({
            ...state,
            [name]: Math.round(+e.currentTarget.value),
          })
        }
        min={min}
        max={max}
      />
    </div>
  );
};
