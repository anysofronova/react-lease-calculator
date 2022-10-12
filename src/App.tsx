import styles from "./App.module.scss";
import { Field } from "./components/Field/Field";
import { useState } from "react";
import { ResultField } from "./components/ResultField/ResultField";
import { Loader } from "./components/Loader/Loader";

export type StateProps = {
  cost: string;
  contribution: string;
  period: string;
};
const App = () => {
  const [state, setState] = useState<StateProps>({
    cost: "3300000",
    contribution: "13",
    period: "60",
  });
  const interestRate = 3.5 / 100;
  const initialPayment = (+state.contribution / 100) * +state.cost;
  const monthlyPayment =
    (+state.cost - initialPayment) *
    ((interestRate * Math.pow(1 + interestRate, +state.period)) /
      (Math.pow(1 + interestRate, +state.period) - 1));
  const contractAmount = initialPayment + +state.period * monthlyPayment;
  const [isSending, setIsSending] = useState(false);
  const sendRequest = async () => {
    if (isSending) return;
    setIsSending(true);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ state }),
    };
    const response = await fetch(
      "https://eoj3r7f3r4ef6v4.m.pipedream.net",
      requestOptions
    );
    const data = await response.json();
    console.log(data);
    setIsSending(false);
  };
  return (
    <div className={styles.app}>
      <h1>Рассчитайте стоимость автомобиля в лизинг</h1>
      <form>
        <Field
          title={"Стоимость автомобиля"}
          name={"cost"}
          min={"1000000"}
          max={"6000000"}
          type={"₽"}
          state={state}
          setState={setState}
        />
        <Field
          title={"Первоначальный взнос"}
          name={"contribution"}
          min={"10"}
          max={"60"}
          type={"%"}
          state={state}
          setState={setState}
        />
        <Field
          title={"Срок лизинга"}
          name={"period"}
          min={"1"}
          max={"60"}
          type={"мес."}
          state={state}
          setState={setState}
        />
      </form>
      <div className={styles.resultsContainer}>
        <div className={styles.results}>
          <ResultField text="Сумма договора лизинга" result={contractAmount} />
          <ResultField text="Ежемесячный платеж от" result={monthlyPayment} />
        </div>
        <div className={styles.button}>
          <button onClick={sendRequest} disabled={isSending}>
            {isSending ? <Loader /> : "Оставить заявку"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
