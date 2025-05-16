import { useFetch } from "../hooks/useFetch";
import { OpenInTabIcon } from "../icons/OpenInTabIcon";
const TwitterPreview = ({ link }: { link: string }) => {
  return (
    <div className="h-full overflow-hidden relative   border-gray-400 ">
      <blockquote className="twitter-tweet">
        <a href={link} data-dnt="true"></a>
      </blockquote>
      <div className="absolute bg-gradient-to-t from-white from-0% to-99% to-transparent h-full w-full  top-0 left-0 flex justify-center items-end">
        <div className="cursor-pointer text-gray-600">
          <OpenInTabIcon size="md" />
        </div>
      </div>
    </div>
  );
};

export default TwitterPreview;
