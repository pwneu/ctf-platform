import Preloader from "@/components/Preloader";
import MetaComponent from "@/components/MetaComponent";
import Header from "@/layout/headers/Header";
import Footer from "@/layout/footers/Footer";
import { useState, useEffect, useLayoutEffect } from "react";
import useAuth from "@/hooks/useAuth";
import { toast } from "react-toastify";
import {
  LeaderboardGraph,
  LeaderboardsLoading,
  NoLeaderboards,
  UserRanks,
} from "@/features/leaderboards";
import LeaderboardOverview from "@/features/leaderboards/layout/LeaderboardOverview";
import { api } from "@/api";

const metadata = {
  title: "Leaderboards",
  description: "PWNEU Leaderboards",
};

export default function LeaderboardsPage() {
  useLayoutEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "/assets/css/leaderboards.css";
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

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

  return (
    <div className="main-content">
      <MetaComponent meta={metadata} />
      <Preloader />
      <Header />
      <LeaderboardOverview />
      <div className="content-wrapper js-content-wrapper">
        {leaderboards ? (
          leaderboards.userRanks && leaderboards.userRanks.length > 0 ? (
            <>
              <LeaderboardGraph topUsersGraph={leaderboards.topUsersGraph} />
              <UserRanks
                requesterRank={leaderboards.requesterRank}
                userRanks={leaderboards.userRanks}
                isManager={isManager}
                totalLeaderboardCount={leaderboards.totalLeaderboardCount}
              />
            </>
          ) : (
            <div style={{ minHeight: "1000px", alignItems: "center" }}>
              <NoLeaderboards />
            </div>
          )
        ) : (
          <div style={{ minHeight: "1000px", alignItems: "center" }}>
            <LeaderboardsLoading />
          </div>
        )}
        <Footer />
      </div>
    </div>
  );
}
