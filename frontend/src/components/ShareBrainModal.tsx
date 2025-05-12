import { CloseIcon } from "../icons/CloseIcon";
import { CopyIcon } from "../icons/CopyIcon";
import { Button } from "./ui/Button";

export const ShareBrainModal = ({
  onClose,
  totalContents = 0,
}: {
  onClose: () => void;
  totalContents?: number;
}) => {
  async function handleCopy() {
    try {
      const response = await fetch("http://localhost:3000/api/v1/brain/share", {
        credentials: "include",
        method: "POST",
        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODIxYTUyYTUxOWU1NjdmYThmMzRkNjEiLCJpYXQiOjE3NDcwMzU0Mzh9.C5rS8L233xWV23KbNvkZGAQyrYOVysdxBuT_9yS5cbo",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ enableShare: true }),
      });
      if (!response.ok) {
        throw new Error("Error enabling link share");
      }
      const json = await response.json();
      await navigator.clipboard.writeText(
        "http://localhost:5173/sharedBrain/" + encodeURIComponent(json.link)
      );
      alert("link copied");
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="flex  h-full w-full top-0 left-0  justify-center fixed z-10 items-center">
      <div className="bg-black opacity-80 w-screen h-screen  "></div>
      <div className="fixed w-1/3 min-h-1/2 bg-white p-6 flex flex-col gap-4 rounded-md">
        <div className="flex justify-between border-b border-gray-300 pb-2">
          <div className="text-lg font-semibold">Share Your Second Brain</div>
          <div onClick={onClose}>
            <CloseIcon size="lg" />
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <div className="w-full break-words text-gray-800 ">
            Share your entire contents of Notes, Documents, Tweets and Video
            links stored in your Second Brain with others. <br />
            Person with the link will be able to see and import all your
            contents into their own Second Brain.
          </div>
          <div className="flex flex-col gap-2">
            <Button
              text="Copy Link"
              variant="primary"
              endIcon={<CopyIcon size="lg" />}
              size="md"
              onClick={handleCopy}
            />
            <div className="text-center">
              {totalContents} Contents will be shared
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
