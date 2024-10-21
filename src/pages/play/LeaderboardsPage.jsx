import Preloader from "@/components/Preloader";
import MetaComponent from "@/components/MetaComponent";
import Header from "@/layout/headers/Header";
import PageLinks from "@/components/PageLinks";
import Footer from "@/layout/footers/Footer";
import { useState, useEffect } from "react";
import useAuth from "@/hooks/useAuth";
import { toast } from "react-toastify";
import { LeaderboardGraph, UserRanks } from "@/features/leaderboards";
import { api } from "@/api";

const metadata = {
  title: "Leaderbaords",
  description: "PWNEU Leaderboards",
};

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

  return (
    <div className="main-content  ">
      <MetaComponent meta={metadata} />
      <Preloader />;
      <Header />
      <div className="content-wrapper  js-content-wrapper ">
        <PageLinks />
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
        <Footer />
      </div>
    </div>
  );
}
