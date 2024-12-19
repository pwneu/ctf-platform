import { useState } from "react";
import { api } from "@/api";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function RecentSolvers({ challengeId }) {
  const [recentSolvers, setRecentSolvers] = useState();

  useEffect(() => {
    const fetchRecentSolvers = async () => {
      try {
        const response = await api.get(
          `/play/challenges/${challengeId}/solves`,
          {
            params: {
              sortOrder: "desc",
              pageSize: 20,
              sortBy: "solvedat",
            },
          }
        );
        setRecentSolvers(response.data.items);
      } catch (error) {
        const status = error?.response?.status;
        if (status === 429) {
          toast.warn("Slow down on fetching recent solvers!");
        }
        setRecentSolvers([]);
      }
    };

    fetchRecentSolvers();
  }, [challengeId]);

  return (
    <>
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
