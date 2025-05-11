type Size = "sm" | "md" | "base" | "lg" | "xl";

export interface IconProps {
  size?: Size;
}
export const sizeVariants: Record<Size, string> = {
  sm: "size-2",
  md: "size-3",
  base: "size-4",
  lg: "size-5",
  xl: "size-8",
};
