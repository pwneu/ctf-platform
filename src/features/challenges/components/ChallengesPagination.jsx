export default function ChallengesPagination({
  page,
  setPage,
  pageSize,
  totalChallengesCount,
  isBusy,
}) {
  const totalPages = Math.ceil(totalChallengesCount / pageSize);

  const handlePrevious = () => {
    if (isBusy) return;
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (isBusy) return;
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePageClick = (pageNumber) => {
    if (isBusy) return;
    setPage(pageNumber);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <a
          key={i}
          onClick={() => handlePageClick(i)}
          className={`cursor ${page === i ? "-count-is-active" : ""}`}
        >
          {i}
        </a>
      );
    }
    return pageNumbers;
  };

  return (
    <div className="row justify-center pt-90 lg:pt-50">
      <div className="col-auto">
        <div className="pagination -buttons">
          <button
            className="pagination__button -prev"
            onClick={handlePrevious}
            disabled={page === 1} // Disable if on the first page
          >
            <i className="icon icon-chevron-left"></i>
          </button>

          <div className="pagination__count">{renderPageNumbers()}</div>

          <button
            className="pagination__button -next"
            onClick={handleNext}
            disabled={page >= totalPages} // Disable if on the last page
          >
            <i className="icon icon-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
