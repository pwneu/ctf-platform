import { useState, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import { api } from "@/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  CreateChallenge,
  ChallengesQueryInput,
  ChallengesList,
} from "@/features/admin/challenges";
import HeaderAdmin from "@/layout/headers/HeaderAdmin";

export default function ChallengesAdminPage() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [selectedCategoryIdInput, setSelectedCategoryIdInput] = useState("");
  const [excludeSolvesInput, setExcludeSolvesInput] = useState(false);
  const [searchTermInput, setSearchTermInput] = useState("");
  const [sortByInput, setSortByInput] = useState("");
  const [sortOrderInput, setSortOrderInput] = useState("");
  const [pageInput, setPageInput] = useState("");
  const [pageSizeInput, setPageSizeInput] = useState("");
  const [challenges, setChallenges] = useState();
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isBusy, setIsBusy] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("/play/categories/all");
        setCategories(response.data);
      } catch {
        toast.error("Something went wrong getting categories");
      }
    };

    fetchCategories();
  }, []);

  const handleSearch = async () => {
    setIsBusy(true);
    const pageValue = pageInput ? Math.max(1, Number(pageInput)) : 1;
    const pageSizeValue = pageSizeInput
      ? Math.max(1, Number(pageSizeInput))
      : 10;

    const params = {
      ...(selectedCategoryIdInput && { categoryId: selectedCategoryIdInput }),
      ...(excludeSolvesInput && { excludeSolves: excludeSolvesInput }),
      ...(searchTermInput && { searchTerm: searchTermInput }),
      ...(sortByInput && { sortBy: sortByInput }),
      ...(sortOrderInput && { sortOrder: sortOrderInput }),
      page: pageValue,
      pageSize: pageSizeValue,
    };

    try {
      const response = await api.get("/play/challenges", { params });
      setChallenges(response.data.items);
      setTotalCount(response.data.totalCount);
      setPage(response.data.page);
      setPageSize(response.data.pageSize);
      setHasNextPage(response.data.hasNextPage);
      setHasPreviousPage(response.data.hasPreviousPage);
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

  const handleChallengeClick = (id) => {
    navigate(`/admin/challenge/${id}`);
  };

  const handleCreateChallenge = (challengeId) => {
    navigate(`/admin/challenge/${challengeId}`);
  };

  // useEffect(() => {
  //   import("bootstrap/dist/css/bootstrap.min.css");
  // }, []);

  // Hack fix because of educrat overriding bootstrap classes :(
  useEffect(() => {
    const bootstrapLink = document.createElement("link");
    bootstrapLink.rel = "stylesheet";
    bootstrapLink.href =
      "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css";
    document.head.appendChild(bootstrapLink);

    return () => {
      document.head.removeChild(bootstrapLink);
    };
  }, []);

  return (
    <>
      <HeaderAdmin />
      <Container className="mt-5">
        <h2>Challenges</h2>
        <ChallengesQueryInput
          categories={categories}
          selectedCategoryIdInput={selectedCategoryIdInput}
          setSelectedCategoryIdInput={setSelectedCategoryIdInput}
          excludeSolvesInput={excludeSolvesInput}
          setExcludeSolvesInput={setExcludeSolvesInput}
          searchTermInput={searchTermInput}
          setSearchTermInput={setSearchTermInput}
          sortByInput={sortByInput}
          setSortByInput={setSortByInput}
          sortOrderInput={sortOrderInput}
          setSortOrderInput={setSortOrderInput}
          pageInput={pageInput}
          setPageInput={setPageInput}
          pageSizeInput={pageSizeInput}
          setPageSizeInput={setPageSizeInput}
          handleSearch={handleSearch}
          isBusy={isBusy}
        />

        <Button
          variant="primary"
          className="mt-4"
          onClick={() => setShowCreateModal(true)}
        >
          Create Challenge
        </Button>

        <CreateChallenge
          show={showCreateModal}
          onHide={() => setShowCreateModal(false)}
          onSuccess={handleCreateChallenge}
        />

        <ChallengesList
          challenges={challenges}
          handleChallengeClick={handleChallengeClick}
        />

        <div className="mt-3">
          <p>Total Challenges: {totalCount}</p>
          <p>
            Page: {page} of {Math.ceil(totalCount / (pageSize || 1))}
          </p>
          <p>Page Size: {pageSize}</p>
          <p>Next Page: {hasNextPage ? "Yes" : "No"}</p>
          <p>Previous Page: {hasPreviousPage ? "Yes" : "No"}</p>
        </div>
      </Container>
    </>
  );
}
