import type { ReactElement } from "react";
import { TwitterIcon } from "../../icons/TwitterIcon";

export const SideBarItem = ({
  icon,
  title,
  isActive = false,
  onClick,
}: {
  icon: ReactElement;
  title: string;
  isActive?: boolean;
  onClick?: () => void;
}) => {
  const activeStyles = isActive ? "bg-surface text-primary" : "";
  return (
    <div
      onClick={onClick}
      className={`flex gap-3 text-gray-700 hover:bg-surface rounded-md p-2 hover:text-primary cursor-pointer ${activeStyles}`}
    >
      <div className="flex items-center ">{icon}</div>
      <div className="text-lg font-medium ">{title}</div>
    </div>
  );
};
