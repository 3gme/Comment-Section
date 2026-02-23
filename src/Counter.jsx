import { useState } from "react";
import styles from "./Counter.module.css";

function Counter({ score }) {
  const [counter, setCounter] = useState(Number(score));
  const [clicked, setClicked] = useState(false);

  function handleInc() {
    setClicked(true);
    setCounter((counter) => counter + 1);
  }
  function handleDec() {
    setClicked(true);
    setCounter((counter) => counter - 1);
  }

  return (
    <div className={styles.counter}>
      <button onClick={handleInc} disabled={clicked}>
        +
      </button>
      <span>{counter}</span>
      <button onClick={handleDec} disabled={clicked}>
        -
      </button>
    </div>
  );
}

export default Counter;
