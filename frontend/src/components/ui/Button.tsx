import type { ReactElement } from "react";

type Variant = "primary" | "secondary";
type Size = "sm" | "md" | "lg";
interface ButtonProps {
  variant: Variant;
  size: Size;
  text: string;
  endIcon?: ReactElement;
  startIcon?: ReactElement;
  onClick?: () => void;
}

const variantStyles: Record<Variant, string> = {
  primary: "bg-ocean  text-cream hover:bg-deep-blue ",
  secondary: "bg-cream text-deep-blue hover:bg-sky hover:text-cream",
};

const sizeStyles: Record<Size, string> = {
  sm: "text-xs px-3 py-1 h-8  ",
  md: "text-sm px-4 py-2 h-10 ",
  lg: "text-base px-6 py-3 h-12",
};
const defaultStyles = "rounded-md flex";
export const Button = ({
  variant,
  size,
  text,
  endIcon,
  startIcon,
  onClick,
}: ButtonProps) => {
  return (
    <button
      className={`${variantStyles[variant]} ${sizeStyles[size]} ${defaultStyles}`}
      onClick={onClick}
    >
      {startIcon ? (
        <div className="pr-2 flex items-center ">{startIcon}</div>
      ) : null}
      <div className="flex self-center items-center ">{text}</div>
      {endIcon ? (
        <div className="pl-2 flex items-center ">{endIcon}</div>
      ) : null}
    </button>
  );
};
