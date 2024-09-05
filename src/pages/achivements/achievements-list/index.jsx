import AchievementsOne from "@/components/achievements/AchievementsOne";
import PageLinks from "@/components/common/PageLinks"; 
import Preloader from "@/components/common/Preloader";

import Footer from "@/components/layout/footers/Footer";  
import Header from "@/components/layout/headers/Header";  
import React from "react"; 

import MetaComponent from "@/components/common/MetaComponent";  

const metadata = {
  title: "Achievements List || PWNEU",
  description: "Explore our milestones and accomplishments that showcase our journey and success.",
};

export default function BlogListpage1() {
  return (
    <div className="main-content  ">
      <MetaComponent meta={metadata} />
      <Preloader />

      <Header />
      <div className="content-wrapper js-content-wrapper overflow-hidden">
        <PageLinks />

        <AchievementsOne />

        <Footer />
      </div>
    </div>
  );
}
