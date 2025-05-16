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
  const activeStyles = isActive ? "bg-blue-100 text-blue-600" : "text-gray-600";
  return (
    <div
      onClick={onClick}
      className={`flex items-center text-md gap-3 hover:bg-blue-100 rounded-md p-2 hover:text-blue-600 cursor-pointer ${activeStyles}`}
    >
      <div className="flex ">{icon}</div>
      <div className="text-lg font-regular ">{title}</div>
    </div>
  );
};
