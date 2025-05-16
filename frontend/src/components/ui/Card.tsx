import { DeleteIcon } from "../../icons/DeleteIcon";
import { DownArrowIcon } from "../../icons/DownArrowIcon";
import { OpenInTabIcon } from "../../icons/OpenInTabIcon";
import { ShareIcon } from "../../icons/ShareIcon";
import { TwitterIcon } from "../../icons/TwitterIcon";
import TwitterPreview from "../TwitterPreview";
import YoutubePreview from "../YoutubePreview";
import OtherPreview from "../OtherPreview";
import { Tag } from "./Tag";
import formatToDate from "../../utils/formatToDate";
import truncateWords from "../../utils/truncateWords";
import { YoutubeIcon } from "../../icons/YoutubeIcon";
import { LinkIcon } from "../../icons/LinkIcon";
import { Link } from "react-router-dom";
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
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(link);
    } catch (err) {
      console.log("error copying");
    }
  };
  console.log("console from card : ", createdAt);
  return (
    <div className="w-95 h-100 size-fit rounded-md shadow-md bg-white p-6 flex flex-col gap-4 ">
      <div className="flex justify-between  w-full">
        <div className="flex items-center gap-2  ">
          <div className="text-gray-600">
            {type === "tweet" && <TwitterIcon size="md" />}
            {type === "youtube" && <YoutubeIcon size="md" />}

            {type === "other" && <LinkIcon size="md" />}
          </div>
          <Link to={link}>
            <div
              className="text-lg  font-medium h-14 flex items-center cursor-pointer hover:text-primary "
              title={title}
            >
              {truncateWords(title, 7)}
            </div>
          </Link>
        </div>
        <div className="flex items-center gap-2 text-gray-600 ">
          <div className="hover:text-primary cursor-pointer">
            <a href={link}>
              <Link to={link} target="_blank">
                <OpenInTabIcon size="md" />
              </Link>
            </a>
          </div>
          <div
            className="hover:text-primary cursor-pointer"
            onClick={handleCopyLink}
          >
            <ShareIcon size="md" />
          </div>
          <div
            className="hover:text-primary cursor-pointer"
            onClick={() => {
              onDelete?.();
              console.log(typeof onDelete);
            }}
          >
            <DeleteIcon size="md" />
          </div>
        </div>
      </div>
      <div className="aspect-16/9 w-full rounded-md overflow-hidden">
        {type === "tweet" ? (
          <TwitterPreview link={link} />
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
