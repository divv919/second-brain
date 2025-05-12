import { DeleteIcon } from "../../icons/DeleteIcon";
import { DownArrowIcon } from "../../icons/DownArrowIcon";
import { OpenInTabIcon } from "../../icons/OpenInTabIcon";
import { ShareIcon } from "../../icons/ShareIcon";
import { TwitterIcon } from "../../icons/TwitterIcon";
import TwitterPreview from "../TwitterPreview";
import YoutubePreview from "../YoutubePreview";
import OtherPreview from "../OtherPreview";
import { Tag } from "./Tag";

interface CardProps {
  title: string;
  type: string;
  link: string;
  tags?: {
    name: string;
  }[];
}
export const Card = ({ title, type, link, tags }: CardProps) => {
  return (
    <div className="w-95 h-100 size-fit rounded-md shadow-md bg-white p-4 flex flex-col gap-4 ">
      <div className="flex justify-between">
        <div className="flex items-center gap-2 cursor-pointer hover:text-primary ">
          <div className="text-gray-600">
            <TwitterIcon size="lg" />
          </div>
          <div className="text-lg">{title}</div>
        </div>
        <div className="flex items-center gap-2 text-gray-600 ">
          <div className="hover:text-primary cursor-pointer">
            <OpenInTabIcon size="lg" />
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
          console.log(tag.name);
          if (index >= 7) {
            return;
          }
          return <Tag tagText={tag.name} />;
        })}
        {tags && tags.length > 7 && <div>...</div>}
      </div>
      <div className="text-sm text-gray-600">Added on : Date</div>
    </div>
  );
};
