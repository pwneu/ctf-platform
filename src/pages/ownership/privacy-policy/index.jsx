 import PageLinks from "@/components/common/PageLinks"; 
import Preloader from "@/components/common/Preloader"; 
import Footer from "@/components/layout/footers/Footer"; 
import Header from "@/components/layout/headers/Header"; 
import React from "react"; 


import PrivacyTabs from "@/components/ownership/privacy-policy/Tabs";



import MetaComponent from "@/components/common/MetaComponent"; 

const metadata = {
  title:"Privacy Policy || PWNEU",
  description: "",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="main-content  ">
      <MetaComponent meta={metadata} />
      <Preloader />
      <Header />
      <div className="content-wrapper js-content-wrapper overflow-hidden">
        <PageLinks />
        
        <PrivacyTabs />
        <Footer />
      </div>
    </div>
  );
}
