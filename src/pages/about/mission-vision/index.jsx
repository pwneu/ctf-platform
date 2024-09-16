import Mission from "@/components/about/Mission"; 
import PageLinks from "@/components/common/PageLinks"; 
import Preloader from "@/components/common/Preloader"; 
import Footer from "@/components/layout/footers/Footer"; 
import Header from "@/components/layout/headers/Header"; 
import React from "react"; 
import Vision from "@/components/about/Vision";
import GoalsAndObjectives from "@/components/about/GoalsAndObjectives";
import MetaComponent from "@/components/common/MetaComponent"; 

const metadata = {
  title: "Mission and Vision || PWNEU",
  description:"Discover our core values, our mission to drive innovation, and our vision for the future.",
};

export default function MissionVisions() {
  return (
    <div className="main-content  ">
      <MetaComponent meta={metadata} />
      <Preloader />
      <Header />
      <div className="content-wrapper js-content-wrapper overflow-hidden">
        <PageLinks />
        <Mission />
        <Vision />
        <GoalsAndObjectives  />
        <Footer />
      </div>
    </div>
  );
}
