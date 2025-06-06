import type { ReactElement } from "react";

type Variant = "primary" | "secondary";
type Size = "sm" | "md" | "lg";
interface ButtonProps {
  variant: Variant;
  size?: Size;
  text?: string;
  endIcon?: ReactElement;
  startIcon?: ReactElement;
  onClick?: () => void;
}

const variantStyles: Record<Variant, string> = {
  primary: "bg-blue-600 text-blue-50 hover:bg-blue-700 ",
  secondary: "bg-blue-100 text-blue-600 hover:bg-blue-200 ",
};

// const sizeStyles: Record<Size, string> = {
//   sm: "text-xs px-3 py-1 h-8  ",
//   md: "text-sm px-4 py-2 h-10 ",
//   lg: "text-base px-6 py-3 h-12",
// };
const defaultStyles =
  "rounded-md flex gap-2 font-semibold justify-center items-center cursor-pointer text-xs px-3 py-1 h-8 md:text-sm md:px-3 md:py-2 md:h-10 lg:h-10 lg:py-2 lg:text-base";

export const Button = ({
  variant,
  // size,
  text,
  endIcon,
  startIcon,
  onClick,
}: ButtonProps) => {
  return (
    <button
      className={`${variantStyles[variant]}  ${defaultStyles}`}
      onClick={onClick}
    >
      {startIcon ? (
        <div className=" flex items-center  ">{startIcon}</div>
      ) : null}
      {text && <div className="flex self-center items-center ">{text}</div>}
      {endIcon ? <div className=" flex items-center ">{endIcon}</div> : null}
    </button>
  );
};
