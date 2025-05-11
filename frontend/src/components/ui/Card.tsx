import { DeleteIcon } from "../../icons/DeleteIcon";
import { OpenInTabIcon } from "../../icons/OpenInTabIcon";
import { ShareIcon } from "../../icons/ShareIcon";
import { TwitterIcon } from "../../icons/TwitterIcon";
import { Tag } from "./Tag";
interface CardProps {
  title: string;
  type: string;
  link: string;
  tags?: string[];
}
export const Card = ({ title, type, link, tags = [] }: CardProps) => {
  return (
    <div className="w-95 size-fit rounded-md shadow-md bg-white p-4 flex flex-col gap-4 ">
      <div className="flex justify-between">
        <div className="flex items-center gap-2 ">
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
          <div className="hover:text-primary" cursor-pointer>
            <DeleteIcon size="lg" />
          </div>
        </div>
      </div>
      <div className=" min-h-30">
        {type === "youtube" && (
          <iframe
            className="w-full"
            src={link}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        )}
        {type === "tweet" && (
          <div>
            <blockquote className="twitter-tweet">
              <a href={link} data-dnt="true"></a>
            </blockquote>
          </div>
        )}
      </div>
      <div className="flex w-full flex-wrap gap-2">
        {tags.map((tagText) => (
          <Tag tagText={tagText} />
        ))}
      </div>
      <div className="text-sm text-gray-600">Added on : Date</div>
    </div>
  );
};
