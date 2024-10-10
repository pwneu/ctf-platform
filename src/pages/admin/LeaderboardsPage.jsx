import { LeaderboardGraph, UserRanks } from "@/features/admin/submissions";
import { useEffect, useState } from "react";
import { api } from "@/api";
import { toast } from "react-toastify";
import useAuth from "@/hooks/useAuth";
import HeaderAdmin from "@/layout/headers/HeaderAdmin";

export default function LeaderboardsPage() {
  const [leaderboards, setLeaderboards] = useState();

  const { auth } = useAuth();
  const isManager = auth?.roles?.includes("Manager");

  const getLeaderboards = async () => {
    try {
      const response = await api.get("/play/leaderboards");
      setLeaderboards(response.data);
    } catch {
      toast.error("Something went wrong getting leaderboards");
      setLeaderboards([]);
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
    let bootstrapLink;

    import("bootstrap/dist/css/bootstrap.min.css").then(() => {
      bootstrapLink = document.createElement("link");
      bootstrapLink.rel = "stylesheet";
      bootstrapLink.href = "bootstrap/dist/css/bootstrap.min.css";
      document.head.appendChild(bootstrapLink);
    });

    return () => {
      if (bootstrapLink) {
        document.head.removeChild(bootstrapLink);
      }
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
              <UserRanks
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
