import { useRef, useState } from "react";
import { CloseIcon } from "../icons/CloseIcon";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { InputTags } from "./ui/InputTags";
import { useAuth } from "../hooks/useAuth";
import { useToast } from "../hooks/useToast";
import { z } from "zod";

const INPUT_SCHEMA = z.object({
  link: z
    .string()
    .max(254, "Link must be smaller than 254 characters")
    .regex(
      /(?:https?:\/\/)?(?:www\.)?[a-zA-Z0-9-]+\.[a-z]{2,}(?:[/?#][^\s]*)?/,
      "Invalid URL format"
    ),
  title: z.string().min(3).max(40),
});

export const AddButtonModal = ({
  onClose,
  refetch,
}: {
  onClose: () => void;
  refetch: () => void;
}) => {
  const [errors, setErrors] = useState<{
    link: string[] | undefined;
    title: string[] | undefined;
  }>({ link: undefined, title: undefined });

  const { token } = useAuth();
  const contentTitle = useRef<HTMLInputElement>(null);
  const contentLink = useRef<HTMLInputElement>(null);
  // const contentType = useRef<HTMLSelectElement>(null);
  const [loading, setLoading] = useState(false);
  const { enableSnackbar } = useToast();

  const checkURLType = (link: string) => {
    if (link.includes("youtube") || link.includes("youtu.be")) {
      return "youtube";
    } else if (link.includes("x.com")) {
      return "twitter";
    } else {
      return "other";
    }
  };

  async function handleSubmit() {
    try {
      setLoading(true);
      const res = INPUT_SCHEMA.safeParse({
        link: contentLink.current?.value,
        title: contentTitle.current?.value,
      });
      if (!res.success) {
        const { link, title } = res.error.flatten().fieldErrors;
        setErrors({ link, title });
        return;
      }
      setErrors({ link: undefined, title: undefined });
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_ROOT_URL}/api/v1/content`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",

            ...(token ? { Authorization: token } : {}),
          },

          body: JSON.stringify({
            link: contentLink.current?.value,
            title: contentTitle.current?.value,
            type: checkURLType(contentLink.current?.value || ""),
            tags: tags,
          }),
        }
      );
      if (!response.ok) {
        throw new Error();
      }
      refetch();
      onClose();
      enableSnackbar("Added content successfully", "success");
    } catch (err) {
      console.log(err);
      enableSnackbar("Error adding content", "error");
    } finally {
      setLoading(false);
    }
  }
  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  return (
    <div className="flex  h-full w-full top-0 left-0  justify-center fixed z-100 items-center">
      <div className="bg-black opacity-80 w-screen h-screen  "></div>
      <div className="fixed w-1/2 min-w-84 max-w-96 aspect-2/1 bg-white p-6 flex flex-col gap-4 rounded-md">
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
            errors={errors.link}
          />
          <Input
            ref={contentTitle}
            type="text"
            placeholder="Link Title"
            label="Title"
            maxLength="40"
            errors={errors.title}
          />
          <InputTags
            type="text"
            placeholder="Enter Tags"
            label="Tags"
            tags={tags}
            setTags={setTags}
            onChange={setInputValue}
            value={inputValue}
            maxLength="10"
          />
          {/* <InputDropdown
            ref={contentType}
            label="Type"
            options={["Twitter", "Youtube", "Other"]}
          /> */}
        </div>
        <div className="flex justify-end gap-2">
          <Button
            loading={loading}
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
