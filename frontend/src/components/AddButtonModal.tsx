import { useRef, useState } from "react";
import { CloseIcon } from "../icons/CloseIcon";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { InputDropdown } from "./ui/InputDropdown";
import { InputTags } from "./ui/InputTags";
export const AddButtonModal = ({
  onClose,
  refetch,
}: {
  onClose: () => void;
  refetch: () => void;
}) => {
  const contentTitle = useRef<HTMLInputElement>(null);
  const contentLink = useRef<HTMLInputElement>(null);
  const contentType = useRef<HTMLSelectElement>(null);
  async function handleSubmit() {
    try {
      const response = await fetch("http://localhost:3000/api/v1/content", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",

          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODIxYTUyYTUxOWU1NjdmYThmMzRkNjEiLCJpYXQiOjE3NDcwMzU0Mzh9.C5rS8L233xWV23KbNvkZGAQyrYOVysdxBuT_9yS5cbo",
        },

        body: JSON.stringify({
          link: contentLink.current?.value,
          title: contentTitle.current?.value,
          type: contentType.current?.value,
          tags: tags,
        }),
      });
      if (!response.ok) {
        throw new Error();
      }
      const result = await response.json();
      refetch();
      onClose();
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  }
  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState(" ");
  return (
    <div className="flex  h-full w-full top-0 left-0  justify-center fixed z-10 items-center">
      <div className="bg-black opacity-80 w-screen h-screen  "></div>
      <div className="fixed w-1/3 min-h-1/2 bg-white p-6 flex flex-col gap-4 rounded-md">
        <div className="flex justify-between border-b border-gray-300 pb-2">
          <div className="text-xl font-semibold text-blue-600">
            Add New Link
          </div>
          <div onClick={onClose} className="text-gray-800 cursor-pointer">
            <CloseIcon size="md" />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <Input
            ref={contentLink}
            type="url"
            placeholder="www.example.com"
            label="URL"
            maxLength="254"
          />
          <Input
            ref={contentTitle}
            type="text"
            placeholder="Link Title"
            label="Title"
            maxLength="100"
          />
          <InputTags
            type="text"
            placeholder="Enter Tags"
            label="Tags"
            tags={tags}
            setTags={setTags}
            onChange={setInputValue}
            value={inputValue}
            maxLength="30"
          />
          <InputDropdown
            ref={contentType}
            label="Type"
            options={["Twitter", "Youtube", "Other"]}
          />
        </div>
        <div className="flex justify-end gap-2">
          <Button
            variant="primary"
            size="md"
            text="Add Link"
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};
