import { useEffect } from "react";

export default function ChallengesPagination({
  page,
  setPage,
  pageSize,
  totalChallengesCount,
  isBusy,
}) {
  const totalPages = Math.ceil(totalChallengesCount / pageSize);

  useEffect(() => {
    window.scrollTo(0, 0);
    window.history.scrollRestoration = "manual";
  }, [page]);

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
    const maxVisible = 5;

    let start = Math.max(1, page - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    if (start > 1) {
      pageNumbers.push(
        <a
          key={1}
          onClick={() => handlePageClick(1)}
          className={`cursor ${page === 1 ? "-count-is-active" : ""}`}
          style={{
            padding: "10px 15px",
            margin: "0 5px",
            display: "inline-block",
            borderRadius: "5px",
            userSelect: "none",
          }}
        >
          1
        </a>
      );
      if (start > 2) {
        pageNumbers.push(<span key="dots-start">...</span>);
      }
    }

    for (let i = start; i <= end; i++) {
      pageNumbers.push(
        <a
          key={i}
          onClick={() => handlePageClick(i)}
          className={`cursor ${page === i ? "-count-is-active" : ""}`}
          style={{
            padding: "10px 15px",
            margin: "0 5px",
            display: "inline-block",
            borderRadius: "5px",
            userSelect: "none",
          }}
        >
          {i}
        </a>
      );
    }

    if (end < totalPages) {
      if (end < totalPages - 1) {
        pageNumbers.push(<span key="dots-end">...</span>);
      }
      pageNumbers.push(
        <a
          key={totalPages}
          onClick={() => handlePageClick(totalPages)}
          className={`cursor ${page === totalPages ? "-count-is-active" : ""}`}
          style={{
            padding: "10px 15px",
            margin: "0 5px",
            display: "inline-block",
            borderRadius: "5px",
            userSelect: "none",
          }}
        >
          {totalPages}
        </a>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="row justify-center lg:pt-50">
      <div className="col-auto">
        <div className="pagination -buttons">
          <button
            className="pagination__button -prev"
            onClick={handlePrevious}
            disabled={page === 1}
          >
            <i className="icon icon-chevron-left"></i>
          </button>

          <div className="pagination__count">{renderPageNumbers()}</div>

          <button
            className="pagination__button -next"
            onClick={handleNext}
            disabled={page >= totalPages}
          >
            <i className="icon icon-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
