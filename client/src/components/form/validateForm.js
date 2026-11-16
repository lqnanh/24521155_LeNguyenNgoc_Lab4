export const FIELD_NAMES = {
  fullName: "fullName",
  email: "email",
  age: "age",
  password: "password",
  confirmPassword: "confirmPassword",
};

export const INITIAL_VALUES = {
  [FIELD_NAMES.fullName]: "",
  [FIELD_NAMES.email]: "",
  [FIELD_NAMES.age]: "",
  [FIELD_NAMES.password]: "",
  [FIELD_NAMES.confirmPassword]: "",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const INTEGER_PATTERN = /^-?\d+$/;

const MIN_NAME_LENGTH = 2;
const MIN_AGE = 16;
const MAX_AGE = 100;
const MIN_PASSWORD_LENGTH = 8;

function validateFullName(value) {
  const trimmed = value.trim();
  if (trimmed === "") return "Vui lòng nhập họ tên.";
  if (trimmed.length < MIN_NAME_LENGTH) {
    return `Họ tên phải có ít nhất ${MIN_NAME_LENGTH} ký tự.`;
  }
  return null;
}

function validateEmail(value) {
  const trimmed = value.trim();
  if (trimmed === "") return "Vui lòng nhập email.";
  if (!EMAIL_PATTERN.test(trimmed)) return "Email không đúng định dạng.";
  return null;
}

function validateAge(value) {
  const trimmed = value.trim();
  if (trimmed === "") return "Vui lòng nhập tuổi.";
  if (!INTEGER_PATTERN.test(trimmed)) return "Tuổi phải là số nguyên.";
  const age = Number(trimmed);
  if (age < MIN_AGE || age > MAX_AGE) {
    return `Tuổi phải từ ${MIN_AGE} đến ${MAX_AGE}.`;
  }
  return null;
}

function validatePassword(value) {
  if (value === "") return "Vui lòng nhập mật khẩu.";
  if (value.length < MIN_PASSWORD_LENGTH) {
    return `Mật khẩu phải có ít nhất ${MIN_PASSWORD_LENGTH} ký tự.`;
  }
  return null;
}

function validateConfirmPassword(value, password) {
  if (value !== password) return "Mật khẩu nhập lại không khớp.";
  return null;
}

export function validateForm(values) {
  const checks = {
    [FIELD_NAMES.fullName]: validateFullName(values.fullName),
    [FIELD_NAMES.email]: validateEmail(values.email),
    [FIELD_NAMES.age]: validateAge(values.age),
    [FIELD_NAMES.password]: validatePassword(values.password),
    [FIELD_NAMES.confirmPassword]: validateConfirmPassword(
      values.confirmPassword,
      values.password
    ),
  };

  const errors = {};
  for (const [field, message] of Object.entries(checks)) {
    if (message !== null) {
      errors[field] = message;
    }
  }
  return errors;
}
