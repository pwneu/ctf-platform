import Preloader from "@/components/common/Preloader";
import Footer from "@/components/layout/footers/Footer";
import Header from "@/components/layout/headers/Header";
import React from "react";
import MetaComponent from "@/components/common/MetaComponent";
import CampusePreview from "@/components/about/CampusePreview";
import MainBranchPage from "@/components/campuses/MainBranch";
import BatangasBranchPage from "@/components/campuses/BatangasBranch";
import PampangaBranchPage from "@/components/campuses/PampangaBranch";
import GeneralSantosBranchPage from "@/components/campuses/GeneralSantosBranch";
import RizalBranchPage from "@/components/campuses/RizalBranch";

const metadata = {
  title: "University || PWNEU",
  description:
    "Get in touch with us for any questions, support, or feedback. We're here to help!",
};

export default function CampusesPage() {
  return (
    <div className="main-content  ">
      <section className="breadcrumbs  "></section>
      <MetaComponent meta={metadata} />
      <Preloader />
      <Header />
      <div className="content-wrapper js-content-wrapper overflow-hidden">
         <CampusePreview />
        <MainBranchPage />
        <BatangasBranchPage />
        <PampangaBranchPage />
        <GeneralSantosBranchPage />
        <RizalBranchPage /> 
        <Footer />
      </div>
    </div>
  );
}
