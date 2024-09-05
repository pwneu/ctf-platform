
import PageLinks from "@/components/common/PageLinks";  

import Footer from "@/components/layout/footers/Footer";  
import Header from "@/components/layout/headers/Header";  
import React from "react";  
import AchievementsDetails from "@/components/achievements/AchievementsDetails"; 
import Preloader from "@/components/common/Preloader"; 
import { useParams } from "react-router-dom"; 
import MetaComponent from "@/components/common/MetaComponent";  

const metadata = {
  title: "Achievements Details || PWNEU",
  description: "Delve into the specifics of our key accomplishments and milestones that define our success.",
};

export default function AchivementdetailsPage() {
  let params = useParams();
  return (
    <div className="main-content  ">
      <MetaComponent meta={metadata} />
      <Preloader />

      <Header />
      <div className="content-wrapper js-content-wrapper overflow-hidden">
        <PageLinks />
        <AchievementsDetails id={params.id} />
        <Footer />
      </div>
    </div>
  );
}
