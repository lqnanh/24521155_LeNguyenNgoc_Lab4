import { useState } from "react";
import { FormContext } from "./FormContext.js";
import { INITIAL_VALUES, validateForm } from "./validateForm.js";
import styles from "./SimpleForm.module.css";

function SimpleForm({ initialValues = INITIAL_VALUES }) {
  const [values, setValues] = useState(initialValues);

  const errors = validateForm(values);
  const errorCount = Object.keys(errors).length;
  const isValid = errorCount === 0;

  function setFieldValue(name, value) {
    setValues((previous) => ({ ...previous, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  const contextValue = { values, errors, isValid, setFieldValue };

  return (
    <FormContext value={contextValue}>
      <form className={styles.form} noValidate onSubmit={handleSubmit}>
        <p className={styles.status} role="status" aria-live="polite">
          {isValid
            ? "Biểu mẫu hợp lệ, không có lỗi nào."
            : `Biểu mẫu hiện có ${errorCount} lỗi.`}
        </p>
      </form>
    </FormContext>
  );
}

export default SimpleForm;
