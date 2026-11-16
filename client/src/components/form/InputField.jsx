import { useId } from "react";
import { useFormContext } from "./FormContext.js";
import styles from "./InputField.module.css";

function InputField({ name, label, type = "text", ...inputProps }) {
  const baseId = useId();
  const inputId = `${baseId}-input`;
  const errorId = `${baseId}-error`;

  const { values, errors, touched, hasSubmitted, setFieldValue, markTouched } =
    useFormContext();

  const value = values[name] ?? "";
  const error = errors[name];
  const wasTouched = touched[name] === true;
  const showError = Boolean(error) && (wasTouched || hasSubmitted);

  const inputClassName = showError
    ? `${styles.input} ${styles.inputInvalid}`
    : styles.input;

  function handleChange(event) {
    setFieldValue(name, event.target.value);
  }

  function handleBlur() {
    markTouched(name);
  }

  return (
    <div className={styles.field}>
      <label htmlFor={inputId} className={styles.label}>
        {label}
      </label>
      <input
        {...inputProps}
        id={inputId}
        name={name}
        type={type}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        aria-invalid={showError}
        aria-describedby={showError ? errorId : undefined}
        className={inputClassName}
      />
      <p id={errorId} className={styles.error} role="alert">
        {showError ? error : ""}
      </p>
    </div>
  );
}

export default InputField;
