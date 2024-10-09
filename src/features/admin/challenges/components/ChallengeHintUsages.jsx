import { useState } from "react";
import { api } from "@/api";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function ChallengeHintUsages({ challengeId }) {
  const navigate = useNavigate();
  const [challengeHintUsages, setChallengeHintUsages] = useState();
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
      const response = await api.get(
        `/play/challenges/${challengeId}/hintUsages`,
        { params }
      );

      setChallengeHintUsages(response.data.items);
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
          "Something went wrong getting challenge solves. Please try again later"
        );
      }
    } finally {
      setIsBusy(false);
    }
  };

  const selectAll = (e) => {
    e.target.select();
  };

  const handleUserClick = (userId) => {
    navigate(`/userDetails?userId=${userId}`);
  };

  return (
    <>
      <h2>Challenge Hint Usages</h2>
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
                <option value="username">Username</option>{" "}
                {/* TODO -- Not working */}
                <option value="deduction">Deduction</option>
                <option value="usedat">Used At</option>
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
            <th>User Id</th>
            <th>Hint Id</th>
            <th>Username</th>
            <th>Used At</th>
            <th>Deduction</th>
          </tr>
        </thead>
        <tbody>
          {challengeHintUsages === undefined ? (
            <tr>
              <td colSpan={5} className="text-center">
                Click the search button to view challenge hint usages.
              </td>
            </tr>
          ) : challengeHintUsages.length > 0 ? (
            challengeHintUsages.map((challengeSolve) => (
              <tr
                key={challengeSolve.userId}
                style={{ cursor: "pointer" }}
                onClick={() => handleUserClick(challengeSolve.userId)}
              >
                <td>{challengeSolve.userId}</td>
                <td>{challengeSolve.hintId}</td>
                <td>{challengeSolve.userName}</td>
                <td>{new Date(challengeSolve.usedAt).toLocaleString()}</td>
                <td>{challengeSolve.deduction}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center">
                No challenge solves found.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      <div className="mt-3">
        <p>Total Challenge Hint Usages: {totalCount}</p>
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
