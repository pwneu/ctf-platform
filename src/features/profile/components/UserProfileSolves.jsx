import { useState } from "react";
import { Table, Form, Row, Col, Button } from "react-bootstrap";
import { api } from "@/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function UserProfileSolves() {
  const [userSolves, setUserSolves] = useState();
  const navigate = useNavigate();
  const [searchTermInput, setSearchTermInput] = useState("");
  const [sortByInput, setSortByInput] = useState("");
  const [sortOrderInput, setSortOrderInput] = useState("");
  const [pageInput, setPageInput] = useState("");
  const [pageSizeInput, setPageSizeInput] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);
  const [isBusy, setIsBusy] = useState(false);

  const handleSearch = async () => {
    setIsBusy(true);
    const pageValue = pageInput ? Math.max(1, Number(pageInput)) : 1;
    const pageSizeValue = pageSizeInput
      ? Math.max(1, Number(pageSizeInput))
      : 10;

    const params = {
      ...(searchTermInput && { searchTerm: searchTermInput }),
      ...(sortByInput && { sortBy: sortByInput }),
      ...(sortOrderInput && { sortOrder: sortOrderInput }),
      page: pageValue,
      pageSize: pageSizeValue,
    };

    try {
      const response = await api.get(`/play/me/solves`, { params });

      setUserSolves(response.data.items);
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
          "Something went wrong getting user solves. Please try again later"
        );
      }
    } finally {
      setIsBusy(false);
    }
  };

  const selectAll = (e) => {
    e.target.select();
  };

  const handleChallengeClick = (challengeId) => {
    navigate(`/admin/challenge?challengeId=${challengeId}`);
  };

  return (
    <>
      <h2>User Solves</h2>
      <Form>
        <Row>
          <Col md={4}>
            <Form.Group controlId="formSearchTerm">
              <Form.Label>Search Term</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter search term"
                value={searchTermInput}
                onChange={(e) => setSearchTermInput(e.target.value)}
                onFocus={selectAll}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="formSortColumn">
              <Form.Label>Sort By</Form.Label>
              <Form.Select
                value={sortByInput}
                onChange={(e) => setSortByInput(e.target.value)}
              >
                <option value="">Select...</option>
                <option value="username">Challenge Name</option>
                <option value="solvedat">Solved At</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="formSortOrder">
              <Form.Label>Sort Order</Form.Label>
              <Form.Select
                value={sortOrderInput}
                onChange={(e) => setSortOrderInput(e.target.value)}
              >
                <option value="">Select...</option>
                <option value="desc">Descending</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col md={4}>
            <Form.Group controlId="formPage">
              <Form.Label>Page</Form.Label>
              <Form.Control
                type="number"
                value={pageInput}
                onChange={(e) =>
                  setPageInput(
                    e.target.value ? Math.max(1, Number(e.target.value)) : ""
                  )
                }
                placeholder="1"
                min={1}
                onFocus={selectAll}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="formPageSize">
              <Form.Label>Page Size</Form.Label>
              <Form.Control
                type="number"
                value={pageSizeInput}
                onChange={(e) =>
                  setPageSizeInput(
                    e.target.value ? Math.max(1, Number(e.target.value)) : ""
                  )
                }
                placeholder="10"
                min={1}
                onFocus={selectAll}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Button
              variant="primary"
              onClick={handleSearch}
              className="mt-4 w-100"
              disabled={isBusy}
            >
              {isBusy ? "Searching..." : "Search"}
            </Button>
          </Col>
        </Row>
      </Form>
      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>Challenge Id</th>
            <th>Challenge Name</th>
            <th>Solved At</th>
          </tr>
        </thead>
        <tbody>
          {userSolves === undefined ? (
            <tr>
              <td colSpan={5} className="text-center">
                Click the search button to view challenge solves.
              </td>
            </tr>
          ) : userSolves.length > 0 ? (
            userSolves.map((userSolve) => (
              <tr
                key={userSolve.challengeId}
                style={{ cursor: "pointer" }}
                onClick={() => handleChallengeClick(userSolve.challengeId)}
              >
                <td>{userSolve.challengeId}</td>
                <td>{userSolve.challengeName}</td>
                <td>{new Date(userSolve.solvedAt).toLocaleString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center">
                No user solves found.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      <div className="mt-3">
        <p>Total User Solves: {totalCount}</p>
        <p>
          Page: {page} of {Math.ceil(totalCount / (pageSize || 1))}
        </p>
        <p>Page Size: {pageSize}</p>
        <p>Next Page: {hasNextPage ? "Yes" : "No"}</p>
        <p>Previous Page: {hasPreviousPage ? "Yes" : "No"}</p>
      </div>
    </>
  );
}
