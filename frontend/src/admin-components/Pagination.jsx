const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-center mt-4">
      <div className="join">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className="join-item btn"
        >
          «
        </button>
        <button className="join-item btn">
          Page {currentPage}
        </button>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="join-item btn"
        >
          »
        </button>
      </div>
    </div>
  );
};

export default Pagination;
