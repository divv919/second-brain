const truncateWords = (str: string, maxWords: number) => {
  const words = str.split(" ");
  return words.length > maxWords
    ? words.slice(0, maxWords).join(" ") + "..."
    : words.join(" ");
};

export default truncateWords;
