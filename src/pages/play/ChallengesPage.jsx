import MetaComponent from "@/components/MetaComponent";
import Preloader from "@/components/Preloader";
import Header from "@/layout/headers/Header";
// import ChallengesHeader from "@/features/challenges/layout/ChallengesHeader";
import ChallengesContainer from "@/features/challenges/layout/ChallengesContainer";
import Footer from "@/layout/footers/Footer";

const metadata = {
  title: "Play || PWNEU",
  description:
    "Join the competition, test your skills, and climb the leaderboard in exciting challenges.",
};

export default function ChallengesPage() {
  return (
    <div className="main-content  ">
      <MetaComponent meta={metadata} />
      <Preloader />
      <Header />

      <div className="content-wrapper  js-content-wrapper overflow-hidden">
        {/* <ChallengesHeader /> */}
        <ChallengesContainer />
        <Footer />
      </div>
    </div>
  );
}
