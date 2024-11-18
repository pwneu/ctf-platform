import { LeaderboardGraph, UserRanksAdmin } from "@/features/admin/submissions";
import { useEffect, useState } from "react";
import { api } from "@/api";
import { toast } from "react-toastify";
import useAuth from "@/hooks/useAuth";
import HeaderAdmin from "@/layout/headers/HeaderAdmin";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

export default function LeaderboardsAdminPage() {
  const navigate = useNavigate();
  const [leaderboards, setLeaderboards] = useState();

  const { auth } = useAuth();
  const isManager = auth?.roles?.includes("Manager");
  const [isClearingLeaderboardsCache, setIsClearingLeaderboardsCache] =
    useState(false);

  const getLeaderboards = async () => {
    try {
      const response = await api.get("/play/leaderboards");
      setLeaderboards(response.data);
    } catch {
      toast.error("Something went wrong getting leaderboards");
      setLeaderboards([]);
    }
  };

  const clearLeaderboardsCache = async () => {
    try {
      setIsClearingLeaderboardsCache(true);
      await api.post("/play/leaderboards/clear");

      toast.success("Leaderboards cache cleared");

      setLeaderboards(undefined);
      getLeaderboards();
    } catch (error) {
      const status = error?.response?.status;

      if (status === 401) {
        navigate("/login");
      } else if (status === 429) {
        toast.warn("Slow down!");
      } else {
        toast.error(
          "Something went wrong getting clearing leaderboards cache. Please try again later"
        );
      }
    } finally {
      setIsClearingLeaderboardsCache(false);
    }
  };

  useEffect(() => {
    getLeaderboards();
  }, []);

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
      <div className="container mt-4">
        <h2>Leaderboards</h2>
        {leaderboards ? (
          leaderboards.userRanks && leaderboards.userRanks.length > 0 ? (
            <>
              <LeaderboardGraph topUsersGraph={leaderboards.topUsersGraph} />
              <Button
                onClick={clearLeaderboardsCache}
                className="mb-3"
                disabled={isClearingLeaderboardsCache}
              >
                {isClearingLeaderboardsCache
                  ? "Clearing..."
                  : "Clear Leaderboards Cache"}
              </Button>
              <UserRanksAdmin
                requesterRank={leaderboards.requesterRank}
                userRanks={leaderboards.userRanks}
                isManager={isManager}
              />
            </>
          ) : (
            <p>No leaderboards available.</p>
          )
        ) : (
          <p>Loading leaderboards...</p>
        )}
      </div>
    </>
  );
}
