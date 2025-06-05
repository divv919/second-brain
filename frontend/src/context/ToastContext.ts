import { createContext } from "react";
type ToastContextType = {
  enableSnackbar: (
    message: string,
    variant: "error" | "success" | "neutral"
  ) => void;
};
export const ToastContext = createContext<ToastContextType | null>(null);
