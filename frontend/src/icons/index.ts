type Size = "sm" | "xs" | "md" | "2xl" | "3xl" | "lg" | "xl";

export interface IconProps {
  size?: Size;
}
export const sizeVariants: Record<Size, string> = {
  xs: "size-4",
  sm: "size-5",
  md: "size-6",
  lg: "size-8",
  xl: "size-10",
  "2xl": "size-12",
  "3xl": "size-16",
};
