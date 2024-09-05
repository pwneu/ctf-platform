import Faq from "@/components/common/Faq"; 
import PageLinks from "@/components/common/PageLinks";
import Preloader from "@/components/common/Preloader"; 
import MetaComponent from "@/components/common/MetaComponent"; 
import Footer from "@/components/layout/footers/Footer"; 
import Header from "@/components/layout/headers/Header";  
import HelpCenter from "@/components/others/HelpCenter"; 
import React from "react";


const metadata = {
  title: "Help Center || PWNEU",
  description: "Find answers to your questions, explore tutorials, and get the support you need.",
};

export default function HelpCenterPage() {
  return (
    <div className="main-content  ">
      <MetaComponent meta={metadata} />
      <Preloader />

      <Header />
      <div className="content-wrapper js-content-wrapper overflow-hidden">
        <PageLinks />
     
        <Faq />
        <Footer />
      </div>
    </div>
  );
}
