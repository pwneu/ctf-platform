import PageLinks from "@/components/common/PageLinks"; 
import Preloader from "@/components/common/Preloader"; 
import ChallengesList from "@/components/challengesList/ChallengesList"; 
import Footer from "@/components/layout/footers/Footer"; 
import Header from "@/components/layout/headers/Header"; 
import React from "react"; 

import MetaComponent from "@/components/common/MetaComponent"; 

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
        <ChallengesList  />
        <Footer />
      </div>
    </div>
  );
}
