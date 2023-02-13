import styles from "./FormInput.module.scss";

function FormInput({ placeholder, type, value, name, change, ...rest }) {
  return (
    <div className={styles.formInput}>
      <input
        type={type}
        value={value}
        name={name}
        placeholder={placeholder}
        onChange={change}
        {...rest}
      />
    </div>
  );
}

export default FormInput;
