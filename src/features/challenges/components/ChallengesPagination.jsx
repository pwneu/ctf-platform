export default function ChallengesPagination({ page, setPage }) {
  return (
    <div className="row justify-center pt-90 lg:pt-50">
      <div className="col-auto">
        <div className="pagination -buttons">
          <button
            className="pagination__button -prev "
            onClick={() => setPage(page - 1)}
          >
            <i className="icon icon-chevron-left"></i>
          </button>

          <button
            onClick={() => setPage(page + 1)}
            className="pagination__button -next"
          >
            <i className="icon icon-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
