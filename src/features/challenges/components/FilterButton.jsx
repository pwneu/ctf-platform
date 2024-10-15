export default function FilterButton({ setFilterOpen }) {
  return (
    <>
      {/* Filter Button */}
      <div className="col-auto d-none lg:d-block">
        <div className="accordion__button w-unset">
          <button
            className="button h-50 px-30 -light-7 text-purple-1"
            onClick={() => setFilterOpen((pre) => !pre)}
          >
            <i className="icon-filter mr-10"></i>
            Filter
          </button>
        </div>
      </div>
      {/* End Filter Button */}
    </>
  );
}
