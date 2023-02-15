import styles from "./Modal.module.scss";

function Modal({ children, isOpen }) {
  return (
    <div
      className={styles.modal}
      style={{
        display: isOpen ? "flex" : "none",
      }}
    >
      <div className={styles.backdrop} />
      <div className={styles.frame}>{children}</div>
    </div>
  );
}

export default Modal;
