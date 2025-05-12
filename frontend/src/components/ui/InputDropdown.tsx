import { changeToTagFormat } from "../../utils/changeToTagFormat";
interface InputDropdownProps {
  onChange?: () => void;
  label: string;
  options: string[];
  ref: React.Ref<HTMLSelectElement>;
}
export const InputDropdown = ({
  onChange,
  label,
  options,
  ref,
}: InputDropdownProps) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>

      <select
        ref={ref}
        className=" border-1 border-gray-300 outline-primary p-2 rounded-md"
      >
        {options.map((option) => (
          <option className="" value={changeToTagFormat(option, false)}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};
