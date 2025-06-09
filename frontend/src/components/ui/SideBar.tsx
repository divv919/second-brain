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
import { useAuth } from "../../hooks/useAuth";
import LogoutIcon from "../../icons/LogoutIcon";
import { useToast } from "../../hooks/useToast";
import Skeleton from "react-loading-skeleton";

interface TagData {
  tagId: string;
  tagName: string;
  totalQuantity: number;
}
export const SideBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { data, error, loading } = useFetch<TagData[]>(
    `${import.meta.env.VITE_BACKEND_ROOT_URL}/api/v1/mostUsedTags`
  );
  const { enableSnackbar } = useToast();

  return (
    <div className="w-1/5 h-screen fixed flex flex-col gap-6  shadow-md  ">
      <div className="flex gap-3 p-6 border-b-2 border-gray-200 cursor-pointer text-blue-600">
        <div className="flex justify-center items-center ">
          <BrainIcon />
        </div>
        <div className="flex text-3xl   items-center font-extrabold tracking-tighter ">
          Second Brain
        </div>
      </div>
      <div className="flex flex-col gap-6 px-6">
        <div className="flex flex-col gap-4">
          <SideBarItem
            icon={<HomeIcon size="md" />}
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
              icon={<TwitterIcon size="md" />}
              title="Twitter"
              onClick={() => navigate("/home/twitter")}
            />
            <SideBarItem
              isActive={location.pathname === "/home/youtube"}
              icon={<YoutubeIcon size="md" />}
              title="Youtube"
              onClick={() => navigate("/home/youtube")}
            />
            <SideBarItem
              isActive={location.pathname === "/home/other"}
              icon={<LinkIcon size="md" />}
              title="Others"
              onClick={() => navigate("/home/other")}
            />
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="text-sm text-gray-600">MOST USED TAGS</div>
          <div className="flex flex-wrap gap-2">
            {loading ? (
              <div className="w-fill">
                <Skeleton />
              </div>
            ) : (
              (!data?.length || error) && (
                <div className=" text-gray-600">No tags</div>
              )
            )}
            {data?.map((tag) => (
              <Tag tagText={tag.tagName}></Tag>
            ))}
          </div>
        </div>
        <div
          onClick={() => {
            logout();
            enableSnackbar("Logged out successfully", "success");
            navigate("/auth");
          }}
        >
          <SideBarItem icon={<LogoutIcon size="md" />} title="Logout" />
        </div>
      </div>
    </div>
  );
};
