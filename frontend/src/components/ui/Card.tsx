import { DeleteIcon } from "../../icons/DeleteIcon";
import { Tweet } from "react-tweet";
import { OpenInTabIcon } from "../../icons/OpenInTabIcon";
import { ShareIcon } from "../../icons/ShareIcon";
import { TwitterIcon } from "../../icons/TwitterIcon";
// import TwitterPreview from "../TwitterPreview";
import OtherPreview from "../OtherPreview";
import { Tag } from "./Tag";
import formatToDate from "../../utils/formatToDate";
import truncateWords from "../../utils/truncateWords";
import { YoutubeIcon } from "../../icons/YoutubeIcon";
import { LinkIcon } from "../../icons/LinkIcon";
import { Link } from "react-router-dom";
import { useToast } from "../../hooks/useToast";
interface CardProps {
  title: string;
  type: string;
  link: string;
  tags?: {
    name: string;
  }[];
  createdAt: string;
  onDelete?: () => void;
}
export const Card = ({
  title,
  type,
  link,
  tags,
  createdAt,
  onDelete,
}: CardProps) => {
  console.log(type);
  const { enableSnackbar } = useToast();
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(link);
      enableSnackbar("Link Copied", "success");
    } catch (err) {
      enableSnackbar("Failed to copy", "error");
      console.log(err);
    }
  };
  const extractTweetId = (link: string) => {
    const match = link.match(/x\.com\/[^/]+\/status\/(\d+)/);
    return match ? match[1] : "";
  };
  const extractYoutubeId = (link: string) => {
    const regex = /(?:youtube\.com\/.*v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = link.match(regex);
    return match ? match[1] : null;
  };
  return (
    <div className="w-full aspect-5/4  rounded-md shadow-md bg-white p-4 flex flex-col gap-4 ">
      <div className="flex justify-between gap-4 w-full">
        <div className="flex items-center gap-2  ">
          <div className="text-gray-600">
            {type === "twitter" && <TwitterIcon size="sm" />}
            {type === "youtube" && <YoutubeIcon size="sm" />}

            {type === "other" && <LinkIcon size="sm" />}
          </div>
          <div
            className="text-md lg:text-md h-10  font-medium  flex items-center  "
            title={title}
          >
            {truncateWords(title, 7)}
          </div>
        </div>
        <div className="flex items-center gap-3 text-gray-600 ">
          <div className="hover:text-primary cursor-pointer">
            <a target="_blank" href={link}>
              <OpenInTabIcon size="md" />
            </a>
          </div>
          <div
            className="hover:text-primary cursor-pointer"
            onClick={handleCopyLink}
          >
            <ShareIcon />
          </div>
          {onDelete && (
            <div
              className="hover:text-primary cursor-pointer"
              onClick={() => {
                onDelete?.();
              }}
            >
              <DeleteIcon size="md" />
            </div>
          )}
        </div>
      </div>
      <div className="aspect-16/9 w-full rounded-md overflow-hidden">
        {type === "twitter" ? (
          <div className="w-full h-full relative">
            <div className=" w-full h-full bg-gradient-to-t from-white from-0% to-99% to-transparent absolute z-10">
              <div className="absolute bottom-5 left-1/2 cursor-pointer text-gray-600">
                <OpenInTabIcon size="md" />
              </div>
            </div>
            <div className="light mt-[-20px] ">
              <Tweet id={extractTweetId(link)} />
            </div>
          </div>
        ) : type === "youtube" ? (
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${extractYoutubeId(link)}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        ) : (
          <OtherPreview link={link} />
        )}
      </div>

      <div className="text-sm text-gray-600">
        Added on {formatToDate(createdAt)}
      </div>
      <div className="flex w-full flex-wrap gap-2 h-5">
        {tags?.map((tag, index) => {
          if (index >= 7) {
            return;
          }
          return <Tag tagText={tag.name} />;
        })}
        {tags && tags.length > 7 && <div>...</div>}
      </div>
    </div>
  );
};
