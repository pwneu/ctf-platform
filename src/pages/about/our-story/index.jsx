import OurStory from "@/components/about/OurStory";
import PageLinks from "@/components/common/PageLinks";
import Preloader from "@/components/common/Preloader";
import Footer from "@/components/layout/footers/Footer";
import Header from "@/components/layout/headers/Header";
import React from "react";
import OurApproach from "@/components/about/OurApproach";
import HeroStory from "@/components/about/HeroStory";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title: "Our Story || PWNEU",
  description:
    "Learn about our journey, from humble beginnings to where we are today, and the values that drive us.",
};

export default function OurStorys() {
  return (
    <div className="main-content  ">
      <MetaComponent meta={metadata} />
      <Preloader />

      <Header />
      <div className="content-wrapper js-content-wrapper overflow-hidden">
        <PageLinks />
        <HeroStory />
        <OurStory />
        <OurApproach />
        <Footer />
      </div>
    </div>
  );
}
