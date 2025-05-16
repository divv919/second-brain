const getPageNumber = (totalPages: number, currentPage: number) => {
  const pages: number[] = [];
  if (totalPages === 1) {
    return pages;
  } else if (totalPages <= 7) {
    for (let i = 0; i < totalPages; i++) {
      pages.push(i + 1);
    }
  } else {
    pages.push(1);
    if (currentPage > 3) {
      pages.push(-1);
    }
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    if (currentPage < totalPages - 2) {
      pages.push(-1);
    }
    pages.push(totalPages);
  }

  return pages;
};

export default getPageNumber;
