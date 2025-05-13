import { BrainIcon } from "../../icons/BrainIcon";
import { HomeIcon } from "../../icons/HomeIcon";
import { LinkIcon } from "../../icons/LinkIcon";
import { TwitterIcon } from "../../icons/TwitterIcon";
import { YoutubeIcon } from "../../icons/YoutubeIcon";
import { SideBarItem } from "./SideBarItem";
import { useLocation } from "react-router-dom";
import { Tag } from "./Tag";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";

interface TagData {
  tagId: string;
  tagName: string;
  totalQuantity: number;
}
export const SideBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { data, error, loading, refetch } = useFetch<TagData[]>(
    "http://localhost:3000/api/v1/mostUsedTags"
  );
  return (
    <div className="w-1/5 h-screen fixed flex flex-col gap-6  shadow-md border-r-1 border-surface ">
      <div className="flex gap-3 p-5 border-b-2 border-gray-200 cursor-pointer">
        <div className="flex justify-center items-center ">
          <BrainIcon size="xl" />
        </div>
        <div className="flex text-2xl  items-center font-bold">
          Second Brain
        </div>
      </div>
      <div className="flex flex-col gap-6 px-6">
        <div className="flex flex-col gap-4">
          <SideBarItem
            icon={<HomeIcon size="lg" />}
            title="Dashboard"
            isActive={location.pathname === "/home/dashboard"}
            onClick={() => navigate("/home/dashboard")}
          />
        </div>
        <div className=" flex flex-col gap-4">
          <div className="text-sm text-gray-600">COLLECTIONS</div>
          <div className="flex flex-col gap-6">
            <SideBarItem
              isActive={location.pathname === "/home/twitter"}
              icon={<TwitterIcon size="lg" />}
              title="Twitter"
              onClick={() => navigate("/home/twitter")}
            />
            <SideBarItem
              isActive={location.pathname === "/home/youtube"}
              icon={<YoutubeIcon size="lg" />}
              title="Youtube"
              onClick={() => navigate("/home/youtube")}
            />
            <SideBarItem
              isActive={location.pathname === "/home/other"}
              icon={<LinkIcon size="lg" />}
              title="Others"
              onClick={() => navigate("/home/other")}
            />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="text-sm text-gray-600">MOST USED TAGS</div>
          <div className="flex flex-wrap gap-2">
            {data?.map((tag) => (
              <Tag tagText={tag.tagName}></Tag>
            ))}
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
};
