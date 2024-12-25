import { useState, useEffect, useCallback } from "react";
import { api } from "@/api";
import { Form, Button, Row, Col, Table } from "react-bootstrap"; // TODO -- Bootstrap destroying mobile ui
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaArrowRight, FaSync } from "react-icons/fa";

export default function UserProfileHintUsagesOld({
  totalHintUsagesCount,
  setTotalHintUsagesCount,
}) {
  const navigate = useNavigate();
  const [userHintUsages, setUserHintUsages] = useState([]);
  const [sortByInput, setSortByInput] = useState("");
  const [sortOrderInput, setSortOrderInput] = useState("asc");
  const [page, setPage] = useState(0); // Initial of 0 so useEffect will work
  const [requestedPage, setRequestedPage] = useState(1); // Track requested page
  const [pageSize] = useState(10);
  const [isBusy, setIsBusy] = useState(false);

  const fetchUserHintUsages = useCallback(
    async (pageNumber) => {
      setIsBusy(true);

      // TODO -- remove sorting dropdowns, always sort by use time descending
      const params = {
        ...(sortByInput && { sortBy: sortByInput }), // "desc"
        sortOrder: sortOrderInput, // "usedat"
        page: pageNumber, 
        pageSize,
      };

      try {
        const response = await api.get(`/play/me/hintUsages`, { params });
        setUserHintUsages(response.data.items);
        setTotalHintUsagesCount(response.data.totalCount);
        setPage(pageNumber); // Only update page after a successful fetch
      } catch (error) {
        const status = error?.response?.status;

        if (status === 401) {
          navigate("/login");
        } else if (status === 429) {
          toast.warn("Slow down!");
        } else {
          toast.error(
            "Something went wrong getting user hint usages. Please try again later."
          );
        }
        // Revert requestedPage back to the last successful page if there's an error
        setRequestedPage(page);
      } finally {
        setIsBusy(false);
      }
    },
    [
      navigate,
      pageSize,
      setTotalHintUsagesCount,
      sortByInput,
      sortOrderInput,
      page,
    ]
  );

  useEffect(() => {
    if (requestedPage !== page) {
      fetchUserHintUsages(requestedPage);
    }
  }, [requestedPage, fetchUserHintUsages, page]);

  const handleChallengeClick = (challengeId) => {
    navigate(`/play/${challengeId}`);
  };

  const handlePagination = (direction) => {
    if (isBusy) return;
    setRequestedPage((prev) =>
      direction === "next" ? prev + 1 : Math.max(1, prev - 1)
    );
  };

  return (
    <div className="text-center mb-4">
      <br></br>
      <h2 className="text-2xl font-semibold text-center mb-2">Hint Usages</h2>
      <Form className="mb-6">
        <Row className="justify-content-center">
          <Col md={2} className="text-center mb-12">
            <Form.Group controlId="formSortColumn ">
              <Form.Label>Sort By</Form.Label>
              <Form.Select
                value={sortByInput}
                onChange={(e) => setSortByInput(e.target.value)}
              >
                <option value="">Select...</option>
                <option value="challengename">Challenge Name</option>
                <option value="deduction">Deduction</option>
                <option value="usedat">Used At</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={2} className="text-center mb-12">
            <Form.Group controlId="formSortOrder">
              <Form.Label>Sort Order</Form.Label>
              <Form.Select
                value={sortOrderInput}
                onChange={(e) => setSortOrderInput(e.target.value)}
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={1} className="text-center mb-3">
            <Button
              variant="primary"
              onClick={() => fetchUserHintUsages(requestedPage)} // Use requestedPage for refresh
              disabled={isBusy}
              className="w-100 d-flex align-items-center justify-content-center"
            >
              <FaSync className="me-2" />
              {isBusy ? "Loading..." : "Refresh"}
            </Button>
          </Col>
        </Row>
      </Form>
      <Table striped bordered hover className="mx-auto">
        <thead>
          <tr>
            <th>Hint Id</th>
            <th>Challenge Id</th>
            <th>Challenge Name</th>
            <th>Used At</th>
            <th>Deduction</th>
          </tr>
        </thead>
        <tbody>
          {userHintUsages.length > 0 ? (
            userHintUsages.map((usage) => (
              <tr
                key={usage.hintId}
                style={{ cursor: "pointer" }}
                onClick={() => handleChallengeClick(usage.challengeId)}
              >
                <td>{usage.hintId}</td>
                <td>{usage.challengeId}</td>
                <td>{usage.challengeName}</td>
                <td>{new Date(usage.usedAt).toLocaleString()}</td>
                <td>{usage.deduction}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center">
                No user hint usages found.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      <div className="text-center mt-3">
        <p>Total User Hint Usages: {totalHintUsagesCount}</p>
        <p>
          Page: {page} of {Math.ceil(totalHintUsagesCount / pageSize)}
        </p>
        <div className="d-flex justify-content-center">
          <Button
            variant="secondary"
            onClick={() => handlePagination("prev")}
            disabled={isBusy || page <= 1}
            className="me-2"
          >
            <FaArrowLeft className="me-1" /> Previous
          </Button>
          <Button
            variant="secondary"
            onClick={() => handlePagination("next")}
            disabled={
              isBusy || page >= Math.ceil(totalHintUsagesCount / pageSize)
            }
          >
            Next <FaArrowRight className="ms-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}
