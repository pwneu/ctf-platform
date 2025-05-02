import MetaComponent from "@/components/MetaComponent";
import Preloader from "@/components/Preloader";
import Header from "@/layout/headers/Header";
import { useLayoutEffect } from "react";
import { leaderboards } from "@/data/archives";
import {
  LeaderboardGraph,
  NoLeaderboards,
  LeaderboardsLoading,
  UserRanks,
} from "@/features/leaderboards";
import Footer from "@/layout/footers/Footer";

const metadata = {
  title: "Archives",
  description: "PWNEU Archives",
};

export default function ArchivesPage() {
  useLayoutEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "/assets/css/leaderboards.css";
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <div className="main-content">
      <MetaComponent meta={metadata} />
      <Preloader />
      <Header />
      <section className="leaderboard-section mt-90">
        <div className="container">
          <div className="leaderbordrow">
            <div className=" col-xl-7 col-lg-5 col-md-9">
              <h3
                className="text-30 lh-15"
                data-aos="fade-down"
                data-aos-offset="80"
                data-aos-duration={900}
              >
                PWNEU 2024-2025 Leaderboard
              </h3>
              <p
                className="description"
                data-aos="fade-up"
                data-aos-offset="80"
                data-aos-duration={900}
              >
                The PWNEU Leaderboard Archive for the school year 2024-2025
                displays the rankings of participants based on their overall
                performance throughout the academic year. It includes scores
                from various challenges and activities, with the top performers
                earning recognition for their outstanding achievements.
              </p>
              <p
                className="additional-info"
                data-aos="fade-up"
                data-aos-offset="80"
                data-aos-duration={900}
              >
                This leaderboard provides a snapshot of the competitive
                landscape for the year 2024-2025, showcasing the top achievers
                and their accomplishments across different disciplines,
                inspiring others to excel.
              </p>
            </div>
            <div
              className=" leaderbordrow y-gap-30 justify-between items-center col-lg-4"
              data-aos="fade-down"
              data-aos-offset="80"
              data-aos-duration={900}
            >
              <img
                className="leaderboardlogo mx-auto image-section-leaderboard"
                src="assets/img/general/rootlogo.svg"
                alt="PWNEU Logo"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="content-wrapper js-content-wrapper">
        {leaderboards ? (
          leaderboards.userRanks && leaderboards.userRanks.length > 0 ? (
            <>
              <LeaderboardGraph topUsersGraph={leaderboards.topUsersGraph} />
              <UserRanks
                requesterRank={leaderboards.requesterRank}
                userRanks={leaderboards.userRanks}
                isManager={false}
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
