import { changeToTagFormat } from "../../utils/changeToTagFormat";
interface TagProps {
  tagText: string;
}
const tagStyles =
  "w-max bg-surface text-primary text-xs p-1 rounded-md cursor-pointer";

export const Tag = ({ tagText = "" }: TagProps) => {
  const updatedTag = changeToTagFormat(tagText, true);
  return <div className={tagStyles}>{updatedTag}</div>;
};
