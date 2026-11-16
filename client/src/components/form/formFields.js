export const FIELD_NAMES = {
  fullName: "fullName",
  email: "email",
  age: "age",
  password: "password",
  confirmPassword: "confirmPassword",
};

export const FIELD_ORDER = [
  FIELD_NAMES.fullName,
  FIELD_NAMES.email,
  FIELD_NAMES.age,
  FIELD_NAMES.password,
  FIELD_NAMES.confirmPassword,
];

export const INITIAL_VALUES = {
  [FIELD_NAMES.fullName]: "",
  [FIELD_NAMES.email]: "",
  [FIELD_NAMES.age]: "",
  [FIELD_NAMES.password]: "",
  [FIELD_NAMES.confirmPassword]: "",
};

export const FIELD_LABELS = {
  [FIELD_NAMES.fullName]: "Họ tên",
  [FIELD_NAMES.email]: "Email",
  [FIELD_NAMES.age]: "Tuổi",
  [FIELD_NAMES.password]: "Mật khẩu",
  [FIELD_NAMES.confirmPassword]: "Nhập lại mật khẩu",
};

export const SECRET_FIELDS = [
  FIELD_NAMES.password,
  FIELD_NAMES.confirmPassword,
];
