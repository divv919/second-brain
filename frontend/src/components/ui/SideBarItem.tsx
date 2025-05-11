import type { ReactElement } from "react";
import { TwitterIcon } from "../../icons/TwitterIcon";

export const SideBarItem = ({
  icon,
  title,
}: {
  icon: ReactElement;
  title: string;
}) => {
  return (
    <div className="flex gap-3 text-gray-700 hover:bg-surface rounded-md p-2 hover:text-primary cursor-pointer">
      <div className="flex items-center ">{icon}</div>
      <div className="text-lg font-medium ">{title}</div>
    </div>
  );
};
