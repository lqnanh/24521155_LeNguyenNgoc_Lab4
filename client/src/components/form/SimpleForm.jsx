import { useRef, useState } from "react";
import { flushSync } from "react-dom";
import { FormContext } from "./FormContext.js";
import InputField from "./InputField.jsx";
import ShowData from "./ShowData.jsx";
import { validateForm } from "./validateForm.js";
import {
  FIELD_LABELS,
  FIELD_NAMES,
  FIELD_ORDER,
  INITIAL_VALUES,
  SECRET_FIELDS,
} from "./formFields.js";
import styles from "./SimpleForm.module.css";

const SUBMIT_STATUS = {
  idle: "idle",
  success: "success",
  error: "error",
};

function SimpleForm({ initialValues = INITIAL_VALUES }) {
  const formRef = useRef(null);
  const [values, setValues] = useState(initialValues);
  const [touched, setTouched] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [submitStatus, setSubmitStatus] = useState(SUBMIT_STATUS.idle);

  const errors = validateForm(values);
  const errorCount = Object.keys(errors).length;
  const isValid = errorCount === 0;

  function setFieldValue(name, value) {
    setValues((previous) => ({ ...previous, [name]: value }));
  }

  function markTouched(name) {
    setTouched((previous) =>
      previous[name] ? previous : { ...previous, [name]: true }
    );
  }

  function focusField(name) {
    const element = formRef.current?.elements.namedItem(name);
    if (element instanceof HTMLElement) {
      element.focus();
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!isValid) {
      flushSync(() => {
        setHasSubmitted(true);
        setSubmittedData(null);
        setSubmitStatus(SUBMIT_STATUS.error);
      });
      const firstInvalidField = FIELD_ORDER.find((name) => name in errors);
      if (firstInvalidField) {
        focusField(firstInvalidField);
      }
      return;
    }

    setHasSubmitted(true);
    setSubmittedData({ ...values });
    setSubmitStatus(SUBMIT_STATUS.success);
  }

  function handleReset() {
    setValues(initialValues);
    setTouched({});
    setHasSubmitted(false);
    setSubmittedData(null);
    setSubmitStatus(SUBMIT_STATUS.idle);
    focusField(FIELD_NAMES.fullName);
  }

  let statusMessage = "";
  let statusClassName = styles.status;
  if (submitStatus === SUBMIT_STATUS.success) {
    statusMessage = "Gửi thành công! Dữ liệu bạn vừa gửi được hiển thị bên dưới.";
    statusClassName = `${styles.status} ${styles.statusSuccess}`;
  } else if (submitStatus === SUBMIT_STATUS.error && !isValid) {
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
      <form
        ref={formRef}
        className={styles.form}
        noValidate
        onSubmit={handleSubmit}
      >
        <InputField
          name={FIELD_NAMES.fullName}
          label={FIELD_LABELS.fullName}
          type="text"
          autoComplete="name"
        />
        <InputField
          name={FIELD_NAMES.email}
          label={FIELD_LABELS.email}
          type="email"
          autoComplete="email"
        />
        <InputField
          name={FIELD_NAMES.age}
          label={FIELD_LABELS.age}
          type="number"
          min={16}
          max={100}
          step={1}
        />
        <InputField
          name={FIELD_NAMES.password}
          label={FIELD_LABELS.password}
          type="password"
          autoComplete="new-password"
        />
        <InputField
          name={FIELD_NAMES.confirmPassword}
          label={FIELD_LABELS.confirmPassword}
          type="password"
          autoComplete="new-password"
        />

        <div className={styles.actions}>
          <button type="submit" className={styles.submit}>
            Gửi
          </button>
          <button
            type="button"
            className={styles.secondary}
            onClick={handleReset}
          >
            Làm lại
          </button>
        </div>

        <p className={statusClassName} role="status" aria-live="polite">
          {statusMessage}
        </p>
      </form>

      {submittedData !== null && (
        <ShowData
          data={submittedData}
          labels={FIELD_LABELS}
          secretFields={SECRET_FIELDS}
        />
      )}
    </FormContext>
  );
}

export default SimpleForm;
