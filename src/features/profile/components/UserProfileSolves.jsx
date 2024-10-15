import { useState, useEffect, useCallback } from "react";
import { Table, Form, Row, Col, Button } from "react-bootstrap"; // TODO -- Bootstrap destroying mobile ui
import { api } from "@/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaArrowRight, FaSync } from "react-icons/fa";

export default function UserProfileSolves({
  totalSolveCount,
  setTotalSolveCount,
}) {
  const [userSolves, setUserSolves] = useState([]);
  const [sortByInput, setSortByInput] = useState("solvedat");
  const [sortOrderInput, setSortOrderInput] = useState("asc");
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [isBusy, setIsBusy] = useState(false);
  const navigate = useNavigate();

  const fetchUserSolves = useCallback(
    async (pageNumber) => {
      setIsBusy(true);
      const params = {
        sortBy: sortByInput,
        sortOrder: sortOrderInput,
        page: pageNumber,
        pageSize,
      };

      try {
        const response = await api.get("/play/me/solves", { params });
        setUserSolves(response.data.items);
        setTotalSolveCount(response.data.totalCount);
      } catch (error) {
        const status = error?.response?.status;
        if (status === 401) {
          navigate("/login");
        } else if (status === 429) {
          toast.warn("Slow down!");
        } else {
          toast.error("Error fetching user solves. Please try again later.");
        }
      } finally {
        setIsBusy(false);
      }
    },
    [navigate, pageSize, setTotalSolveCount, sortByInput, sortOrderInput]
  );

  useEffect(() => {
    fetchUserSolves(page);
  }, [page, fetchUserSolves]);

  const handleChallengeClick = (challengeId) => {
    navigate(`/admin/challenge?challengeId=${challengeId}`);
  };

  const handlePagination = (direction) => {
    if (isBusy) return;
    setPage((prev) =>
      direction === "next" ? prev + 1 : Math.max(1, prev - 1)
    );
  };

  return (
    <>
      <h2 className="text-2xl font-semibold text-center mb-4">
        Solve Overview
      </h2>
      <Form className="mb-6">
        <Row className="justify-content-center">
          <Col md={2} className="text-center mb-12">
            <Form.Group controlId="formSortColumn ">
              <Form.Label>Sort By</Form.Label>
              <Form.Select
                value={sortByInput}
                onChange={(e) => setSortByInput(e.target.value)}
              >
                <option value="challengeName">Challenge Name</option>
                <option value="solvedat">Solved At</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={2} className="text-center mb-3">
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
              onClick={() => fetchUserSolves(page)}
              disabled={isBusy}
              className="w-100 d-flex align-items-center justify-content-center"
            >
              <FaSync className="me-2" />
              {isBusy ? "Loading..." : "Refresh"}
            </Button>
          </Col>
        </Row>
      </Form>
      <div className="overflow-x-auto d-flex justify-content-center">
        <Table striped bordered hover className="w-75">
          {/* Adjusted width */}
          <thead>
            <tr>
              <th>Challenge Id</th>
              <th>Challenge Name</th>
              <th>Solved At</th>
            </tr>
          </thead>
          <tbody>
            {userSolves.length > 0 ? (
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
                  {/* Adjusted colspan */}
                  No user solves found.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
      <div className="text-center mt-3">
        <p>Total User Solves: {totalSolveCount}</p>
        <p>
          Page: {page} of {Math.ceil(totalSolveCount / pageSize)}
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
            disabled={isBusy || page >= Math.ceil(totalSolveCount / pageSize)}
          >
            Next <FaArrowRight className="ms-1" />
          </Button>
        </div>
      </div>
    </>
  );
}
