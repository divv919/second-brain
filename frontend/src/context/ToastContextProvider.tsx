import { useEffect, useRef, useState, type ReactNode } from "react";
import { ToastContext } from "./ToastContext";
import { CloseIcon } from "../icons/CloseIcon";
const variantStyles = {
  error: "bg-red-200",
  success: "bg-green-200",
  neutral: "bg-yellow-200",
};
export const ToastContextProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [snackbar, setSnackbar] = useState<{
    message: string;
    variant: "neutral" | "success" | "error";
  }>({
    message: "default",
    variant: "neutral",
  });
  const timeoutRef = useRef<number | undefined>(undefined);
  useEffect(() => {
    if (isOpen) {
      timeoutRef.current = setTimeout(() => {
        setIsOpen(false);
        setSnackbar({ message: "default", variant: "neutral" });
      }, 7000);
    }
    return () => clearTimeout(timeoutRef.current);
  }, [snackbar]);
  const enableSnackbar = (
    message: string,
    variant: "error" | "success" | "neutral"
  ) => {
    setSnackbar({ message, variant });
    setIsOpen(true);
  };

  return (
    <ToastContext.Provider value={{ enableSnackbar }}>
      {children}
      {isOpen && (
        <div
          onMouseEnter={() => {
            clearTimeout(timeoutRef.current);
            setIsOpen(true);
          }}
          onMouseLeave={() => {
            timeoutRef.current = setTimeout(() => setIsOpen(false), 1000);
          }}
          className={`${
            variantStyles[snackbar.variant]
          } border border-slate-400 fixed flex bottom-5 left-5 rounded min-w-50 p-4 shadow transition-all duration-500 ease-in-out ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="w-9/10">{snackbar.message}</div>
          <button className="cursor-pointer" onClick={() => setIsOpen(false)}>
            <CloseIcon />
          </button>
        </div>
      )}
    </ToastContext.Provider>
  );
};
