import { BrainIcon } from "../../icons/BrainIcon";
import { HomeIcon } from "../../icons/HomeIcon";
import { LinkIcon } from "../../icons/LinkIcon";
import { TwitterIcon } from "../../icons/TwitterIcon";
import { YoutubeIcon } from "../../icons/YoutubeIcon";
import { SideBarItem } from "./SideBarItem";
import { Tag } from "./Tag";
export const SideBar = () => {
  return (
    <div className="w-1/5 h-screen fixed flex flex-col gap-6  shadow-md border-r-1 border-surface ">
      <div className="flex gap-3 p-5 border-b-2 border-gray-200">
        <div className="flex justify-center items-center ">
          <BrainIcon size="xl" />
        </div>
        <div className="flex text-2xl  items-center font-bold">
          Second Brain
        </div>
      </div>
      <div className="flex flex-col gap-6 px-6">
        <div className="flex flex-col gap-4">
          <SideBarItem icon={<HomeIcon size="lg" />} title="Dashboard" />
        </div>
        <div className=" flex flex-col gap-4">
          <div className="text-sm text-gray-600">COLLECTIONS</div>
          <div className="flex flex-col gap-6">
            <SideBarItem icon={<TwitterIcon size="lg" />} title="Twitter" />
            <SideBarItem icon={<YoutubeIcon size="lg" />} title="Youtube" />
            <SideBarItem icon={<LinkIcon size="lg" />} title="Others" />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="text-sm text-gray-600">TAGS</div>
          <div className="flex flex-wrap gap-2">
            <Tag tagText="productivity" />
            <Tag tagText="new" />
            <Tag tagText="hacks" />
          </div>
        </div>
      </div>
    </div>
  );
};
