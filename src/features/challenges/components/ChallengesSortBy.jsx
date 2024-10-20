import { sortByOptions } from "../data/challengesFilterOptions";

export default function ChallengesSortBy({
  selectedSortBy,
  setSelectedSortBy,
  isBusy,
}) {
  const handleSelectedSortByChange = (sortByOption) => {
    if (isBusy) return;
    setSelectedSortBy(sortByOption);
    document.getElementById("sortByButton").classList.toggle("-is-dd-active");
    document.getElementById("sortByContent").classList.toggle("-is-el-visible");
  };

  return (
    <>
      <div className="col-auto">
        <div className="d-flex items-center">
          <div className="text-14 lh-12 fw-500 text-dark-1 mr-20">Sort by:</div>

          <div
            id="sortByButton"
            className="dropdown js-dropdown js-category-active"
          >
            <div
              onClick={() => {
                document
                  .getElementById("sortByButton")
                  .classList.toggle("-is-dd-active");
                document
                  .getElementById("sortByContent")
                  .classList.toggle("-is-el-visible");
              }}
              className="dropdown__button d-flex items-center text-14 rounded-8 px-20 py-10 text-14 lh-12"
              data-el-toggle=".js-category-toggle"
              data-el-toggle-active=".js-category-active"
            >
              <span className="js-dropdown-title">{selectedSortBy}</span>
              <i className="icon text-9 ml-40 icon-chevron-down"></i>
            </div>

            <div
              id="sortByContent"
              className="toggle-element -dropdown -dark-bg-dark-2 -dark-border-white-10 js-click-dropdown js-category-toggle"
            >
              <div className="text-14 y-gap-15 js-dropdown-list">
                {sortByOptions.map((sortByOption, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      handleSelectedSortByChange(sortByOption);
                    }}
                  >
                    <span
                      className={`d-block js-dropdown-link cursor ${
                        selectedSortBy == sortByOption ? "activeMenu" : ""
                      } `}
                    >
                      {sortByOption}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
