export const changeToTagFormat = (
  tag: string,
  includeHash: boolean
): string => {
  const cleaned = tag.toLowerCase().replace(/[^a-z0-9]/g, "");
  return `${includeHash ? "#" : ""}${cleaned}`;
};
