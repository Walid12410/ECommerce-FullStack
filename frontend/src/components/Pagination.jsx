
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    return (
      <div className="flex justify-center mt-4">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className="btn btn-primary btn-sm"
        >
          Previous
        </button>
        <span className="mx-4">{currentPage}</span>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="btn btn-primary btn-sm"
        >
          Next
        </button>
      </div>
    );
  };
  
  export default Pagination;
  