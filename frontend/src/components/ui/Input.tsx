import { useEffect, useState, type ReactNode } from "react";
import { CloseIcon } from "../../icons/CloseIcon";

interface InputProps {
  placeholder?: string;
  type?: string;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement> | null | undefined
  ) => void;
  label: string;
  ref?: React.Ref<HTMLInputElement>;
  inSameLine?: boolean;
  checked?: boolean;
  loading?: boolean;
  maxLength?: string;
  sideButton?: ReactNode;
  errors?: string[];
}

export const Input = ({
  placeholder,
  type = "text",
  onChange,
  label,
  inSameLine = false,
  ref,
  checked,
  loading = false,
  maxLength = "300",
  sideButton,
  errors,
}: InputProps) => {
  const [showError, setShowError] = useState(true);
  useEffect(() => {
    setShowError(true);
  }, [errors]);
  return (
    <div className={` gap-2  ${inSameLine ? "flex" : "flex flex-col"}`}>
      <label className="text-sm font-medium text-gray-700">{label}</label>

      <div className="relative">
        <input
          ref={ref}
          className="w-full border-1 border-gray-300 outline-primary p-2 rounded-md"
          placeholder={placeholder}
          type={type}
          onChange={onChange}
          checked={checked}
          disabled={loading}
          maxLength={Number(maxLength)}
        />
        <div className="absolute bottom-1 right-2 cursor-pointer bg-blue-50 ">
          {sideButton}
        </div>
        {showError && errors?.length && (
          <>
            <div className="hidden xl:block w-100 shadow-current text-red-500 absolute p-2 -translate-x-30/29 top-5 rounded font-light bg-red-200">
              {errors.map((err) => (
                <p className="text-wrap">- {err}</p>
              ))}

              <div className=" rotate-90 absolute top-2 -right-3 w-0 h-0 border-l-8 border-r-8 border-b-[8px] border-l-transparent border-r-transparent border-b-red-200" />
              <div
                className="absolute top-2 right-2"
                onClick={() => setShowError(false)}
              >
                <CloseIcon />
              </div>
            </div>
            <div className="xl:hidden w-70 z-10 text-sm shadow-current text-red-500 absolute p-2   rounded font-light bg-red-200">
              {errors.map((err) => (
                <p className="text-wrap">- {err}</p>
              ))}
              <div
                className="absolute top-2 right-2"
                onClick={() => setShowError(false)}
              >
                <CloseIcon />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
