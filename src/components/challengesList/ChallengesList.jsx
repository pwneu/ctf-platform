import {
  categories,
  challengesData,
  sortingOptions,
} from "./challenges";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PaginationTwo from "./SidebarFilters";

export default function ChallengesList() {
  // State management
  const [categoryOpen, setCategoryOpen] = useState(true);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterCategories, setFilterCategories] = useState([]);
  const [filterCat] = useState("All");
  const [currentSortingOption] = useState("Default");
  const [showSolved, setShowSolved] = useState(true); // State to manage showing solved challenges
  const [filteredData, setFilteredData] = useState([]);
  const [sortedFilteredData, setSortedFilteredData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

  // Effect for filtering challenges based on selected criteria
  useEffect(() => {
    const refItems = challengesData.filter((elm) => {
      if (filterCat === "All") {
        return true;
      }
    });

    let filteredArrays = [];

    // Filter by categories
    if (filterCategories.length > 0) {
      const filteredByCategory = refItems.filter((elm) =>
        filterCategories.includes(elm.categoryName)
      );
      filteredArrays.push(filteredByCategory);
    }

    // Filter by solved status
    const filteredBySolved = refItems.filter((elm) => {
      return showSolved || !elm.solved; // Assuming elm.solved indicates if a challenge is solved
    });
    filteredArrays.push(filteredBySolved);

    // Get common items that meet all filtering criteria
    const commonItems = filteredArrays.reduce((acc, array) => {
      return acc.filter(item => array.includes(item));
    }, refItems);

    setFilteredData(commonItems);
    setPageNumber(1);
  }, [filterCategories, showSolved]); // Add showSolved to dependencies

  // Effect for sorting filtered challenges
  useEffect(() => {
    if (currentSortingOption === "Default") {
      setSortedFilteredData(filteredData);
    }
    // Implement additional sorting options as needed
  }, [currentSortingOption, filteredData]);

  // Handlers for filtering categories, levels, and duration
  const handleFilterCategories = (item) => {
    if (filterCategories.includes(item)) {
      const filtered = filterCategories.filter((elm) => elm !== item);
      setFilterCategories([...filtered]);
    } else {
      setFilterCategories((pre) => [...pre, item]);
    }
  };

  // Toggle show/hide solved challenges
  const handleShowSolvedToggle = () => {
    setShowSolved((prev) => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };
 
  return (
    <>
      <section className="page-header -type-1">
        <div className="container">
          <div className="page-header__content">
            <div className="row">
              <div className="col-auto">
                <div>
                  <h1 className="page-header__title">Challenges</h1>
                </div>
                <div>
                  <p className="page-header__text">
                    Explore a diverse range of cybersecurity challenges designed
                    to test your skills and knowledge across various domains.
                    Whether you’re a beginner looking to get started or an
                    experienced professional seeking to sharpen your expertise,
                    our challenges cater to all levels and interests. Filter by
                    difficulty or category to find the perfect challenge for
                    you, or browse through events to see the latest and past
                    competitions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
     
      <section className="layout-pt-md layout-pb-lg">
        <div className="container">
          
          <div className="row y-gap-50">
            <div className="col-xl-3 col-lg-4 lg:d-none">
              <div className="pr-30 lg:pr-0">
                <div className="sidebar -courses">
                  <div className="sidebar__item">
                    
                    <div className="accordion js-accordion">
                      <div
                        className={`accordion__item js-accordion-item-active ${categoryOpen ? "is-active" : ""
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
                                onClick={() => setFilterCategories([])}
                                className="sidebar-checkbox__item"
                              >
                                <div className="form-checkbox">
                                  <input
                                    type="checkbox"
                                    readOnly
                                    checked={
                                      filterCategories.length ? false : true
                                    }
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
                              {categories.map((elm, i) => (
                                <div
                                  key={i}
                                  onClick={() =>
                                    handleFilterCategories(elm.categoryName)
                                  }
                                  className="sidebar-checkbox__item cursor"
                                >
                                  <div className="form-checkbox">
                                    <input
                                      type="checkbox"
                                      readOnly
                                      checked={
                                        filterCategories.includes(
                                          elm.categoryName
                                        )
                                          ? true
                                          : false
                                      }
                                    />
                                    <div className="form-checkbox__mark">
                                      <div className="form-checkbox__icon icon-check"></div>
                                    </div>
                                  </div>

                                  <div className="sidebar-checkbox__title">
                                    {elm.categoryName}
                                  </div>
                                  <div className="sidebar-checkbox__count">
                                    (
                                    {
                                      challengesData.filter(
                                        (itm) =>
                                          itm.categoryName == elm.categoryName
                                      ).length
                                    }
                                    )
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-9 col-lg-8">
              <div className="accordion js-accordion">
                <div
                  className={`accordion__item ${filterOpen ? "is-active" : ""
                    } `}
                >
                  <div className="row y-gap-20 items-center justify-between pb-30">
                    <div className="col-auto">
                      <div className="text-14 lh-12">
                        Showing{" "}
                        <span className="text-dark-1 fw-500">
                          {filteredData.length}
                        </span>{" "}
                        total results
                      </div>
                    </div>

                    <div className="col-auto">
                      <div className="row x-gap-20 y-gap-20">
                        <div className="col-auto">
                          
                          <div className="d-flex items-center">
                            <div className="text-14 lh-12 fw-500 text-dark-1 mr-20">
                              Sort by:
                            </div>

                            <div
                              id="dd41button"
                              className="dropdown js-dropdown js-category-active"
                            >
                              <div
                                onClick={() => {
                                  document
                                    .getElementById("dd41button")
                                    .classList.toggle("-is-dd-active");
                                  document
                                    .getElementById("dd41content")
                                    .classList.toggle("-is-el-visible");
                                }}
                                className="dropdown__button d-flex items-center text-14 rounded-8 px-20 py-10 text-14 lh-12"
                                data-el-toggle=".js-category-toggle"
                                data-el-toggle-active=".js-category-active"
                              >
                                <span className="js-dropdown-title">
                                  {currentSortingOption}
                                </span>
                                <i className="icon text-9 ml-40 icon-chevron-down"></i>
                              </div>

                              <div
                                id="dd41content"
                                className="toggle-element -dropdown -dark-bg-dark-2 -dark-border-white-10 js-click-dropdown js-category-toggle"
                              >
                                <div className="text-14 y-gap-15 js-dropdown-list">
                                  {sortingOptions.map((elm, i) => (
                                    <div
                                      key={i}
                                      onClick={() => {
                                        setCurrentSortingOption((pre) =>
                                          pre == elm ? "Default" : elm
                                        );
                                        document
                                          .getElementById("dd41button")
                                          .classList.toggle("-is-dd-active");
                                        document
                                          .getElementById("dd41content")
                                          .classList.toggle("-is-el-visible");
                                      }}
                                    >
                                      <span
                                        className={`d-block js-dropdown-link cursor ${currentSortingOption == elm
                                            ? "activeMenu"
                                            : ""
                                          } `}
                                      >
                                        {elm}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        


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
                      </div>
                    </div>
                  </div>


                  {/* Mobile Filter */}
                  <div
                    className="accordion__content d-none lg:d-block"
                    style={filterOpen ? { maxHeight: "1800px" } : {}}
                  >
                    <div className="sidebar -courses px-30 py-30 rounded-8 bg-light-3 mb-50">
                      <div className="row x-gap-60 y-gap-40">
                        <div className="col-xl-3 col-lg-4 col-sm-6">
                          <div className="sidebar__item">
                            <h5 className="sidebar__title">Category</h5>
                            <div className="sidebar-checkbox">
                              <div
                                className="sidebar-checkbox__item"
                                onClick={() => setFilterCategories([])}
                              >
                                <div className="form-checkbox">
                                  <input
                                    type="checkbox"
                                    readOnly
                                    checked={
                                      filterCategories.length ? false : true
                                    }
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
                              {categories.map((elm, index) => (
                                <div
                                  className="sidebar-checkbox__item cursor"
                                  key={index}
                                  onClick={() =>
                                    handleFilterCategories(elm.categoryName)
                                  }
                                >
                                  <div className="form-checkbox">
                                    <input
                                      type="checkbox"
                                      readOnly
                                      checked={
                                        filterCategories.includes(
                                          elm.categoryName
                                        )
                                          ? true
                                          : false
                                      }
                                    />
                                    <div className="form-checkbox__mark">
                                      <div className="form-checkbox__icon icon-check"></div>
                                    </div>
                                  </div>

                                  <div className="sidebar-checkbox__title">
                                    {elm.categoryName}
                                  </div>
                                  <div className="sidebar-checkbox__count">
                                    (
                                    {
                                      challengesData.filter(
                                        (itm) =>
                                          itm.categoryName == elm.categoryName
                                      ).length
                                    }
                                    )
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Challenge List viewCard */}
                  <div className="row y-gap-30 side-content__wrap">
                    {sortedFilteredData
                      .slice((pageNumber - 1) * 15, pageNumber * 15)
                      .map((elm, i) => (
                        <div
                          key={i}
                          className="side-content col-xl-4 col-lg-6 col-md-4 col-sm-6"
                        >
                          <div className="charCard h-100 pt-15">
                            <div className="d-flex items-center">
                              <div className="text-17 lh-15 fw-500 text-dark-1">
                                <Link
                                  className="badge px-4 py-5 text-15 bg-purple-1 text-white fw-400"
                                  to={`/challengeDetails/${elm.id}`}
                                >
                                  {elm.name}
                                </Link>
                              </div>
                            </div>
                            <div className="d-flex x-gap-10 items-center cpt-10">
                              <div className="text-14 lh-1">
                                {elm.tags.join(", ")} <br /> <br />
                                Category: {elm.categoryName} <br />
                                Points: {elm.points} <br />
                                Solve Count: {elm.solveCount} <br />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>

                  <div className="row justify-center pt-90 lg:pt-50">
                    <div className="col-auto">
                      <PaginationTwo
                        pageNumber={pageNumber}
                        setPageNumber={setPageNumber}
                        data={sortedFilteredData}
                        pageCapacity={12}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
