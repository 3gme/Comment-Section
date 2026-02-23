import { useState } from "react";
import styles from "./Counter.module.css";

function Counter({ score, onChange }) {
  const [clicked, setClicked] = useState(false);

  function handleInc() {
    setClicked(true);
    onChange?.(1);
  }
  function handleDec() {
    if (score <= 0) return;
    setClicked(true);
    onChange?.(-1);
  }

  return (
    <div className={styles.counter}>
      <button onClick={handleInc} disabled={clicked}>
        +
      </button>
      <span>{score}</span>
      <button onClick={handleDec} disabled={clicked}>
        -
      </button>
    </div>
  );
}

export default Counter;
