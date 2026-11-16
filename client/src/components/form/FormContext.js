import { createContext, useContext } from "react";

export const FormContext = createContext(null);

export function useFormContext() {
  const context = useContext(FormContext);

  if (context === null) {
    throw new Error(
      "useFormContext chỉ được dùng bên trong <SimpleForm>. " +
        "Hãy đặt ô nhập này vào trong biểu mẫu."
    );
  }

  return context;
}
