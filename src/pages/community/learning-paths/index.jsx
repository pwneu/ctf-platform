import LearningPath from "@/components/community/LearningPath"; 
import PageLinks from "@/components/common/PageLinks"; 
import Preloader from "@/components/common/Preloader"; 
import Footer from "@/components/layout/footers/Footer"; 
import Header from "@/components/layout/headers/Header"; 
import React from "react"; 

import MetaComponent from "@/components/common/MetaComponent"; 

const metadata = {
  title:"Learning Path || PWNEU",
  description: "",
};

export default function LearningPaths() {
  return (
    <div className="main-content  ">
      <MetaComponent meta={metadata} />
      <Preloader />

      <Header />
      <div className="content-wrapper js-content-wrapper overflow-hidden">
        <PageLinks />
        <LearningPath  />
        <Footer />
      </div>
    </div>
  );
}
