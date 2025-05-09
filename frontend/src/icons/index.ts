type Size = "sm" | "md" | "lg";

export interface IconProps {
  size: Size;
}
export const sizeVariants: Record<Size, string> = {
  sm: "size-2",
  md: "size-3",
  lg: "size-5",
};
