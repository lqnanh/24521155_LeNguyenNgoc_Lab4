import { useState } from "react";
import { FormContext } from "./FormContext.js";
import InputField from "./InputField.jsx";
import { FIELD_NAMES, INITIAL_VALUES, validateForm } from "./validateForm.js";
import styles from "./SimpleForm.module.css";

function SimpleForm({ initialValues = INITIAL_VALUES }) {
  const [values, setValues] = useState(initialValues);
  const [touched, setTouched] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [submittedName, setSubmittedName] = useState(null);

  const errors = validateForm(values);
  const errorCount = Object.keys(errors).length;
  const isValid = errorCount === 0;

  function setFieldValue(name, value) {
    setValues((previous) => ({ ...previous, [name]: value }));
    setSubmittedName(null);
  }

  function markTouched(name) {
    setTouched((previous) =>
      previous[name] ? previous : { ...previous, [name]: true }
    );
  }

  function handleSubmit(event) {
    event.preventDefault();
    setHasSubmitted(true);
    if (isValid) {
      setSubmittedName(values.fullName.trim());
    }
  }

  let statusMessage = "";
  let statusClassName = styles.status;
  if (submittedName !== null) {
    statusMessage = `Đã gửi thành công thông tin của ${submittedName}.`;
    statusClassName = `${styles.status} ${styles.statusSuccess}`;
  } else if (hasSubmitted && !isValid) {
    statusMessage = `Chưa gửi được: biểu mẫu còn ${errorCount} lỗi. Vui lòng sửa các ô được đánh dấu.`;
    statusClassName = `${styles.status} ${styles.statusError}`;
  }

  const contextValue = {
    values,
    errors,
    isValid,
    touched,
    hasSubmitted,
    setFieldValue,
    markTouched,
  };

  return (
    <FormContext value={contextValue}>
      <form className={styles.form} noValidate onSubmit={handleSubmit}>
        <InputField
          name={FIELD_NAMES.fullName}
          label="Họ tên"
          type="text"
          autoComplete="name"
        />
        <InputField
          name={FIELD_NAMES.email}
          label="Email"
          type="email"
          autoComplete="email"
        />
        <InputField
          name={FIELD_NAMES.age}
          label="Tuổi"
          type="number"
          min={16}
          max={100}
          step={1}
        />
        <InputField
          name={FIELD_NAMES.password}
          label="Mật khẩu"
          type="password"
          autoComplete="new-password"
        />
        <InputField
          name={FIELD_NAMES.confirmPassword}
          label="Nhập lại mật khẩu"
          type="password"
          autoComplete="new-password"
        />

        <button type="submit" className={styles.submit}>
          Gửi
        </button>

        <p className={statusClassName} role="status" aria-live="polite">
          {statusMessage}
        </p>
      </form>
    </FormContext>
  );
}

export default SimpleForm;
