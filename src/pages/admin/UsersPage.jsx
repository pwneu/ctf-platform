import { useState, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import { api } from "@/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { UsersQueryInput, UsersList } from "@/features/admin/users";
import HeaderAdmin from "@/layout/headers/HeaderAdmin";

export default function UsersPage() {
  const navigate = useNavigate();
  const [users, setUsers] = useState(undefined);
  const [searchTermInput, setSearchTermInput] = useState("");
  const [pageInput, setPageInput] = useState("");
  const [pageSizeInput, setPageSizeInput] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const [sortByInput, setSortByInput] = useState("");
  const [sortOrderInput, setSortOrderInput] = useState("");
  const [excludeVerifiedInput, setExcludeVerifiedInput] = useState(false);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [isBusy, setIsBusy] = useState(false);

  const handleSearch = async () => {
    setIsBusy(true);
    const pageValue = pageInput ? Math.max(1, Number(pageInput)) : 1;
    const pageSizeValue = pageSizeInput
      ? Math.max(1, Number(pageSizeInput))
      : 10;

    const params = {
      ...(searchTermInput && { searchTerm: searchTermInput }),
      page: pageValue,
      pageSize: pageSizeValue,
      ...(sortByInput && { sortColumn: sortByInput }),
      ...(sortOrderInput && { sortOrder: sortOrderInput }),
      ...(excludeVerifiedInput && { excludeVerified: excludeVerifiedInput }),
    };

    try {
      const response = await api.get("/identity/users", { params });
      setUsers(response.data.items);
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
          "Something went wrong getting users. Please try again later"
        );
      }
    } finally {
      setIsBusy(false);
    }
  };

  const handleUserClick = (userId) => {
    navigate(`/admin/user/${userId}`);
  };

  const toggleEmailVisibility = () => {
    setShowEmail((prev) => !prev);
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
        <h2>Users</h2>
        <UsersQueryInput
          searchTermInput={searchTermInput}
          setSearchTermInput={setSearchTermInput}
          pageInput={pageInput}
          setPageInput={setPageInput}
          pageSizeInput={pageSizeInput}
          setPageSizeInput={setPageSizeInput}
          sortByInput={sortByInput}
          setSortByInput={setSortByInput}
          sortOrderInput={sortOrderInput}
          setSortOrderInput={setSortOrderInput}
          excludeVerifiedInput={excludeVerifiedInput}
          setExcludeVerifiedInput={setExcludeVerifiedInput}
          handleSearch={handleSearch}
          isBusy={isBusy}
        />

        <Button
          variant="secondary"
          className="mt-4"
          onClick={toggleEmailVisibility}
        >
          {showEmail ? "Hide Emails" : "Show Emails"}
        </Button>

        <UsersList
          users={users}
          showEmail={showEmail}
          onUserClick={handleUserClick}
        />

        <div className="mt-3">
          <p>Total Users: {totalCount}</p>
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
