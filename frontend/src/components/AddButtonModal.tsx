import { CloseIcon } from "../icons/CloseIcon";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { InputDropdown } from "./ui/InputDropdown";
export const AddButtonModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="flex  h-full w-full top-0 left-0  justify-center fixed z-10 items-center">
      <div className="bg-black opacity-80 w-screen h-screen  "></div>
      <div className="fixed w-1/3 min-h-1/2 bg-white p-6 flex flex-col gap-4 rounded-md">
        <div className="flex justify-between border-b border-gray-300 pb-2">
          <div className="text-lg font-semibold">Add New Link</div>
          <div onClick={onClose}>
            <CloseIcon size="lg" />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <Input type="text" placeholder="www.example.com" label="URL" />
          <Input type="text" placeholder="Link Title" label="Title" />
          <InputDropdown
            label="Type"
            options={["Twitter", "Youtube", "Other"]}
          />
          <Input type="text" placeholder="Enter Tags" label="Tags" />
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="primary" size="md" text="Add Link" />
        </div>
      </div>
    </div>
  );
};
