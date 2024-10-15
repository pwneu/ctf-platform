import {
  excludeSolveOptions,
  sortByOptions,
  sortOrderOptions,
} from "../data/challengesFilterOptions";
import { useState, useEffect } from "react";
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

// TODO -- Apply filtering

export default function ChallengesContainer() {
  const [categories, setCategories] = useState([]);
  const [challenges, setChallenges] = useState();

  const [isBusy, setIsBusy] = useState(false);

  const navigate = useNavigate();

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
    const fetchCategories = async () => {
      try {
        const response = await api.get("/play/categories/all");
        setCategories(response.data);
      } catch {
        toast.error("Something went wrong getting categories. Please try again later");
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchChallenges = async () => {
      setIsBusy(true);
      try {
        const response = await api.get("/play/challenges?pageSize=12");
        setChallenges(response.data);
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
      }
    };

    fetchChallenges();
  }, [
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
        style={{ minHeight: "800px" }}
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
                  />

                  {/* End Category Dropdown */}
                  <ExcludeSolvesFilter
                    excludeSolvesOpen={excludeSolvesOpen}
                    setExcludeSolvesOpen={setExcludeSolvesOpen}
                    selectedExcludeSolves={selectedExcludeSolves}
                    setSelectedExcludeSolves={setSelectedExcludeSolves}
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
                        Showing{" "}
                        <span className="text-dark-1 fw-500">{"99"}</span> total
                        results
                      </div>
                    </div>
                    {/* End Total Challenges */}

                    <div className="col-auto">
                      <div className="row x-gap-20 y-gap-20">
                        <ChallengesSortBy
                          selectedSortBy={selectedSortBy}
                          setSelectedSortBy={setSelectedSortBy}
                        />
                        <ChallengesSortOrder
                          selectedSortOrder={selectedSortOrder}
                          setSelectedSortOrder={setSelectedSortOrder}
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
                          />

                          <ExcludeSolvesMobileFilter
                            selectedExcludeSolves={selectedExcludeSolves}
                            setSelectedExcludeSolves={setSelectedExcludeSolves}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* End Mobile Filter */}

                  <ChallengesList challenges={challenges} isBusy={isBusy} />
                  <ChallengesPagination page={page} setPage={setPage} />
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
