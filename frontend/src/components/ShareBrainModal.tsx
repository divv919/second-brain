import { CloseIcon } from "../icons/CloseIcon";
import { CopyIcon } from "../icons/CopyIcon";
import { Button } from "./ui/Button";

export const ShareBrainModal = ({ onClose }: { onClose: () => void }) => {
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
            />
            <div className="text-center">(x Contents will be shared)</div>
          </div>
        </div>
      </div>
    </div>
  );
};
