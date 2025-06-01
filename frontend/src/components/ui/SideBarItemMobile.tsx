import type { ReactElement } from "react";

export const SideBarItemMobile = ({
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
  const activeStyles = isActive ? "hidden" : "visible";
  return (
    <div
      onClick={onClick}
      className={`flex justify-start  items-center text-md gap-3 text-blue-900 rounded-md p-2 ${activeStyles}`}
    >
      <div className="flex ">{icon}</div>
      <div className="text-lg font-regular ">{title}</div>
    </div>
  );
};
