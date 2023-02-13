import styles from "./Modal.module.scss";
import ModalButton from "./ModalButton";

function Modal({ children, handleClose, handleSave, isOpen }) {
  return (
    <div
      className={styles.modal}
      style={{
        display: isOpen ? "flex" : "none",
      }}
    >
      <div className={styles.backdrop} />
      <div className={styles.frame}>
        {children}
        <div className={styles.btns}>
          <ModalButton onClick={handleClose}>Cancel</ModalButton>
          <ModalButton onClick={handleSave}>Save</ModalButton>
        </div>
      </div>
    </div>
  );
}

export default Modal;
