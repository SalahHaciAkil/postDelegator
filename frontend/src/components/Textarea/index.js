import React from "react";
import styles from "./Textarea.module.scss";
function Textarea({ ...rest }) {
  return <textarea className={styles.textarea} {...rest} />;
}

export default Textarea;
