import {
  challenges,
  excludeSolveOptions,
  sortByOptions,
  categories,
  sortOrderOptions,
} from "../data/mockData";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function ChallengesList() {
  // State management
  const [categoryOpen, setCategoryOpen] = useState(true);
  const [excludeSolvesOpen, setExcludeSolvesOpen] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSortBy, setSelectedSortBy] = useState(sortByOptions[0]);
  const [selectedSortOrder, setSelectedSortOrder] = useState(
    sortOrderOptions[0]
  );
  const [selectedExcludeSolves, setSelectedExcludeSolves] = useState(
    excludeSolveOptions[1]
  );

  const [page, setPage] = useState(1);
  const [filterOpen, setFilterOpen] = useState(false);

  useEffect(() => {
    console.log("Api call here");
  }, [
    selectedCategory,
    selectedSortBy,
    selectedSortOrder,
    selectedExcludeSolves,
  ]);

  return (
    <>
      <section
        className="layout-pt-md layout-pb-lg"
        style={{ minHeight: "800px" }}
      >
        <div className="container">
          <div className="row y-gap-50">
            {/* Sidebar */}
            <div className="col-xl-3 col-lg-4 lg:d-none">
              <div className="pr-30 lg:pr-0">
                <div className="sidebar -courses">
                  {/* Category Dropdown */}
                  <div className="sidebar__item">
                    <div className="accordion js-accordion">
                      <div
                        className={`accordion__item js-accordion-item-active ${
                          categoryOpen ? "is-active" : ""
                        } `}
                      >
                        <div
                          className="accordion__button items-center"
                          onClick={() => setCategoryOpen((pre) => !pre)}
                        >
                          <h5 className="sidebar__title">Category</h5>

                          <div className="accordion__icon">
                            <div className="icon icon-chevron-down"></div>
                            <div className="icon icon-chevron-up"></div>
                          </div>
                        </div>

                        <div
                          className="accordion__content"
                          style={categoryOpen ? { maxHeight: "350px" } : {}}
                        >
                          <div className="accordion__content__inner">
                            <div className="sidebar-checkbox">
                              <div
                                onClick={() => setSelectedCategory(null)}
                                className="sidebar-checkbox__item"
                              >
                                <div className="form-checkbox">
                                  <input
                                    type="checkbox"
                                    readOnly
                                    checked={selectedCategory === null}
                                  />
                                  <div className="form-checkbox__mark">
                                    <div className="form-checkbox__icon icon-check"></div>
                                  </div>
                                </div>

                                <div className="sidebar-checkbox__title">
                                  All
                                </div>
                              </div>
                              {categories.map((category, i) => (
                                <div
                                  key={i}
                                  onClick={() => setSelectedCategory(category)}
                                  className="sidebar-checkbox__item cursor"
                                >
                                  <div className="form-checkbox">
                                    <input
                                      type="checkbox"
                                      readOnly
                                      checked={category === selectedCategory}
                                    />
                                    <div className="form-checkbox__mark">
                                      <div className="form-checkbox__icon icon-check"></div>
                                    </div>
                                  </div>

                                  <div className="sidebar-checkbox__title">
                                    {category.name}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* End Category Dropdown */}

                  {/* Exclude Solves Dropdown */}
                  <div className="sidebar__item">
                    <div className="accordion js-accordion">
                      <div
                        className={`accordion__item js-accordion-item-active ${
                          excludeSolvesOpen ? "is-active" : ""
                        } `}
                      >
                        <div
                          className="accordion__button items-center"
                          onClick={() => setExcludeSolvesOpen((pre) => !pre)}
                        >
                          <h5 className="sidebar__title">Exclude Solves</h5>

                          <div className="accordion__icon">
                            <div className="icon icon-chevron-down"></div>
                            <div className="icon icon-chevron-up"></div>
                          </div>
                        </div>

                        <div
                          className="accordion__content"
                          style={
                            excludeSolvesOpen ? { maxHeight: "350px" } : {}
                          }
                        >
                          <div className="accordion__content__inner">
                            <div className="sidebar-checkbox">
                              {excludeSolveOptions.map(
                                (excludeSolveOption, i) => (
                                  <div
                                    key={i}
                                    onClick={() =>
                                      setSelectedExcludeSolves(
                                        excludeSolveOption
                                      )
                                    }
                                    className="sidebar-checkbox__item cursor"
                                  >
                                    <div className="form-checkbox">
                                      <input
                                        type="checkbox"
                                        readOnly
                                        checked={
                                          excludeSolveOption.id ===
                                          selectedExcludeSolves.id
                                        }
                                      />
                                      <div className="form-checkbox__mark">
                                        <div className="form-checkbox__icon icon-check"></div>
                                      </div>
                                    </div>

                                    <div className="sidebar-checkbox__title">
                                      {excludeSolveOption.value}
                                    </div>
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* End Category Dropdown */}
                </div>
              </div>
            </div>
            {/* End Sidebar */}

            {/* Main View */}
            <div className="col-xl-9 col-lg-8">
              <div className="accordion js-accordion">
                <div
                  className={`accordion__item
                    ${filterOpen ? "is-active" : ""} `}
                >
                  {/* Challenge List Header */}
                  <div className="row y-gap-20 items-center justify-between pb-30">
                    {/* Total Challenges */}
                    <div className="col-auto">
                      <div className="text-14 lh-12">
                        Showing{" "}
                        <span className="text-dark-1 fw-500">{"99"}</span> total
                        results
                      </div>
                    </div>
                    {/* End Total Challenges */}

                    <div className="col-auto">
                      <div className="row x-gap-20 y-gap-20">
                        {/* Sort By */}
                        <div className="col-auto">
                          <div className="d-flex items-center">
                            <div className="text-14 lh-12 fw-500 text-dark-1 mr-20">
                              Sort by:
                            </div>

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
                                <span className="js-dropdown-title">
                                  {selectedSortBy}
                                </span>
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
                                        setSelectedSortBy(sortByOption);
                                        document
                                          .getElementById("sortByButton")
                                          .classList.toggle("-is-dd-active");
                                        document
                                          .getElementById("sortByContent")
                                          .classList.toggle("-is-el-visible");
                                      }}
                                    >
                                      <span
                                        className={`d-block js-dropdown-link cursor ${
                                          selectedSortBy == sortByOption
                                            ? "activeMenu"
                                            : ""
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
                        {/* End Sort By  */}

                        {/* Sort Order */}
                        <div className="col-auto">
                          <div className="d-flex items-center">
                            <div className="text-14 lh-12 fw-500 text-dark-1 mr-20">
                              Sort Order:
                            </div>

                            <div
                              id="sortOrderButton"
                              className="dropdown js-dropdown js-category-active"
                            >
                              <div
                                onClick={() => {
                                  document
                                    .getElementById("sortOrderButton")
                                    .classList.toggle("-is-dd-active");
                                  document
                                    .getElementById("sortOrderContent")
                                    .classList.toggle("-is-el-visible");
                                }}
                                className="dropdown__button d-flex items-center text-14 rounded-8 px-20 py-10 text-14 lh-12"
                                data-el-toggle=".js-category-toggle"
                                data-el-toggle-active=".js-category-active"
                              >
                                <span className="js-dropdown-title">
                                  {selectedSortOrder}
                                </span>
                                <i className="icon text-9 ml-40 icon-chevron-down"></i>
                              </div>

                              <div
                                id="sortOrderContent"
                                className="toggle-element -dropdown -dark-bg-dark-2 -dark-border-white-10 js-click-dropdown js-category-toggle"
                              >
                                <div className="text-14 y-gap-15 js-dropdown-list">
                                  {sortOrderOptions.map(
                                    (sortOrderOption, i) => (
                                      <div
                                        key={i}
                                        onClick={() => {
                                          setSelectedSortOrder(sortOrderOption);
                                          document
                                            .getElementById("sortOrderButton")
                                            .classList.toggle("-is-dd-active");
                                          document
                                            .getElementById("sortOrderContent")
                                            .classList.toggle("-is-el-visible");
                                        }}
                                      >
                                        <span
                                          className={`d-block js-dropdown-link cursor ${
                                            selectedSortOrder == sortOrderOption
                                              ? "activeMenu"
                                              : ""
                                          } `}
                                        >
                                          {sortOrderOption}
                                        </span>
                                      </div>
                                    )
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* End Sort Order */}

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
                      </div>
                    </div>
                  </div>
                  {/* End Challenge List Header */}

                  {/* Mobile Filter */}
                  <div
                    className="accordion__content d-none lg:d-block"
                    style={filterOpen ? { maxHeight: "1800px" } : {}}
                  >
                    <div className="sidebar -courses px-30 py-30 rounded-8 bg-light-3 mb-50">
                      <div className="row x-gap-60 y-gap-40">
                        <div className="col-xl-3 col-lg-4 col-sm-6">
                          {/* Category Mobile Filter */}
                          <div className="sidebar__item">
                            <h5 className="sidebar__title">Category</h5>
                            <div className="sidebar-checkbox">
                              <div
                                className="sidebar-checkbox__item"
                                onClick={() => setSelectedCategory(null)}
                              >
                                <div className="form-checkbox">
                                  <input
                                    type="checkbox"
                                    readOnly
                                    checked={selectedCategory === null}
                                  />
                                  <div className="form-checkbox__mark">
                                    <div className="form-checkbox__icon icon-check"></div>
                                  </div>
                                </div>

                                <div className="sidebar-checkbox__title">
                                  All
                                </div>
                                <div className="sidebar-checkbox__count"></div>
                              </div>
                              {categories.map((category, index) => (
                                <div
                                  className="sidebar-checkbox__item cursor"
                                  key={index}
                                  onClick={() => setSelectedCategory(category)}
                                >
                                  <div className="form-checkbox">
                                    <input
                                      type="checkbox"
                                      readOnly
                                      checked={category === selectedCategory}
                                    />
                                    <div className="form-checkbox__mark">
                                      <div className="form-checkbox__icon icon-check"></div>
                                    </div>
                                  </div>

                                  <div className="sidebar-checkbox__title">
                                    {category.name}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          {/* End Category Mobile Filter */}

                          {/* Exclude Solves Mobile Filter */}
                          <div className="sidebar__item">
                            <h5 className="sidebar__title">Exclude Solves</h5>
                            <div className="sidebar-checkbox">
                              <div
                                className="sidebar-checkbox__item"
                                onClick={() => setExcludeSolvesOpen(null)}
                              ></div>
                              {excludeSolveOptions.map(
                                (excludeSolveOption, index) => (
                                  <div
                                    className="sidebar-checkbox__item cursor"
                                    key={index}
                                    onClick={() =>
                                      setSelectedExcludeSolves(
                                        excludeSolveOption
                                      )
                                    }
                                  >
                                    <div className="form-checkbox">
                                      <input
                                        type="checkbox"
                                        readOnly
                                        checked={
                                          excludeSolveOption.id ===
                                          selectedExcludeSolves.id
                                        }
                                      />
                                      <div className="form-checkbox__mark">
                                        <div className="form-checkbox__icon icon-check"></div>
                                      </div>
                                    </div>

                                    <div className="sidebar-checkbox__title">
                                      {excludeSolveOption.value}
                                    </div>
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                          {/* End Category Mobile Filter */}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* End Mobile Filter */}

                  {/* Challenge List View Cards */}
                  <div className="row y-gap-30 side-content__wrap">
                    {challenges.items.map((challenge, i) => (
                      <div
                        key={i}
                        className="side-content col-xl-4 col-lg-6 col-md-4 col-sm-6"
                      >
                        <div className="charCard h-100 pt-15">
                          <div className="d-flex items-center">
                            <div className="text-17 lh-15 fw-500 text-dark-1">
                              <Link
                                className="badge px-4 py-5 text-15 bg-purple-1 text-white fw-400"
                                to={`/challengeDetails/${challenge.id}`}
                              >
                                {challenge.name}
                              </Link>
                            </div>
                          </div>
                          <div className="d-flex x-gap-10 items-center cpt-10">
                            <div className="text-14 lh-1">
                              {/* {challenge.tags.join(", ")} <br /> <br /> */}
                              Category: {challenge.categoryName} <br />
                              Points: {challenge.points} <br />
                              Solve Count: {challenge.solveCount} <br />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* End Challenge List View Cards */}

                  {/* Pagination Buttons */}
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
                  {/* End Pagination Buttons */}
                </div>
              </div>
            </div>
            {/* End Main View */}
          </div>
        </div>
      </section>
    </>
  );
}