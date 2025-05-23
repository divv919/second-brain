import { useNavigate } from "react-router-dom";
import { changeToTagFormat } from "../../utils/changeToTagFormat";
interface TagProps {
  tagText: string;
}
const tagStyles =
  "w-max bg-blue-100 text-blue-600 text-xs p-1 rounded-md cursor-pointer hover:bg-blue-200";

export const Tag = ({ tagText = "" }: TagProps) => {
  const navigate = useNavigate();
  const updatedTag = changeToTagFormat(tagText, true);
  return (
    <div
      className={tagStyles}
      onClick={() => {
        navigate(`/home/tags?value=${tagText}`);
      }}
    >
      {updatedTag}
    </div>
  );
};
