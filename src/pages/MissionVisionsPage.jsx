import MetaComponent from "@/components/common/MetaComponent"; 
import Preloader from "@/components/common/Preloader"; 
import Header from "@/layout/headers/Header";
import PageLinks from "@/components/common/PageLinks"; 
import Mission from "@/components/about/Mission"; 
import Vision from "@/components/about/Vision";
import GoalsAndObjectives from "@/components/about/GoalsAndObjectives";
import Footer from "@/layout/footers/Footer";

const metadata = {
  title: "Mission and Vision || PWNEU",
  description:"Discover our core values, our mission to drive innovation, and our vision for the future.",
};

export default function MissionVisionsPage() {
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
