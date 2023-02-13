import React from "react";
import styles from "./ModalButton.module.scss";
function ModalButton({ children, onClick, ...rest }) {
  return (
    <button className={styles.button} {...rest} onClick={() => onClick?.()}>
      {children}
    </button>
  );
}

export default ModalButton;
