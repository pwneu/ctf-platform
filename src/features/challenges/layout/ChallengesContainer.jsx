import {
  excludeSolveOptions,
  sortByOptions,
  sortOrderOptions,
} from "../data/challengesFilterOptions";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "@/api";
import { toast } from "react-toastify";
import { ChallengesList, ChallengesPagination } from "..";
import ChallengesSortOrder from "../components/ChallengesSortOrder";
import ChallengesSortBy from "../components/ChallengesSortBy";
import FilterButton from "../components/FilterButton";
import CategoryFilter from "../components/CategoryFilter";
import ExcludeSolvesFilter from "../components/ExcludeSolvesFilter";
import CategoryMobileFilter from "../components/CategoryMobileFilter";
import ExcludeSolvesMobileFilter from "../components/ExcludeSolvesMobileFilter";


export default function ChallengesContainer() {
  const [categories, setCategories] = useState([]);
  const [challenges, setChallenges] = useState();
  const [totalChallengesCount, setTotalChallengesCount] = useState(0);

  const [isBusy, setIsBusy] = useState(false);

  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSortBy, setSelectedSortBy] = useState(sortByOptions[0]);
  const [selectedSortOrder, setSelectedSortOrder] = useState(
    sortOrderOptions[0]
  );
  const [selectedExcludeSolves, setSelectedExcludeSolves] = useState(
    excludeSolveOptions[0]
  );

  const [page, setPage] = useState(1);
  const pageRef = useRef(1);
  const pageSize = 10;
  const [filterOpen, setFilterOpen] = useState(false);

  const isFirstRender = useRef(true);
  const pageChanged = useRef(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("/play/categories/all");
        setCategories(response.data);
      } catch {
        toast.error(
          "Something went wrong getting categories. Please try again later"
        );
      }
    };

    fetchCategories();
    setSelectedCategory(null);
  }, []);

  // Reset page when selectedCategory or selectedExcludeSolves changes
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (pageRef.current !== 1) pageChanged.current = true;
    setPage(1);
    pageRef.current = 1;
  }, [
    selectedCategory,
    selectedExcludeSolves,
    selectedSortBy,
    selectedSortOrder,
  ]);

  // Fetch challenges whenever dependencies change
  useEffect(() => {
    // Prevent double api call
    if (pageChanged.current) {
      pageChanged.current = false;
      return;
    }

    const fetchChallenges = async () => {
      setIsBusy(true);

      try {
        const params = new URLSearchParams({
          ...(selectedCategory && { categoryId: selectedCategory.id }),
          excludeSolves: selectedExcludeSolves.id,
          sortBy: selectedSortBy,
          sortOrder: selectedSortOrder.id,
          page,
          pageSize,
        });

        const response = await api.get(`/play/challenges?${params.toString()}`);
        setChallenges(response.data);
        setTotalChallengesCount(response.data.totalCount);
      } catch (error) {
        const status = error?.response?.status;

        if (status === 401) {
          navigate("/login");
        } else if (status === 429) {
          toast.warn("Slow down!");
        } else {
          toast.error(
            "Something went wrong getting challenges. Please try again later"
          );
        }
      } finally {
        setIsBusy(false);
        pageRef.current = page;
      }
    };

    fetchChallenges();
  }, [
    page,
    selectedCategory,
    selectedSortBy,
    selectedSortOrder,
    selectedExcludeSolves,
    navigate,
  ]);

  return (
    <>
      <section
        className="layout-pt-md layout-pb-lg"
        style={{ minHeight: "85vh" }}
      >
        <div className="container">
          <div className="row y-gap-50">
            {/* Sidebar */}
            <div className="col-xl-3 col-lg-4 lg:d-none">
              <div className="pr-30 lg:pr-0">
                <div className="sidebar -courses">
                  <CategoryFilter
                    categories={categories}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    isBusy={isBusy}
                  />

                  {/* End Category Dropdown */}
                  <ExcludeSolvesFilter
                    selectedExcludeSolves={selectedExcludeSolves}
                    setSelectedExcludeSolves={setSelectedExcludeSolves}
                    isBusy={isBusy}
                  />
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
                        {"There are "}
                        <span className="text-dark-1 fw-500">
                          {totalChallengesCount}
                        </span>
                        {" challenge(s) available."}
                      </div>
                    </div>
                    {/* End Total Challenges */}

                    <div className="col-auto">
                      <div className="row x-gap-20 y-gap-20">
                        <ChallengesSortBy
                          selectedSortBy={selectedSortBy}
                          setSelectedSortBy={setSelectedSortBy}
                          isBusy={isBusy}
                        />
                        <ChallengesSortOrder
                          selectedSortOrder={selectedSortOrder}
                          setSelectedSortOrder={setSelectedSortOrder}
                          isBusy={isBusy}
                        />
                        <FilterButton setFilterOpen={setFilterOpen} />
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
                          <CategoryMobileFilter
                            categories={categories}
                            selectedCategory={selectedCategory}
                            setSelectedCategory={setSelectedCategory}
                            isBusy={isBusy}
                          />

                          <ExcludeSolvesMobileFilter
                            selectedExcludeSolves={selectedExcludeSolves}
                            setSelectedExcludeSolves={setSelectedExcludeSolves}
                            isBusy={isBusy}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* End Mobile Filter */}

                  <ChallengesList challenges={challenges} isBusy={isBusy} />
                  <ChallengesPagination
                    page={page}
                    setPage={setPage}
                    pageSize={pageSize}
                    totalChallengesCount={totalChallengesCount}
                    isBusy={isBusy}
                  />
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
