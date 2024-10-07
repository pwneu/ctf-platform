import MetaComponent from "@/components/common/MetaComponent"; 
import Preloader from "@/components/common/Preloader"; 
import Header from "@/layout/headers/Header"; 
import PageLinks from "@/components/common/PageLinks"; 
import ChallengesHeader from "@/features/challenges/ChallengesHeader";
import ChallengesList from "@/features/challenges/ChallengesList";
import Footer from "@/layout/footers/Footer"; 

const metadata = {
  title: "Compete || PWNEU",
  description: "Join the competition, test your skills, and climb the leaderboard in exciting challenges.",
};

export default function ChallengeList() {
  return (
    <div className="main-content  ">

      <MetaComponent meta={metadata} />
      <Preloader />
      <Header />

      <div className="content-wrapper  js-content-wrapper overflow-hidden">

        <PageLinks />
        <ChallengesHeader />
        <ChallengesList  />
        <Footer />
        
      </div>
    </div>
  );
}
