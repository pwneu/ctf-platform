import WhoWeAre from "@/components/about/WhoWeAre"; 
import PageLinks from "@/components/common/PageLinks"; 
import Preloader from "@/components/common/Preloader"; 
import Footer from "@/components/layout/footers/Footer"; 
import Header from "@/components/layout/headers/Header"; 
import React from "react"; 

import MetaComponent from "@/components/common/MetaComponent"; 
import Founder from "@/components/homes/founder/DevFounder";

import OurPreview from "@/components/about/OurPreview";

const metadata = {
  title:
    "Who We Are || PWNEU",
    description: "Get to know PWNEU—our team, our values, and what makes us unique in the world of competitive challenges.",
};

export default function WhoWeAres() {
  return (
    <div className="main-content  ">
      <MetaComponent meta={metadata} />
      <Preloader />
      <Header />
      <div className="content-wrapper js-content-wrapper overflow-hidden">
        <PageLinks />
        <OurPreview />
        <WhoWeAre />
        <Founder />
        <Footer />
      </div>
    </div>
  );
}
