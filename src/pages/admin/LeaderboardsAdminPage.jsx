import { LeaderboardGraph, UserRanksAdmin } from "@/features/admin/submissions";
import { useEffect, useState } from "react";
import { api } from "@/api";
import { toast } from "react-toastify";
import useAuth from "@/hooks/useAuth";
import HeaderAdmin from "@/layout/headers/HeaderAdmin";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faDownload } from "@fortawesome/free-solid-svg-icons";

export default function LeaderboardsAdminPage() {
  const navigate = useNavigate();
  const [leaderboards, setLeaderboards] = useState();

  const { auth } = useAuth();
  const isManager = auth?.roles?.includes("Manager");
  const isAdmin = auth?.roles?.includes("Admin");
  const [isClearingLeaderboardsCache, setIsClearingLeaderboardsCache] =
    useState(false);

  const [isDownloadingLeaderboards, setIsDownloadingLeaderboards] =
    useState(false);

  const getLeaderboards = async () => {
    const queryParams = new URLSearchParams(window.location.search);
    const countParams = queryParams.get("count");

    try {
      const response = await api.get("/play/leaderboards", {
        params: countParams ? { count: countParams } : {},
      });
      setLeaderboards(response.data);
    } catch {
      toast.error("Something went wrong getting leaderboards");
      setLeaderboards([]);
    }
  };

  const downloadLeaderboards = async () => {
    try {
      setIsDownloadingLeaderboards(true);

      const response = await api.get("/play/leaderboards/download", {
        responseType: "blob",
      });

      const fileURL = window.URL.createObjectURL(new Blob([response.data]));

      const link = document.createElement("a");
      link.href = fileURL;
      link.download = "PWNEU leaderboards.pdf";

      link.click();

      window.URL.revokeObjectURL(fileURL);
    } catch (error) {
      const status = error?.response?.status;

      if (status === 401) {
        navigate("/login");
      } else if (status === 429) {
        toast.warn("Slow down on downloading leaderboards!");
      } else {
        toast.error(
          "Something went wrong downloading leaderboards. Please try again later"
        );
      }
    } finally {
      setIsDownloadingLeaderboards(false);
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
          "Something went wrong clearing leaderboards cache. Please try again later"
        );
      }
    } finally {
      setIsClearingLeaderboardsCache(false);
    }
  };

  useEffect(() => {
    getLeaderboards();
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
                className="mb-3 me-2"
                variant="danger"
                disabled={!isAdmin || isClearingLeaderboardsCache}
              >
                <FontAwesomeIcon icon={faTrashAlt} className="me-2" />
                {isClearingLeaderboardsCache
                  ? "Clearing..."
                  : "Clear Leaderboards Cache"}
              </Button>

              <Button
                onClick={downloadLeaderboards}
                className="mb-3"
                variant="success"
                disabled={isDownloadingLeaderboards}
              >
                <FontAwesomeIcon icon={faDownload} className="me-2" />
                {isDownloadingLeaderboards
                  ? "Downloading..."
                  : "Download Leaderboards"}
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
