import React from "react";
import styles from "./Button.module.scss";
function Button({ children, onClick, width, hidden, ...rest }) {
  return (
    <button
      style={{
        width,
        display: hidden ? "none" : "block",
      }}
      className={styles.button}
      {...rest}
      onClick={() => onClick?.()}
    >
      {children}
    </button>
  );
}

export default Button;
