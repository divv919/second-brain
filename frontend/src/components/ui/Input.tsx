interface InputProps {
  placeholder: string;
  type: string;
  onChange?: () => void;
  label: string;
}
export const Input = ({ placeholder, type, onChange, label }: InputProps) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>

      <input
        className=" border-1 border-gray-300 outline-primary p-2 rounded-md"
        placeholder={placeholder}
        type={type}
        onChange={onChange}
      />
    </div>
  );
};
