import { useState } from "react";
import { api } from "@/api";
import { useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function RecentSolvers({ challengeId }) {
  const navigate = useNavigate();
  const [recentSolvers, setRecentSolvers] = useState();
  // const [userSolves, setUserSolves] = useState([]);
  const [isBusy, setIsBusy] = useState(false);
  const [page, setPage] = useState(0); // Initial of 0 so useEffect will work
  const [requestedPage, setRequestedPage] = useState(1); // Track requested page
  const [pageSize] = useState(30); // Can be up to 30
  // const [pageSize] = useState(30);
  const [totalSolveCount, setTotalSolveCount] = useState(0);

  const fetchUserSolves = useCallback(
    async (pageNumber) => {
      setIsBusy(true);

      const params = {
        sortBy: "solvedat",
        sortOrder: "desc",
        page: pageNumber,
        pageSize,
      };

      try {
        const response = await api.get(
          `/play/challenges/${challengeId}/solves`,
          { params }
        );
        setRecentSolvers(response.data.items);
        setTotalSolveCount(response.data.totalCount);
        setPage(pageNumber); // Only update page after successful fetch
      } catch (error) {
        const status = error?.response?.status;
        if (status === 401) {
          navigate("/login");
        } else if (status === 429) {
          toast.warn("Slow down!");
        } else {
          toast.error("Error fetching user solves. Please try again later");
        }
        // Revert requestedPage back to page if there was an error
        setRequestedPage(page);
      } finally {
        setIsBusy(false);
      }
    },
    [pageSize, challengeId, page, navigate]
  );

  useEffect(() => {
    if (requestedPage !== page) {
      fetchUserSolves(requestedPage);
    }
  }, [requestedPage, fetchUserSolves, page]);

  const handlePagination = (direction) => {
    if (isBusy) return;
    setRequestedPage((prev) =>
      direction === "next" ? prev + 1 : Math.max(1, prev - 1)
    );
  };

  return (
    <>
      <div className="text-center mt-3">
        <p>
          Page {page} of {Math.ceil(totalSolveCount / pageSize)}
        </p>
        <div className="d-flex justify-content-center">
          <button
            onClick={() => handlePagination("prev")}
            disabled={isBusy || page <= 1}
            className={`custom-button me-2 ${
              isBusy || page <= 1 ? "disabled" : ""
            }`}
          >
            <FaArrowLeft className="me-1" /> Previous
          </button>
          <button
            onClick={() => handlePagination("next")}
            disabled={isBusy || page >= Math.ceil(totalSolveCount / pageSize)}
            className={`custom-button ms-1 ${
              isBusy || page >= Math.ceil(totalSolveCount / pageSize)
                ? "disabled"
                : ""
            }`}
          >
            Next <FaArrowRight className="ms-1" />
          </button>
        </div>
      </div>
      {recentSolvers === undefined ? (
        <p>Loading...</p>
      ) : recentSolvers === null || recentSolvers.length === 0 ? (
        <div
          className="no-hints-message text-dark-1"
          style={{
            marginTop: "20px",
            display: "inline-flex",
            gap: "8px",
            alignItems: "center",
            textAlign: "left",
          }}
        >
          <i className="fa fa-users"></i> No solvers found.
        </div>
      ) : (
        <div style={{ width: "100%" }}>
          {/* Data Rows */}
          {recentSolvers.map((solver, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                flexDirection: "column", // Stack elements vertically for mobile
                padding: "10px 0",
                borderBottom: "1px solid #ddd",
              }}
            >
              <div
                className="text-dark-1"
                style={{
                  textAlign: "left",
                  fontWeight: "bold",
                  fontSize: "0.875rem",
                }}
              >
                {solver.userName}
              </div>
              <div
                style={{
                  textAlign: "left",
                  color: "#555",
                  fontSize: "0.875rem",
                }}
              >
                {new Date(solver.solvedAt).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      )}
      <div
        style={{
          minHeight: "50vh",
          marginTop: "200px",
        }}
      ></div>
    </>
  );
}
