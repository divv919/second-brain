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
}

const checkBoxStyles = "";

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
}: InputProps) => {
  return (
    <div className={`gap-2 ${inSameLine ? "flex" : "flex flex-col"}`}>
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <input
        ref={ref}
        className=" border-1 border-gray-300 outline-primary p-2 rounded-md"
        placeholder={placeholder}
        type={type}
        onChange={onChange}
        checked={checked}
        disabled={loading}
        maxLength={Number(maxLength)}
      />
    </div>
  );
};
