import getPageNumber from "../utils/getPageNumber";

interface PaginateProps {
  totalPages?: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const pageContainerStyles = "p-4 mb-2 flex justify-center gap-4 bg-blue-50";
const pageStyles =
  "bg-blue-100  hover:bg-blue-600 hover:text-blue-50 w-10 aspect-1/1 rounded-2xl flex justify-center items-center cursor-pointer";
const Paginate = ({
  totalPages = 1,
  currentPage,
  setCurrentPage,
}: PaginateProps) => {
  const pageArray = getPageNumber(totalPages, currentPage);
  return (
    <div className={pageContainerStyles}>
      {pageArray.map((pageValue, index) => {
        if (pageValue === -1) {
          return <div>...</div>;
        }
        return (
          <div
            onClick={() => setCurrentPage(pageValue)}
            key={index}
            className={`${pageStyles} ${
              currentPage === pageValue && "bg-blue-600 text-blue-50"
            }`}
          >
            {pageValue}
          </div>
        );
      })}
    </div>
  );
};

export default Paginate;
