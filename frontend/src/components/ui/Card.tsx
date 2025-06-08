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
    }
  };
  console.log("console from card : ", createdAt);
  return (
    <div className="w-full aspect-5/4  rounded-md shadow-md bg-white p-6 flex flex-col gap-4 ">
      <div className="flex justify-between  w-full">
        <div className="flex items-center gap-2  ">
          <div className="text-gray-600">
            {type === "twitter" && <TwitterIcon size="md" />}
            {type === "youtube" && <YoutubeIcon size="md" />}

            {type === "other" && <LinkIcon size="md" />}
          </div>
          <Link to={link}>
            <div
              className="text-md lg:text-lg  font-medium h-14 flex items-center cursor-pointer hover:text-primary "
              title={title}
            >
              {truncateWords(title, 7)}
            </div>
          </Link>
        </div>
        <div className="flex items-center gap-2 text-gray-600 ">
          <div className="hover:text-primary cursor-pointer">
            <a target="_blank" href={link}>
              <OpenInTabIcon size="md" />
            </a>
          </div>
          <div
            className="hover:text-primary cursor-pointer"
            onClick={handleCopyLink}
          >
            <ShareIcon size="md" />
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
          // <TwitterPreview link={link} />
          <div className="w-full h-full relative">
            <div className=" w-full h-full bg-gradient-to-t from-white from-0% to-99% to-transparent absolute z-10">
              <div className="absolute bottom-5 left-1/2 cursor-pointer text-gray-600">
                <OpenInTabIcon size="md" />
              </div>
            </div>
            <div className="light mt-[-20px] ">
              <Tweet id="1928484936417255711" />
            </div>
          </div>
        ) : (
          <OtherPreview link={link} />
        )}
      </div>

      <div className="text-sm text-gray-600">
        Added on {formatToDate(createdAt)}
      </div>
      <div className="flex w-full flex-wrap gap-2 ">
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
