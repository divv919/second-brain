import { useState } from "react";
import { changeToTagFormat } from "../../utils/changeToTagFormat";
import { CloseIcon } from "../../icons/CloseIcon";

interface InputProps {
  placeholder: string;
  type: string;
  onChange?: () => void;
  label: string;
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
}
export const InputTags = ({
  placeholder,
  type,
  onChange,
  label,
  tags,
  setTags,
}: InputProps) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      // rules :- first sanitize , no duplicates, no empty
      const val = changeToTagFormat(
        (e.target as HTMLInputElement).value,
        false
      );
      if (val !== "" && !tags.find((tag) => tag === val)) {
        setTags([...tags, val]);
      }
      (e.target as HTMLInputElement).value = "";
    }
  };

  const removeTag = (index: number) => {
    setTags(tags.filter((_, idx) => idx !== index));
  };

  const tagStyles =
    "w-max bg-surface text-primary text-xs p-1 mb-2 rounded-md cursor-pointer gap-2 flex items-center ";

  return (
    <div className="flex flex-col gap-2 ">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <div className="p-2 border-1 flex flex-col  border-gray-300 rounded-md">
        <div className="flex gap-2 flex-wrap items-center ">
          {tags.map((tag, index) => (
            <div key={index} className={tagStyles}>
              <div>#{tag}</div>
              <div
                onClick={() => {
                  removeTag(index);
                }}
              >
                <div className="bg-primary-light text-white  rounded-md">
                  <CloseIcon size="md" />
                </div>
              </div>
            </div>
          ))}
        </div>
        <input
          className=" border-1 border-gray-300 outline-primary p-2 rounded-md w-full"
          placeholder={placeholder}
          type={type}
          onKeyDown={handleKeyDown}
          onChange={onChange}
        />
      </div>
    </div>
  );
};
