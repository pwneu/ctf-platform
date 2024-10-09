import MetaComponent from "@/components/MetaComponent";
import Preloader from "@/components/Preloader";
import Header from "@/layout/headers/Header";
import PageLinks from "@/components/PageLinks";
import ChallengesHeader from "@/features/challenges/components/ChallengesHeader";
import ChallengesList from "@/features/challenges/components/ChallengesList";
import Footer from "@/layout/footers/Footer";

const metadata = {
  title: "Compete || PWNEU",
  description:
    "Join the competition, test your skills, and climb the leaderboard in exciting challenges.",
};

export default function ChallengesListPage() {
  return (
    <div className="main-content  ">
      <MetaComponent meta={metadata} />
      <Preloader />
      <Header />

      <div className="content-wrapper  js-content-wrapper overflow-hidden">
        <PageLinks />
        <ChallengesHeader />
        <ChallengesList />
        <Footer />
      </div>
    </div>
  );
}
