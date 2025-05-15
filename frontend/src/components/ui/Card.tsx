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

interface CardProps {
  title: string;
  type: string;
  link: string;
  tags?: {
    name: string;
  }[];
  createdAt: string;
}
export const Card = ({ title, type, link, tags, createdAt }: CardProps) => {
  console.log("console from card : ", createdAt);
  return (
    <div className="w-95 h-100 size-fit rounded-md shadow-md bg-white p-4 flex flex-col gap-4 ">
      <div className="flex justify-between  w-full">
        <div className="flex items-center gap-2 cursor-pointer hover:text-primary ">
          <div className="text-gray-600">
            {type === "tweet" && <TwitterIcon size="lg" />}
            {type === "youtube" && <YoutubeIcon size="lg" />}

            {type === "other" && <LinkIcon size="lg" />}
          </div>
          <div className="text-lg">
            {truncateWords(title, 7)} {type}
          </div>
        </div>
        <div className="flex items-center gap-2 text-gray-600 ">
          <div className="hover:text-primary cursor-pointer">
            <a href={link}>
              <OpenInTabIcon size="lg" />
            </a>
          </div>
          <div className="hover:text-primary cursor-pointer">
            <ShareIcon size="lg" />
          </div>
          <div className="hover:text-primary cursor-pointer">
            <DeleteIcon size="lg" />
          </div>
        </div>
      </div>
      <div>
        {type === "youtube" ? (
          <YoutubePreview link={link} />
        ) : type === "tweet" ? (
          <TwitterPreview link={link} />
        ) : (
          <OtherPreview link={link} />
        )}
      </div>

      <div className="flex w-full flex-wrap gap-2">
        {tags?.map((tag, index) => {
          if (index >= 7) {
            return;
          }
          return <Tag tagText={tag.name} />;
        })}
        {tags && tags.length > 7 && <div>...</div>}
      </div>
      <div className="text-sm text-gray-600">
        Added on {formatToDate(createdAt)}
      </div>
    </div>
  );
};
